# Setup and build the client
FROM node:alpine as client
WORKDIR /usr/src/app/client/
COPY client/package.json ./
RUN yarn
COPY client/ ./
RUN yarn run build
# Setup the server
FROM node:alpine
WORKDIR /usr/src/app/
COPY --from=client /usr/src/app/client/build/ ./client/build/
WORKDIR /usr/src/app/server/
COPY server/package.json ./
RUN yarn
COPY server/ ./
CMD ["node", "index.js"]