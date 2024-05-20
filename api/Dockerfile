FROM node:20

# Set working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .
RUN npx prisma generate
RUN npx prisma migrate dev --name init

# Expose port 3000 (or whatever port your Express app listens on)
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]