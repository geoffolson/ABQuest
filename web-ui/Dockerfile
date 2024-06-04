# Use an official Node.js image as the base for building the application
FROM node:latest AS builder

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the entire project
COPY . .

# Install dependencies and build the web-ui package
RUN npm install
RUN npm run build --workspaces

# Use Nginx as the base image for serving the built files
FROM nginx:latest

# Copy the built files from the previous stage to the Nginx container
COPY --from=builder /usr/src/app/web-ui/dist /usr/share/nginx/html

# Expose port 80 to the outside world
EXPOSE 80

# Default command to start Nginx when the container is run
CMD ["nginx", "-g", "daemon off;"]
