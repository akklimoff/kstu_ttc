# Multi-stage build for optimized production image
FROM nginx:alpine

# Set maintainer label
LABEL maintainer="KSTU Technology Transfer Center"
LABEL description="KSTU Transfer Technology Center Website"

# Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

# Copy website files to nginx html directory
COPY _next /usr/share/nginx/html/_next
COPY ru /usr/share/nginx/html/ru
COPY modern-enhancements.css /usr/share/nginx/html/modern-enhancements.css
COPY modern-enhancements.js /usr/share/nginx/html/modern-enhancements.js
COPY headerLogo.svg /usr/share/nginx/html/headerLogo.svg
COPY index.html /usr/share/nginx/html/index.html

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Set proper permissions
RUN chmod -R 755 /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
