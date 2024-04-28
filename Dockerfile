FROM node:20

# Set the working directory within the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies within the container
RUN npm install

# Copy the rest of your app's source code from your host to your image filesystem.
COPY . .

# If you are building your code for production
# RUN npm ci --only=production

# Make the container's port 8080 available to the outside
EXPOSE 8080

# Define the command to run your app using CMD which defines your runtime
CMD [ "node", "index.js" ]
