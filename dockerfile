# Step 1: Use the official Node.js image as the base image
FROM node:16

# Step 2: Set the working directory
WORKDIR /app

# Step 3: Copy package.json and package-lock.json into the container
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the application into the container
COPY . .

# Step 6: Build the application
RUN npm run build

# Step 7: Serve the build files using a lightweight web server
FROM nginx:alpine
COPY --from=0 /app/build /usr/share/nginx/html

# Step 8: Expose the port for the web server
EXPOSE 80

# Step 9: Start the Nginx server
CMD ["nginx", "-g", "daemon off;"]
