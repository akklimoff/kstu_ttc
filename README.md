# KSTU Technology Transfer Center Website

Official website for the Technology Transfer Center at KSTU im. I. Razzakova.

## Features

- Modern, responsive design with smooth animations
- Professional university aesthetic
- Multilingual support (Russian/English)
- Optimized for performance
- Docker-ready deployment

## Technology Stack

- **Frontend:** Next.js (static export)
- **Styling:** Tailwind CSS + Custom animations
- **Server:** Nginx (Alpine Linux)
- **Deployment:** Docker + Docker Compose

## Quick Start

### Option 1: Using Docker Compose (Recommended)

```bash
# Build and start the container
docker-compose up -d

# View logs
docker-compose logs -f

# Stop the container
docker-compose down
```

The website will be available at: **http://localhost:8080**

### Option 2: Using Docker CLI

```bash
# Build the image
docker build -t kstu-website:latest .

# Run the container
docker run -d \
  --name kstu-website \
  -p 8080:80 \
  --restart unless-stopped \
  kstu-website:latest

# Stop and remove the container
docker stop kstu-website
docker rm kstu-website
```

### Option 3: Local Development Server

```bash
# Using Python
python3 -m http.server 8000

# Using Node.js (if installed)
npx http-server -p 8000
```

## Project Structure

```
web/
├── _next/                  # Next.js static assets
│   └── static/
│       ├── chunks/         # JavaScript bundles
│       ├── css/            # Compiled styles
│       └── media/          # Fonts and images
├── ru/                     # Russian language pages
│   ├── about.html          # About page
│   ├── services.html       # Services page
│   └── contacts.html       # Contacts page
├── modern-enhancements.css # Custom animations and styles
├── modern-enhancements.js  # Interactive JavaScript
├── headerLogo.svg          # Site logo
├── Dockerfile              # Docker configuration
├── docker-compose.yml      # Docker Compose configuration
├── nginx.conf              # Nginx server configuration
└── README.md               # This file
```

## Available Pages

- **Home/About:** `/ru/about.html` - Information about the Technology Transfer Center
- **Services:** `/ru/services.html` - Services offered
- **Contacts:** `/ru/contacts.html` - Contact information and form

## Modern Enhancements

The website includes modern web design best practices:

### Animations
- Smooth scroll-triggered fade-in effects
- Sidebar slide-in animations
- Card hover effects with transforms
- Button ripple effects
- Reading progress bar

### Performance
- Gzip compression
- Browser caching for static assets
- Optimized image loading
- Minified CSS and JavaScript

### Accessibility
- Semantic HTML
- ARIA labels
- Keyboard navigation support
- Screen reader friendly
- Reduced motion support

## Configuration

### Changing the Port

Edit `docker-compose.yml`:

```yaml
ports:
  - "YOUR_PORT:80"  # Change YOUR_PORT to desired port
```

### Custom Nginx Configuration

Edit `nginx.conf` to modify server settings:
- Caching policies
- Security headers
- URL redirects
- Error pages

## Maintenance

### Updating the Website

1. Update HTML files in `ru/` directory
2. Modify styles in `modern-enhancements.css`
3. Update interactions in `modern-enhancements.js`
4. Rebuild the Docker image:

```bash
docker-compose down
docker-compose up -d --build
```

### Viewing Logs

```bash
# Docker Compose
docker-compose logs -f web

# Docker CLI
docker logs -f kstu-website
```

### Health Check

```bash
# Check container status
docker ps | grep kstu-transfer-website

# Test website availability
curl -I http://localhost:8080/ru/about.html
```

## Production Deployment

For production deployment:

1. **Update `docker-compose.yml`:**
   - Change port if needed
   - Set proper restart policy
   - Add volume mounts for logs

2. **SSL/HTTPS Setup:**
   - Use reverse proxy (nginx, Caddy, Traefik)
   - Configure SSL certificates (Let's Encrypt)
   - Update security headers

3. **Monitoring:**
   - Set up logging (ELK stack, Grafana)
   - Configure health checks
   - Set up alerts

## Troubleshooting

### Container won't start

```bash
# Check logs
docker-compose logs web

# Verify port is not in use
lsof -i :8080
```

### Website returns 404

```bash
# Verify files are copied correctly
docker exec kstu-transfer-website ls -la /usr/share/nginx/html/ru/
```

### Styles not loading

```bash
# Check if CSS file exists
docker exec kstu-transfer-website ls -la /usr/share/nginx/html/modern-enhancements.css

# Verify nginx configuration
docker exec kstu-transfer-website cat /etc/nginx/conf.d/default.conf
```

## Contact

**KSTU Technology Transfer Center**
- **Phone:** +996 508 888 568
- **Email:** ttc@kstu.kg
- **Address:** 720044, Kyrgyzstan, Bishkek, Ch. Aitmatov Ave, 66, office 1/333

## License

© 2024 KSTU Technology Transfer Center. All rights reserved.
