# Use an official Node runtime as a parent image
FROM node:20 AS builder

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the entire project
COPY . .

# Install dependencies and build all packages
RUN npm install
RUN npm run build --workspaces

# Second stage: Copy built files to final image
FROM node:20

ARG DATABASE_URL=DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy only the built output from the builder stage
COPY --from=builder /usr/src/app .

# Navigate to the API package
WORKDIR /usr/src/app/api

# Install production dependencies
RUN npm install --production

# Generate and migrate Prisma schema
RUN npx prisma generate
# RUN npx prisma migrate dev --name init

# Expose port 3000 (or whatever port your Express app listens on)
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]
