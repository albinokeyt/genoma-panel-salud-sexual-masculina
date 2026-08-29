# Panel Integral de Salud Sexual Masculina

Aplicacion local para registrar resultados moleculares de ITS, bacterias uropatogenas, hongos y 28 genotipos de VPH. Incluye historial por paciente, versiones de informes y salida A4 mediante la funcion de impresion del navegador.

## Ejecucion local

```powershell
python app/app.py
```

## EasyPanel

Use el `Dockerfile` de la raiz, puerto interno `80` y monte un volumen persistente en `/data` para conservar pacientes, informes y configuracion.
