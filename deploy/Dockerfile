FROM nginx:latest
COPY dd-web /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d
EXPOSE 3001
CMD ["nginx", "-g", "daemon off;"]
