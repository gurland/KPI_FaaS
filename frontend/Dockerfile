# Stage 1: Build the SvelteKit app
FROM node:20 AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Build the SvelteKit app
RUN npm run build

# Command to serve the app
CMD ["npm", "run", "preview"]
