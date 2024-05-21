# Use an official Node.js image as the base
FROM node:latest AS builder

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the frontend app
RUN npm run build

# Use Nginx as the base image for serving the built files
FROM nginx:latest

# Copy the built files from the previous stage to the Nginx container
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80 to the outside world
EXPOSE 80

# Default command to start Nginx when the container is run
CMD ["nginx", "-g", "daemon off;"]
