FROM node:18.19.1

WORKDIR /usr/src/frontend

# Copy the rest of the source files into the image.
COPY . . 

RUN npm install

RUN npm run build

CMD ["npm", "start"]
