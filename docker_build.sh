#!/bin/bash

# Set the version
VERSION=0.0.5

# Build the image
echo "Building version: $VERSION"
docker build --platform=linux/amd64 -t joker-frontend:$VERSION .

# Tag the image
echo "Tagging..."
docker tag joker-frontend:$VERSION haven.testiprod.net/joker-frontend:$VERSION

# Push the image
echo "Pushing..."
docker push haven.testiprod.net/joker-frontend:$VERSION

# Print the version for confirmation
echo "Done pushing version: $VERSION"
