FROM node:16-alpine as base
WORKDIR /backend
COPY package.json ./
EXPOSE 3000

# If you are building your code for production
# RUN npm ci --only=production
FROM base as production
ENV NODE_ENV=production
RUN npm ci
COPY . /
CMD ["node", "bin/www"]

FROM base as dev
ENV NODE_ENV=development
RUN npm install -g nodemon && npm install
COPY . /
CMD ["nodemon","-L", "bin/www"]