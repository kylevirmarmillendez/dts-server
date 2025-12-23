# Use a lightweight Node.js image
FROM node:20-slim

# Create app directory
WORKDIR /app

# Install app dependencies (package-lock.json if available will be used)
COPY package*.json ./
RUN npm ci --only=production

# Bundle app source
COPY . .

# Use a non-root user for security
RUN chown -R node:node /app
USER node

# Expose the port the app runs on
EXPOSE 8000

# Use the start script defined in package.json
CMD ["npm", "start"]
