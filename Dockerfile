FROM nginx:latest
COPY dist/dd-web /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY deploy/nginx.conf /etc/nginx/conf.d
EXPOSE 3001
CMD ["nginx", "-g", "daemon off;"]