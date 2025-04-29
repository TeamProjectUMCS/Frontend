FROM node:18-alpine AS build

WORKDIR /app/my-app

# Install build dependencies
RUN npm install
# Copy all project files and build
COPY my-app/ .
RUN npm run build

# Production stage
FROM node:18-alpine AS production

WORKDIR /app

# Copy built assets from the build stage
COPY --from=build /app/build ./build
COPY --from=build /app/package*.json ./
COPY --from=build /app/node_modules ./node_modules

# Expose the port your app runs on
EXPOSE 3000

# Start the application
CMD ["node", "build/index.js"]