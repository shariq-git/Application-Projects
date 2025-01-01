# Use a lightweight Node.js image as the base
FROM node:16-alpine as build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app source code
COPY . .

# Build the app
RUN npm run build

# Use a lightweight web server to serve the build
FROM nginx:alpine

# Copy the custom NGINX configuration
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf


# Copy the build output to Nginx's html directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose the default Nginx port
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]

