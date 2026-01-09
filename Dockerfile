FROM python:3.10-alpine

# Set environment variables
ARG TUBETUBE_VERSION
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PYTHONPATH=/app/tubetube \
    TUBETUBE_VERSION=${TUBETUBE_VERSION}

# Set the working directory
WORKDIR /app

# Copy the application code
COPY requirements.txt .

# Install Python dependencies
RUN apk update && apk add --no-cache ffmpeg su-exec deno && \
    addgroup -g 1000 appgroup && adduser -D -u 1000 -G appgroup appuser && \
    pip install --upgrade pip --root-user-action=ignore && \
    pip install --no-cache-dir --root-user-action=ignore -r requirements.txt && \
    mkdir -p /config /data /temp && \
    chown -R appuser:appgroup /config /data /temp && \
    chmod -R 775 /temp

COPY . .

# Expose the application port
EXPOSE 6543

# Use the start script as the entrypoint
ENTRYPOINT ["/app/start.sh"]

