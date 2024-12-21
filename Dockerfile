# Use the Bun slim image as the base image
FROM oven/bun:slim

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and bun.lockb files to the container
COPY package.json bun.lockb ./

# Install dependencies using Bun
RUN bun install

# Copy the rest of your application code
COPY . .

# Expose the port your Express app runs on (default for Express is 3000)
EXPOSE 8080

# Command to run the Express app with Bun
CMD ["bun", "start"]
