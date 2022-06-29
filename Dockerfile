FROM debian:bullseye-slim

RUN groupadd --gid 1000 node \
  && useradd --uid 1000 --gid node --shell /bin/bash --create-home node

ARG NODE_VERSION=14.17.3
ARG NODE_PACKAGE=node-v$NODE_VERSION-linux-x64
ARG NODE_HOME=/opt/$NODE_PACKAGE
ENV NODE_PATH $NODE_HOME/lib/node_modules
ENV PATH $NODE_HOME/bin:$PATH
ENV NODE_VERSION $NODE_VERSION
RUN apt -y update \
    && apt -y install curl \
    && curl https://nodejs.org/dist/v$NODE_VERSION/$NODE_PACKAGE.tar.gz | tar -xzC /opt/

RUN ln -fs /usr/share/zoneinfo/Europe/Istanbul /etc/localtime && \
    dpkg-reconfigure -f noninteractive tzdata

RUN npm i -g webpack

USER node

WORKDIR /var/www/html/mern

COPY --chown=node:node . ./

RUN mv .env.docker .env

RUN npm install

RUN npm run build

EXPOSE 3000
CMD ["node", "dist/server.js"]