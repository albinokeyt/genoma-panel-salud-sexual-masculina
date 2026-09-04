# Panel Integral de Salud Sexual Masculina

Aplicacion local para registrar resultados moleculares de ITS, bacterias uropatogenas, hongos y 28 genotipos de VPH. Incluye historial por paciente, versiones de informes y descarga directa de PDF A4, sin depender del papel o los margenes de impresion del navegador.

## Ejecucion local

```powershell
python app/app.py
```

## EasyPanel

Use el `Dockerfile` de la raiz, puerto interno `80` y monte un volumen persistente en `/data` para conservar pacientes, informes y configuracion.

## Verificacion de PDF

`python tests/pdf_preview_server.py` inicia una prueba aislada en localhost con datos en `qa/data`. Al generar un PDF en esa instancia, sus bytes se guardan en `qa/pdf` en lugar de descargarse. Probar desde el editor y el historial, con pantallas de escritorio y movil. No usar datos reales en estas pruebas.

`python tests/check_pdf.py qa/pdf/report-1.pdf` comprueba cuatro paginas A4 con contenido (requiere `pypdf` y `Pillow`). Revisar tambien las paginas renderizadas con `pdftoppm` para detectar cortes o solapamientos. El servidor de produccion no carga estos archivos de prueba.
