FROM node:18.19.1

WORKDIR /usr/src/frontend

# Copy the rest of the source files into the image.
COPY . .

RUN ["npm", "install"]

# Run the application as a non-root user.
# USER node


# Expose the port that the application listens on.
EXPOSE 3000

CMD ["npm", "run", "dev"]

