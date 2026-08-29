FROM python:3.12-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    HOST=0.0.0.0 \
    PORT=80 \
    PANEL_NO_BROWSER=1 \
    DATA_DIR=/data

WORKDIR /app
COPY app /app/app
RUN mkdir -p /data
EXPOSE 80
CMD ["python", "/app/app/app.py"]
