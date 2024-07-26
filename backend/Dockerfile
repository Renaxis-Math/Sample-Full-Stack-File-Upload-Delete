# Use official Node.js image as the base
FROM node:18

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy application files
COPY . .

# Expose port (default is 3001; adjust if needed)
EXPOSE 5000

# Start the application
CMD ["node", "server.js"]