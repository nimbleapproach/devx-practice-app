FROM mcr.microsoft.com/playwright:v1.50.1-noble

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY . .

RUN npm install