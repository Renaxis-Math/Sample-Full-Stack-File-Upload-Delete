# Use official Node.js image as the base
FROM node:18

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy application files
COPY . .

# Build the application (optional but recommended for production)
RUN npm run build

# Expose port (default is 3000; adjust if needed)
EXPOSE 3000

# Start the application
CMD ["npm", "start"]