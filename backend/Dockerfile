# Use Node.js base image
FROM node:16

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the backend code into the container
COPY . .

# Expose the port the backend service will run on
EXPOSE 5000

# Start the application
CMD ["node", "server.js"]

