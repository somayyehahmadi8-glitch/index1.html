# Base44 Setup Notes

## Project
Static single-page site served from `index.html` at the repo root.

## Running
```bash
docker compose -f docker-compose.base44.yml up -d
```
Serves on port 3000 via nginx:alpine. The repo directory has restrictive permissions (0700), so a custom `nginx.base44.conf` runs nginx workers as `root` to allow reading the bind-mounted files.

## Verification
- `curl http://localhost:3000/` returns 200.
- Healthcheck: `wget --spider http://localhost:80/` inside the container.

## Notes
- No external credentials or secrets required.
- No build step — files are served directly from the bind mount.
