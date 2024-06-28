# Usar una imagen de Node.js para construir la aplicación Angular
FROM node:16 AS build

# Establecer el directorio de trabajo en el contenedor
WORKDIR /app

# Copiar el package.json y el package-lock.json
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar todo el código fuente de la aplicación
COPY . .

# Construir la aplicación Angular
RUN npm run build

# Usar una imagen de Nginx para servir la aplicación Angular
FROM nginx:alpine

# Copiar los archivos construidos a la carpeta de Nginx
COPY --from=build /app/dist/learning-center /usr/share/nginx/html

# Exponer el puerto 80 para el servidor Nginx
EXPOSE 80

# Comando para ejecutar Nginx
CMD ["nginx", "-g", "daemon off;"]
