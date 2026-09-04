const ITS_MARKERS = [
  { id: "chlamydia", label: "Chlamydia trachomatis", mix: "Master Mix 1", channel: "FAM" },
  { id: "gonorrhoeae", label: "Neisseria gonorrhoeae", mix: "Master Mix 1", channel: "VIC (HEX)" },
  { id: "mycoplasma_hominis", label: "Mycoplasma hominis", mix: "Master Mix 1", channel: "ROX" },
  { id: "hsv1", label: "Herpes simplex virus tipo 1", mix: "Master Mix 1", channel: "CY5" },
  { id: "ureaplasma_urealyticum", label: "Ureaplasma urealyticum", mix: "Master Mix 2", channel: "FAM" },
  { id: "hsv2", label: "Herpes simplex virus tipo 2", mix: "Master Mix 2", channel: "VIC (HEX)" },
  { id: "ureaplasma_parvum", label: "Ureaplasma parvum", mix: "Master Mix 2", channel: "ROX" },
  { id: "mycoplasma_genitalium", label: "Mycoplasma genitalium", mix: "Master Mix 2", channel: "CY5" },
  { id: "candida_its", label: "Candida albicans", mix: "Master Mix 3", channel: "FAM" },
  { id: "gardnerella", label: "Gardnerella vaginalis", mix: "Master Mix 3", channel: "ROX" },
  { id: "trichomonas", label: "Trichomonas vaginalis", mix: "Master Mix 3", channel: "CY5" },
  { id: "streptococcus_b", label: "Streptococcus agalactiae (grupo B)", mix: "Master Mix 4", channel: "FAM" },
  { id: "haemophilus_ducreyi", label: "Haemophilus ducreyi", mix: "Master Mix 4", channel: "ROX" },
  { id: "treponema", label: "Treponema pallidum", mix: "Master Mix 4", channel: "CY5" },
];

const BACTERIA_MARKERS = [
  { id: "escherichia", label: "Escherichia coli" },
  { id: "enterobacter_klebsiella", label: "Enterobacter spp. / Klebsiella spp." },
  { id: "proteus", label: "Proteus spp." },
  { id: "serratia", label: "Serratia spp." },
  { id: "pseudomonas", label: "Pseudomonas aeruginosa" },
  { id: "enterococcus", label: "Enterococcus faecalis / E. faecium" },
  { id: "staphylococcus", label: "Staphylococcus aureus" },
  { id: "streptococcus", label: "Streptococcus spp." },
];

const FUNGI_MARKERS = [
  { id: "meyerozyma", label: "Meyerozyma guilliermondii (C. guilliermondii)" },
  { id: "candida_albicans", label: "Candida albicans" },
  { id: "saccharomyces", label: "Saccharomyces cerevisiae" },
  { id: "candida_tropicalis", label: "Candida tropicalis" },
  { id: "debaryomyces", label: "Debaryomyces hansenii (C. famata)" },
  { id: "candida_glabrata", label: "Candida glabrata" },
  { id: "malassezia_spp", label: "Malassezia spp." },
  { id: "kluyveromyces", label: "Kluyveromyces marxianus (C. kefyr)" },
  { id: "pichia", label: "Pichia kudriavzevii (C. krusei)" },
  { id: "candida_auris", label: "Candida auris" },
  { id: "clavispora", label: "Clavispora lusitaniae (Candida lusitaniae)" },
  { id: "candida_dubliniensis", label: "Candida dubliniensis" },
  { id: "candida_parapsilosis", label: "Candida parapsilosis" },
  { id: "malassezia_furfur", label: "Malassezia furfur" },
];

const GENOTYPES = [
  ["6", "Bajo riesgo", "A"], ["16", "Alto riesgo", "A"], ["26", "Alto riesgo", "A"],
  ["40", "Bajo riesgo", "A"], ["53", "Alto riesgo", "A"], ["56", "Riesgo intermedio", "A"],
  ["58", "Riesgo intermedio", "A"], ["73", "Alto riesgo", "A"], ["11", "Bajo riesgo", "B"],
  ["18", "Alto riesgo", "B"], ["33", "Riesgo intermedio", "B"], ["43", "Bajo riesgo", "B"],
  ["44", "Bajo riesgo", "B"], ["51", "Riesgo intermedio", "B"], ["59", "Riesgo intermedio", "B"],
  ["35", "Riesgo intermedio", "C"], ["45", "Alto riesgo", "C"], ["54", "Bajo riesgo", "C"],
  ["68", "Riesgo intermedio", "C"], ["81", "Bajo riesgo", "C"], ["82", "Alto riesgo", "C"],
  ["31", "Alto riesgo", "D"], ["39", "Riesgo intermedio", "D"], ["42", "Bajo riesgo", "D"],
  ["52", "Riesgo intermedio", "D"], ["61", "Bajo riesgo", "D"], ["66", "Alto riesgo", "D"],
  ["83", "Alto riesgo", "D"],
].map(([id, risk, group]) => ({ id, risk, group }));

const DEFAULT_SETTINGS = {
  reportTitle: "PANEL INTEGRAL DE SALUD SEXUAL MASCULINA",
  reportSubtitle: "Detección molecular de ITS, microbiología, micología y 28 genotipos de VPH",
  labName: "Laboratorios Genoma",
  signature: "MSc. Gabriela Espinoza",
  legalNote: "Este informe se basa en resultados moleculares. La correlación clínica, el diagnóstico y el tratamiento corresponden al médico tratante.",
  sampleType: "Hisopado genital",
  interpretation: "El panel molecular fue procesado con controles analíticos. Los hallazgos detectados deben correlacionarse con los antecedentes, la exploración clínica y otros estudios complementarios.",
  recommendations: "1. Correlacionar los resultados con la evaluación médica especializada.\n2. Valorar estudio y manejo de la(s) pareja(s) sexual(es) según criterio clínico.\n3. Evitar la automedicación; indicar antimicrobianos únicamente bajo prescripción.\n4. Definir seguimiento molecular de acuerdo con los hallazgos y la evolución clínica.",
  vphGroups: {
    A: { m: 1.886, b: -19.801, low: 0.079, medium: 104.9, max: 157294, label: "Baja: 0,0-0,079 · Media: 0,08-104,9 · Alta: 105-157.294" },
    B: { m: 9.569, b: -67.149, low: 52270, medium: 221453, max: 938224, label: "Baja: 7.625-52.270 · Media: 52.271-221.453 · Alta: 221.454-938.224" },
    C: { m: 4.788, b: -38.048, low: 2248, medium: 40257, max: 721071, label: "Baja: 47,9-2.248 · Media: 2.249-40.257 · Alta: 40.258-721.071" },
    D: { m: 1.882, b: -18.447, low: 0.019, medium: 20.9, max: 30782, label: "Baja: 0,0-0,019 · Media: 0,02-20,9 · Alta: 21,0-30.782" },
  },
};

const RESULT_OPTIONS = [
  ["none", "No detectado"],
  ["low", "Detectado bajo"],
  ["medium", "Detectado medio"],
  ["high", "Detectado alto"],
];

const STORAGE_KEY = "panel-salud-masculina-settings-v1";
let settings = clone(DEFAULT_SETTINGS);
let state = null;
let database = { patients: [], reports: [] };
let currentPatientId = null;
let currentTab = "its";

function $(id) { return document.getElementById(id); }
function clone(value) { return JSON.parse(JSON.stringify(value)); }
function today() { return new Date().toISOString().slice(0, 10); }

function deepMerge(base, incoming) {
  const result = clone(base);
  if (!incoming || typeof incoming !== "object") return result;
  for (const [key, value] of Object.entries(incoming)) {
    if (value && typeof value === "object" && !Array.isArray(value) && result[key] && typeof result[key] === "object") {
      result[key] = deepMerge(result[key], value);
    } else if (value !== undefined) result[key] = value;
  }
  return result;
}

function emptyResults(markers) {
  return Object.fromEntries(markers.map((marker) => [marker.id, "none"]));
}

function makeEmptyState() {
  return {
    patientName: "", documentType: "Cédula", patientDocument: "", evalDate: today(), birthDate: "",
    sampleType: settings.sampleType, dnaConcentration: "", purity: "Óptima",
    internalControl: "Detectado",
    results: { its: emptyResults(ITS_MARKERS), bacteria: emptyResults(BACTERIA_MARKERS), fungi: emptyResults(FUNGI_MARKERS) },
    vph: Object.fromEntries(GENOTYPES.map((item) => [item.id, ""])),
    interpretation: settings.interpretation, recommendations: settings.recommendations,
    observations: "", signatureText: settings.signature,
  };
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[character]));
}

function textBlock(value) { return escapeHtml(value || "No registrado.").replace(/\n/g, "<br>"); }
function normalize(value) { return String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase(); }

function notify(message, tone = "ok") {
  let toast = document.querySelector(".toast");
  if (!toast) { toast = document.createElement("div"); toast.className = "toast"; document.body.appendChild(toast); }
  toast.textContent = message;
  toast.dataset.tone = tone;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2800);
}

async function api(path, options = {}) {
  const response = await fetch(path, { headers: { "Content-Type": "application/json", ...(options.headers || {}) }, ...options });
  if (!response.ok) throw new Error(`Error ${response.status}`);
  return response.json();
}

function showView(id) {
  document.querySelectorAll(".app-view").forEach((view) => view.classList.toggle("hidden", view.id !== id));
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function statusLabel(value) {
  return Object.fromEntries(RESULT_OPTIONS)[value] || "No detectado";
}

function formatDate(value) {
  if (!value) return "-";
  const [year, month, day] = String(value).split("-");
  return day && month && year ? `${day}/${month}/${year}` : value;
}

function formatDateTime(value) {
  if (!value) return "";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleString("es-VE", { dateStyle: "short", timeStyle: "short" });
}

function cleanCt(value) {
  const text = String(value ?? "").trim().replace(",", ".");
  if (!text || /^(nd|no|n\/a|0)$/i.test(text)) return null;
  const number = Number(text);
  return Number.isFinite(number) && number > 0 ? number : null;
}

function vphLoad(meta, rawCt) {
  const ct = cleanCt(rawCt);
  if (ct === null) return null;
  const curve = settings.vphGroups[meta.group];
  return Math.pow(10, -((Number(curve.b) + ct) / Number(curve.m)));
}

function classifyVph(meta, load) {
  if (load === null) return { value: "none", label: "NO DETECTADO" };
  const range = settings.vphGroups[meta.group];
  if (load <= Number(range.low)) return { value: "low", label: "BAJA" };
  if (load <= Number(range.medium)) return { value: "medium", label: "MEDIA" };
  return { value: "high", label: "ALTA" };
}

function formatNumber(value, decimals = 2) {
  if (!Number.isFinite(Number(value))) return "-";
  const number = Number(value) > 0 && Number(value) < 0.01 ? 0.01 : Number(value);
  return number.toLocaleString("es-VE", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

function markerRows(markers, group) {
  return markers.map((marker, index) => {
    const value = state.results[group][marker.id] || "none";
    const details = group === "its" ? `<small>${marker.mix} · ${marker.channel}</small>` : "";
    return `<div class="marker-row"><span class="marker-index">${index + 1}</span><div class="marker-name"><b>${escapeHtml(marker.label)}</b>${details}</div><select data-result-group="${group}" data-result-id="${marker.id}" class="result-select ${value}">${RESULT_OPTIONS.map(([id, label]) => `<option value="${id}" ${id === value ? "selected" : ""}>${label}</option>`).join("")}</select></div>`;
  }).join("");
}

function vphInputs() {
  return `<div class="vph-help"><b>28 genotipos</b><span>Escribe el CT solamente cuando exista deteccion.</span></div><div class="vph-grid">${GENOTYPES.map((item) => {
    const load = vphLoad(item, state.vph[item.id]);
    const status = classifyVph(item, load);
    return `<label class="vph-input ${status.value}"><span><b>G${item.id}</b><small>${item.risk}</small></span><input inputmode="decimal" data-vph-id="${item.id}" value="${escapeHtml(state.vph[item.id] || "")}" placeholder="CT"><i>${load === null ? "No detectado" : `${status.label} · ${formatNumber(load, 2)}`}</i></label>`;
  }).join("")}</div>`;
}

function renderResultPanel() {
  document.querySelectorAll("[data-result-tab]").forEach((button) => button.classList.toggle("active", button.dataset.resultTab === currentTab));
  const panel = $("resultPanel");
  if (currentTab === "its") panel.innerHTML = `<div class="result-summary"><b>Infecciones de transmisión sexual</b><span>14 agentes estudiados</span></div><div class="marker-list">${markerRows(ITS_MARKERS, "its")}</div>`;
  if (currentTab === "bacteria") panel.innerHTML = `<div class="result-summary"><b>Bacterias uropatógenas</b><span>8 grupos estudiados</span></div><div class="marker-list">${markerRows(BACTERIA_MARKERS, "bacteria")}</div>`;
  if (currentTab === "fungi") panel.innerHTML = `<div class="result-summary"><b>Hongos y levaduras</b><span>14 agentes estudiados</span></div><div class="marker-list">${markerRows(FUNGI_MARKERS, "fungi")}</div>`;
  if (currentTab === "vph") panel.innerHTML = vphInputs();
}

const BASIC_FIELDS = ["patientName", "documentType", "patientDocument", "evalDate", "birthDate", "sampleType", "dnaConcentration", "purity", "internalControl", "interpretation", "recommendations", "observations", "signatureText"];

function collectBasicState() {
  BASIC_FIELDS.forEach((id) => { if ($(id)) state[id] = $(id).value; });
}

function applyState(nextState) {
  state = deepMerge(makeEmptyState(), nextState || {});
  BASIC_FIELDS.forEach((id) => { if ($(id)) $(id).value = state[id] ?? ""; });
  renderResultPanel();
  renderReport();
}

function detectedFor(markers, group) {
  return markers.filter((marker) => (state.results[group][marker.id] || "none") !== "none").map((marker) => ({ ...marker, status: state.results[group][marker.id] }));
}

function vphRows() {
  return GENOTYPES.map((meta) => {
    const load = vphLoad(meta, state.vph[meta.id]);
    return { ...meta, load, status: classifyVph(meta, load) };
  });
}

function sectionHeader(number, title, subtitle = "") {
  return `<div class="report-section-title"><span>${number}</span><div><h2>${title}</h2>${subtitle ? `<p>${subtitle}</p>` : ""}</div></div>`;
}

function reportHeader(compact = false) {
  return `<header class="report-header ${compact ? "compact" : ""}"><img src="/assets/logo_genoma.png" alt="Genoma"><div><h1>${escapeHtml(settings.reportTitle)}</h1><p>${escapeHtml(settings.reportSubtitle)}</p></div></header>`;
}

function reportFooter(page) {
  return `<footer class="report-footer"><span>${escapeHtml(settings.labName)} · Informe de apoyo para interpretación profesional</span><b>${page}</b></footer>`;
}

function resultTable(markers, group) {
  return `<table class="clinical-table result-table"><thead><tr><th>Agente estudiado</th><th>Resultado</th></tr></thead><tbody>${markers.map((marker) => {
    const value = state.results[group][marker.id] || "none";
    return `<tr><td><i>${escapeHtml(marker.label)}</i></td><td><span class="result-pill ${value}">${statusLabel(value)}</span></td></tr>`;
  }).join("")}</tbody></table>`;
}

function positiveSummary(items, groupName) {
  if (!items.length) return `<div class="finding-group clear"><b>${groupName}</b><span>Sin detecciones</span></div>`;
  return `<div class="finding-group"><b>${groupName}</b><div>${items.map((item) => `<span class="result-pill ${item.status}">${escapeHtml(item.label)} · ${statusLabel(item.status).replace("Detectado ", "")}</span>`).join("")}</div></div>`;
}

function vphRiskClass(risk) {
  if (risk === "Alto riesgo") return "risk-high";
  if (risk === "Riesgo intermedio") return "risk-medium";
  return "risk-low";
}

function vphTable(rows) {
  const detected = rows.filter((row) => row.load !== null);
  if (!detected.length) return `<div class="empty-result"><b>No se detectaron genotipos de VPH.</b><span>Los 28 genotipos fueron estudiados.</span></div>`;
  return `<table class="clinical-table vph-report-table"><thead><tr><th>Genotipo</th><th>Riesgo del genotipo</th><th>Carga viral<br><small>copias/reacción</small></th><th>Clasificación de la carga</th><th>Rangos de referencia</th></tr></thead><tbody>${detected.map((row) => `<tr><td><b>G${row.id}</b></td><td><span class="risk-pill ${vphRiskClass(row.risk)}">${row.risk}</span></td><td>${formatNumber(row.load, 2)}</td><td><span class="result-pill ${row.status.value}">${row.status.label}</span></td><td>${escapeHtml(settings.vphGroups[row.group].label)}</td></tr>`).join("")}</tbody></table>`;
}

function vphChart(rows) {
  const detected = rows.filter((row) => row.load !== null);
  if (!detected.length) return "";
  const max = Math.max(...detected.map((row) => row.load), 1);
  const width = 560, height = 205, left = 46, bottom = 35, plot = width - left - 18;
  const slot = plot / detected.length;
  const bars = detected.map((row, index) => {
    const normalized = Math.log10(row.load + 1) / Math.log10(max + 1);
    const barHeight = Math.max(normalized * 125, 4);
    const x = left + index * slot + slot * 0.22;
    const y = height - bottom - barHeight;
    const barWidth = Math.max(slot * 0.56, 8);
    return `<g><rect x="${x}" y="${y}" width="${barWidth}" height="${barHeight}" rx="3" class="chart-${row.status.value}"/><text x="${x + barWidth / 2}" y="${height - 14}" text-anchor="middle">${row.id}</text><text x="${x + barWidth / 2}" y="${Math.max(y - 5, 14)}" text-anchor="middle" class="chart-value">${formatNumber(row.load, row.load < 1 ? 2 : 0)}</text></g>`;
  }).join("");
  return `<div class="chart-frame"><svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Carga viral por genotipo"><line x1="${left}" y1="10" x2="${left}" y2="${height - bottom}"/><line x1="${left}" y1="${height - bottom}" x2="${width - 10}" y2="${height - bottom}"/>${bars}<text x="${width / 2}" y="${height - 1}" text-anchor="middle" class="chart-axis">Genotipo</text></svg></div>`;
}

function renderReport() {
  if (!state) return;
  collectBasicState();
  const itsDetected = detectedFor(ITS_MARKERS, "its");
  const bacteriaDetected = detectedFor(BACTERIA_MARKERS, "bacteria");
  const fungiDetected = detectedFor(FUNGI_MARKERS, "fungi");
  const vph = vphRows();
  const vphDetected = vph.filter((item) => item.load !== null);
  const totalDetected = itsDetected.length + bacteriaDetected.length + fungiDetected.length + vphDetected.length;
  const notDetectedVph = vph.filter((item) => item.load === null).map((item) => `G${item.id}`).join(", ");
  const patientBand = `<section class="patient-band"><div><small>FECHA</small><b>${formatDate(state.evalDate)}</b></div><div><small>PACIENTE</small><b>${escapeHtml(state.patientName || "Pendiente")}</b></div><div><small>${escapeHtml(state.documentType)}</small><b>${escapeHtml(state.patientDocument || "-")}</b></div><div><small>MUESTRA</small><b>${escapeHtml(state.sampleType || "-")}</b></div></section>`;

  $("report").innerHTML = `
    <article class="report-page page-one">
      ${reportHeader()}${patientBand}
      <section class="quality-band"><div><small>CONTROL INTERNO</small><b class="${state.internalControl === "Detectado" ? "good" : "alert"}">${escapeHtml(state.internalControl)}</b></div><div><small>ADN MUESTRA</small><b>${escapeHtml(state.dnaConcentration || "No registrado")}</b></div><div><small>PUREZA</small><b>${escapeHtml(state.purity)}</b></div></section>
      ${sectionHeader(1, "Resumen ejecutivo", "Hallazgos detectados en los cuatro componentes del panel")}
      <section class="summary-strip"><div><strong>${totalDetected}</strong><span>detecciones totales</span></div><div><strong>${itsDetected.length}</strong><span>agentes ITS</span></div><div><strong>${bacteriaDetected.length}</strong><span>bacterias</span></div><div><strong>${fungiDetected.length}</strong><span>hongos</span></div><div><strong>${vphDetected.length}</strong><span>genotipos VPH</span></div></section>
      <section class="finding-board">${positiveSummary(itsDetected, "ITS")}${positiveSummary(bacteriaDetected, "Bacterias")}${positiveSummary(fungiDetected, "Hongos")}${positiveSummary(vphDetected.map((item) => ({ label: `G${item.id}`, status: item.status.value })), "VPH")}</section>
      ${sectionHeader(2, "Panel de infecciones de transmisión sexual")}
      ${resultTable(ITS_MARKERS, "its")}
      ${reportFooter(1)}
    </article>
    <article class="report-page page-two">
      ${reportHeader(true)}
      ${sectionHeader(3, "Bacterias uropatógenas", "Detección cualitativa y nivel reportado")}
      ${resultTable(BACTERIA_MARKERS, "bacteria")}
      ${sectionHeader(4, "Hongos y levaduras", "Detección cualitativa y nivel reportado")}
      ${resultTable(FUNGI_MARKERS, "fungi")}
      ${reportFooter(2)}
    </article>
    <article class="report-page page-three">
      ${reportHeader(true)}
      ${sectionHeader(5, "Carga viral y tipificación de VPH", "La clasificación de carga es independiente del riesgo del genotipo")}
      ${vphTable(vph)}
      <div class="not-detected-vph"><b>Otros genotipos estudiados no detectados:</b> ${escapeHtml(notDetectedVph || "Ninguno")}</div>
      ${vphChart(vph)}
      <section class="legend-row"><span class="risk-pill risk-high">Alto riesgo</span><span class="risk-pill risk-medium">Riesgo intermedio</span><span class="risk-pill risk-low">Bajo riesgo</span></section>
      ${reportFooter(3)}
    </article>
    <article class="report-page page-four">
      ${reportHeader(true)}
      ${sectionHeader(6, "Interpretación clínica")}
      <section class="text-panel">${textBlock(state.interpretation)}</section>
      ${sectionHeader(7, "Recomendaciones")}
      <section class="text-panel recommendations">${textBlock(state.recommendations)}</section>
      ${state.observations ? `${sectionHeader(8, "Observaciones")}<section class="text-panel">${textBlock(state.observations)}</section>` : ""}
      <section class="legal-note">${escapeHtml(settings.legalNote)}</section>
      <section class="signature-block"><div><img src="/assets/firma_genoma.png" alt="Firma"><span></span><b>${escapeHtml(state.signatureText || settings.signature)}</b><small>${escapeHtml(settings.labName)}</small></div></section>
      ${reportFooter(4)}
    </article>`;
}

function renderDashboard() {
  const query = normalize($("globalSearch")?.value);
  const patients = database.patients.filter((patient) => !query || normalize(`${patient.name} ${patient.documentType} ${patient.documentNumber}`).includes(query));
  const container = $("dashboardResults");
  if (!container) return;
  if (!patients.length) {
    container.innerHTML = `<div class="empty-dashboard"><b>${query ? "No se encontraron coincidencias." : "Todavía no hay pacientes guardados."}</b><span>Guarda el primer informe para crear el historial.</span></div>`;
    return;
  }
  container.innerHTML = patients.map((patient) => {
    const reports = database.reports.filter((report) => report.patientId === patient.id).sort((a, b) => new Date(b.savedAt) - new Date(a.savedAt));
    return `<article class="patient-result"><div><b>${escapeHtml(patient.name || "Sin nombre")}</b><span>${escapeHtml(patient.documentType)} ${escapeHtml(patient.documentNumber)} · ${reports.length} informe(s)</span></div><button type="button" data-new-patient="${patient.id}">Nuevo informe</button><section class="report-versions">${reports.map((report) => `<div class="version-card"><span><b>Versión ${report.version}</b>${formatDateTime(report.savedAt)}</span><div><button type="button" data-edit-report="${report.id}">Editar</button><button type="button" data-print-report="${report.id}">Descargar PDF</button></div></div>`).join("")}</section></article>`;
  }).join("");
}

function reportById(id) { return database.reports.find((report) => report.id === id); }
function patientById(id) { return database.patients.find((patient) => patient.id === id); }

function openNewReport(patientId = null) {
  currentPatientId = patientId;
  const patient = patientById(patientId);
  const fresh = makeEmptyState();
  if (patient) {
    fresh.patientName = patient.name;
    fresh.documentType = patient.documentType;
    fresh.patientDocument = patient.documentNumber;
  }
  currentTab = "its";
  applyState(fresh);
  showView("editorView");
}

function openReport(id, printAfter = false) {
  const report = reportById(id);
  if (!report) return;
  currentPatientId = report.patientId;
  applyState(report.state);
  showView("editorView");
  if (printAfter) setTimeout(() => window.print(), 180);
}

async function saveReport() {
  collectBasicState();
  if (!state.patientName.trim()) { notify("Escribe el nombre del paciente.", "error"); return; }
  if (!state.patientDocument.trim()) { notify("Escribe el documento del paciente.", "error"); return; }
  try {
    const result = await api("/api/reports", {
      method: "POST",
      body: JSON.stringify({
        title: settings.reportTitle,
        patient: { id: currentPatientId, name: state.patientName, documentType: state.documentType, documentNumber: state.patientDocument },
        state,
      }),
    });
    currentPatientId = result.patient.id;
    database = result.state;
    renderDashboard();
    notify(`Informe guardado como versión ${result.report.version}.`);
  } catch { notify("No se pudo guardar el informe.", "error"); }
}

function renderSettings() {
  $("settingReportTitle").value = settings.reportTitle;
  $("settingReportSubtitle").value = settings.reportSubtitle;
  $("settingLabName").value = settings.labName;
  $("settingSignature").value = settings.signature;
  $("settingLegalNote").value = settings.legalNote;
  $("settingSampleType").value = settings.sampleType;
  $("settingInterpretation").value = settings.interpretation;
  $("settingRecommendations").value = settings.recommendations;
  $("vphSettings").innerHTML = Object.entries(settings.vphGroups).map(([group, curve]) => `<div class="curve-row"><b>Grupo ${group}</b><label>Pendiente (m)<input type="number" step="any" data-curve="${group}.m" value="${curve.m}"></label><label>Intercepto (b)<input type="number" step="any" data-curve="${group}.b" value="${curve.b}"></label><label>Fin de carga baja<input type="number" step="any" min="0" data-curve="${group}.low" value="${curve.low}"></label><label>Fin de carga media<input type="number" step="any" min="0" data-curve="${group}.medium" value="${curve.medium}"></label><label class="curve-label">Texto de referencia<input data-curve="${group}.label" value="${escapeHtml(curve.label)}"></label></div>`).join("");
}

function collectSettings() {
  settings.reportTitle = $("settingReportTitle").value.trim();
  settings.reportSubtitle = $("settingReportSubtitle").value.trim();
  settings.labName = $("settingLabName").value.trim();
  settings.signature = $("settingSignature").value.trim();
  settings.legalNote = $("settingLegalNote").value.trim();
  settings.sampleType = $("settingSampleType").value.trim();
  settings.interpretation = $("settingInterpretation").value.trim();
  settings.recommendations = $("settingRecommendations").value.trim();
  document.querySelectorAll("[data-curve]").forEach((input) => {
    const [group, key] = input.dataset.curve.split(".");
    settings.vphGroups[group][key] = key === "label" ? input.value : Number(input.value);
  });
}

async function saveSettings() {
  collectSettings();
  const invalid = Object.values(settings.vphGroups).some((curve) => !Number.isFinite(curve.m) || curve.m === 0 || !Number.isFinite(curve.b) || curve.low < 0 || curve.medium < curve.low);
  if (invalid) { $("settingsStatus").textContent = "Revisa las curvas y umbrales de VPH."; return; }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  try {
    await api("/api/settings", { method: "POST", body: JSON.stringify(settings) });
    $("settingsStatus").textContent = "Configuración guardada.";
  } catch { $("settingsStatus").textContent = "Guardada en este navegador; el servidor no respondió."; }
  renderReport();
}

async function restoreSettings() {
  settings = clone(DEFAULT_SETTINGS);
  renderSettings();
  await saveSettings();
  notify("Se restauraron los valores originales.");
}

function loadExample() {
  const example = makeEmptyState();
  Object.assign(example, {
    patientName: "Paciente de ejemplo", patientDocument: "V-00.000.000", birthDate: "1988-04-12",
    dnaConcentration: "42,8 ng/ul", purity: "Óptima",
    interpretation: "El control interno y la calidad de la muestra respaldan la validez analítica. Se identificaron hallazgos moleculares que deben correlacionarse con la evaluación clínica especializada.",
    observations: "Muestra procesada sin incidencias preanalíticas.",
  });
  example.results.its.chlamydia = "low";
  example.results.its.ureaplasma_parvum = "medium";
  example.results.bacteria.escherichia = "medium";
  example.results.fungi.candida_albicans = "low";
  example.vph["16"] = "22";
  example.vph["6"] = "27";
  currentPatientId = null;
  applyState(example);
  showView("editorView");
}

async function bootstrap() {
  const local = localStorage.getItem(STORAGE_KEY);
  if (local) {
    try { settings = deepMerge(DEFAULT_SETTINGS, JSON.parse(local)); } catch { settings = clone(DEFAULT_SETTINGS); }
  }
  try {
    const remote = await api("/api/settings");
    if (Object.keys(remote).length) settings = deepMerge(settings, remote);
  } catch { /* La configuracion local sigue disponible. */ }
  state = makeEmptyState();
  renderSettings();
  applyState(state);
  try { database = await api("/api/state"); } catch { database = { patients: [], reports: [] }; }
  renderDashboard();
}

document.addEventListener("input", (event) => {
  if (event.target.id === "globalSearch") { renderDashboard(); return; }
  if (BASIC_FIELDS.includes(event.target.id)) { collectBasicState(); renderReport(); }
});

document.addEventListener("change", (event) => {
  const result = event.target.closest("[data-result-group]");
  if (result) {
    state.results[result.dataset.resultGroup][result.dataset.resultId] = result.value;
    result.className = `result-select ${result.value}`;
    renderReport();
    return;
  }
  if (BASIC_FIELDS.includes(event.target.id)) { collectBasicState(); renderReport(); }
});

document.addEventListener("input", (event) => {
  const input = event.target.closest("[data-vph-id]");
  if (!input) return;
  state.vph[input.dataset.vphId] = input.value;
  const meta = GENOTYPES.find((item) => item.id === input.dataset.vphId);
  const load = vphLoad(meta, input.value);
  const status = classifyVph(meta, load);
  const card = input.closest(".vph-input");
  card.classList.remove("none", "low", "medium", "high");
  card.classList.add(status.value);
  card.querySelector("i").textContent = load === null ? "No detectado" : `${status.label} · ${formatNumber(load, 2)}`;
  renderReport();
});

document.addEventListener("click", (event) => {
  const tab = event.target.closest("[data-result-tab]");
  if (tab) { currentTab = tab.dataset.resultTab; renderResultPanel(); return; }
  const edit = event.target.closest("[data-edit-report]");
  if (edit) { openReport(edit.dataset.editReport); return; }
  const print = event.target.closest("[data-print-report]");
  if (print) { openReport(print.dataset.printReport, true); return; }
  const patient = event.target.closest("[data-new-patient]");
  if (patient) { openNewReport(patient.dataset.newPatient); return; }
  const button = event.target.closest("[data-action]");
  if (!button) return;
  const action = button.dataset.action;
  if (action === "home") showView("dashboard");
  if (action === "history") { renderDashboard(); showView("historyView"); }
  if (action === "new-report") openNewReport();
  if (action === "editor") showView("editorView");
  if (action === "settings") { renderSettings(); showView("settingsView"); }
  if (action === "instructions") $("instructionsDialog").showModal();
  if (action === "close-instructions") $("instructionsDialog").close();
  if (action === "example") loadExample();
  if (action === "clear") openNewReport();
  if (action === "save-report") void saveReport();
  if (action === "save-settings") void saveSettings();
  if (action === "restore-settings") void restoreSettings();
  if (action === "print") { collectBasicState(); renderReport(); setTimeout(() => window.print(), 100); }
});

bootstrap();
