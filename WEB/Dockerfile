########################예시########################


# Base image
FROM node:14

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY mainpage/client/package.json mainpage/client/package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY mainpage/client ./

# Build the React application
RUN npm run build

# Install serve to serve the build files
RUN npm install -g serve

# Expose the port the app runs on
EXPOSE 3000

# Command to serve the build files
CMD ["serve", "-s", "build"]
