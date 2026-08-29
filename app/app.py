from __future__ import annotations

import json
import mimetypes
import os
import socket
import threading
import webbrowser
from datetime import datetime, timezone
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import unquote, urlparse
from uuid import uuid4


APP_DIR = Path(__file__).resolve().parent
STATIC_DIR = APP_DIR / "static"
ASSET_DIR = APP_DIR / "assets"
DATA_DIR = Path(os.environ.get("DATA_DIR", APP_DIR.parent / "data")).resolve()
DB_PATH = DATA_DIR / "panel_salud_masculina_db.json"
SETTINGS_PATH = DATA_DIR / "panel_salud_masculina_settings.json"
DATA_LOCK = threading.Lock()


def now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


def read_json(path: Path, fallback: dict) -> dict:
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    if not path.exists():
        return fallback.copy()
    try:
        value = json.loads(path.read_text(encoding="utf-8"))
        return value if isinstance(value, dict) else fallback.copy()
    except (json.JSONDecodeError, OSError):
        return fallback.copy()


def write_json(path: Path, value: dict) -> None:
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    temporary = path.with_suffix(path.suffix + ".tmp")
    temporary.write_text(json.dumps(value, ensure_ascii=False, indent=2), encoding="utf-8")
    temporary.replace(path)


def load_db() -> dict:
    data = read_json(DB_PATH, {"patients": [], "reports": []})
    data.setdefault("patients", [])
    data.setdefault("reports", [])
    return data


def same_document(record: dict, document_type: str, document_number: str) -> bool:
    return (
        str(record.get("documentType", "")).strip().casefold() == document_type.strip().casefold()
        and str(record.get("documentNumber", "")).strip().casefold() == document_number.strip().casefold()
    )


class AppHandler(BaseHTTPRequestHandler):
    server_version = "PanelSaludMasculina/1.0"

    def log_message(self, format: str, *args: object) -> None:
        return

    def do_GET(self) -> None:
        path = unquote(urlparse(self.path).path)
        if path == "/health":
            self.respond_text("ok")
            return
        if path == "/api/state":
            with DATA_LOCK:
                self.respond_json(load_db())
            return
        if path == "/api/settings":
            with DATA_LOCK:
                self.respond_json(read_json(SETTINGS_PATH, {}))
            return
        if path in ("/", "/index.html"):
            self.respond_file(STATIC_DIR / "index.html")
            return
        if path.startswith("/static/"):
            self.respond_file(STATIC_DIR / path.removeprefix("/static/"))
            return
        if path.startswith("/assets/"):
            self.respond_file(ASSET_DIR / path.removeprefix("/assets/"))
            return
        self.send_error(404)

    def do_POST(self) -> None:
        path = unquote(urlparse(self.path).path)
        try:
            payload = self.read_body()
            if path == "/api/patients":
                self.save_patient(payload)
                return
            if path == "/api/reports":
                self.save_report(payload)
                return
            if path == "/api/settings":
                with DATA_LOCK:
                    write_json(SETTINGS_PATH, payload)
                self.respond_json({"ok": True, "settings": payload})
                return
            self.send_error(404)
        except (json.JSONDecodeError, ValueError) as error:
            self.respond_json({"ok": False, "error": str(error)}, status=400)

    def read_body(self) -> dict:
        length = int(self.headers.get("Content-Length", "0"))
        value = json.loads(self.rfile.read(length).decode("utf-8") or "{}")
        if not isinstance(value, dict):
            raise ValueError("Contenido invalido")
        return value

    def save_patient(self, payload: dict) -> None:
        with DATA_LOCK:
            data = load_db()
            document_type = str(payload.get("documentType") or "Cédula").strip()
            document_number = str(payload.get("documentNumber") or "").strip()
            existing = next((item for item in data["patients"] if item.get("id") == payload.get("id")), None)
            if not existing and document_number:
                existing = next(
                    (item for item in data["patients"] if same_document(item, document_type, document_number)),
                    None,
                )
            patient_id = existing.get("id") if existing else str(uuid4())
            patient = {
                "id": patient_id,
                "name": str(payload.get("name") or "").strip(),
                "documentType": document_type,
                "documentNumber": document_number,
                "createdAt": existing.get("createdAt") if existing else now_iso(),
                "updatedAt": now_iso(),
            }
            if existing:
                existing.update(patient)
            else:
                data["patients"].append(patient)
            write_json(DB_PATH, data)
            self.respond_json({"patient": patient, "state": data})

    def save_report(self, payload: dict) -> None:
        state = payload.get("state") if isinstance(payload.get("state"), dict) else {}
        patient_input = payload.get("patient") if isinstance(payload.get("patient"), dict) else {}
        with DATA_LOCK:
            data = load_db()
            document_type = str(patient_input.get("documentType") or state.get("documentType") or "Cédula").strip()
            document_number = str(patient_input.get("documentNumber") or state.get("patientDocument") or "").strip()
            existing = next((item for item in data["patients"] if item.get("id") == patient_input.get("id")), None)
            if not existing and document_number:
                existing = next(
                    (item for item in data["patients"] if same_document(item, document_type, document_number)),
                    None,
                )
            patient_id = existing.get("id") if existing else str(uuid4())
            patient = {
                "id": patient_id,
                "name": str(patient_input.get("name") or state.get("patientName") or "").strip(),
                "documentType": document_type,
                "documentNumber": document_number,
                "createdAt": existing.get("createdAt") if existing else now_iso(),
                "updatedAt": now_iso(),
            }
            if existing:
                existing.update(patient)
            else:
                data["patients"].append(patient)

            versions = [
                int(item.get("version", 0) or 0)
                for item in data["reports"]
                if item.get("patientId") == patient_id
            ]
            report = {
                "id": str(uuid4()),
                "patientId": patient_id,
                "version": max(versions or [0]) + 1,
                "title": str(payload.get("title") or "Panel Integral de Salud Sexual Masculina").strip(),
                "state": state,
                "createdAt": now_iso(),
                "savedAt": now_iso(),
            }
            data["reports"].append(report)
            write_json(DB_PATH, data)
            self.respond_json({"patient": patient, "report": report, "state": data})

    def respond_text(self, value: str, status: int = 200) -> None:
        body = value.encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "text/plain; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def respond_json(self, value: dict, status: int = 200) -> None:
        body = json.dumps(value, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def respond_file(self, path: Path) -> None:
        path = path.resolve()
        roots = (STATIC_DIR.resolve(), ASSET_DIR.resolve())
        if not path.exists() or not path.is_file() or not any(str(path).startswith(str(root)) for root in roots):
            self.send_error(404)
            return
        body = path.read_bytes()
        self.send_response(200)
        self.send_header("Content-Type", mimetypes.guess_type(str(path))[0] or "application/octet-stream")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)


def available_port(start: int = 5064) -> int:
    for port in range(start, start + 30):
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
            if sock.connect_ex(("127.0.0.1", port)) != 0:
                return port
    return start


def main() -> None:
    port = int(os.environ.get("PORT") or available_port())
    host = os.environ.get("HOST", "127.0.0.1")
    server = ThreadingHTTPServer((host, port), AppHandler)
    url = f"http://127.0.0.1:{port}/"
    print(json.dumps({"url": url}, ensure_ascii=False), flush=True)
    if os.environ.get("PANEL_NO_BROWSER") != "1":
        threading.Timer(0.6, lambda: webbrowser.open(url)).start()
    server.serve_forever()


if __name__ == "__main__":
    main()
