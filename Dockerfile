FROM node:18-alpine AS build

WORKDIR /app/my-app

# Install dependencies first (for better caching)
COPY package*.json ./
RUN npm ci

# Install the missing adapter
RUN npm install --save-dev @sveltejs/adapter-node

# Copy all project files
COPY . .

# Generate the .svelte-kit directory
RUN npx svelte-kit sync

# Now build the application
RUN npm run build

# Production stage
FROM node:18-alpine AS production

WORKDIR /app/my-app

# Copy built assets from the build stage
COPY --from=build /app/my-app/build ./build
COPY --from=build /app/my-app/package*.json ./
COPY --from=build /app/my-app/node_modules ./node_modules

# Expose the port your app runs on
EXPOSE 3000

# Start the application
CMD ["node", "build/index.js"]