#!/bin/bash

# Check if an argument is provided
if [ $# -eq 0 ]; then
    echo "Error: Please provide a version name like 1.2.3."
    exit 1
fi

# Set the version
VERSION="$1"

# Build the image
echo "Building version: $VERSION"
docker build --platform=linux/amd64 -t joker-frontend:$VERSION .

# Tag the image
echo "Tagging..."
docker tag joker-frontend:$VERSION haven.testiprod.net/joker-frontend:$VERSION
docker tag joker-frontend:$VERSION haven.testiprod.net/joker-frontend:latest

# Push the image
echo "Pushing..."
docker push haven.testiprod.net/joker-frontend:$VERSION
docker push haven.testiprod.net/joker-frontend:latest

# Print the version for confirmation
echo "Done pushing version: $VERSION"
