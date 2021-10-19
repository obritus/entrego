FROM node:lts-alpine
RUN adduser app -g app -D -s /bin/false
ENV HOME=/home/app
COPY package.json $HOME/api
RUN chown -R app:app $HOME/*
USER app
WORKDIR $HOME/api
RUN yarn
USER root
COPY . $HOME/api
USER app
CMD ["node", "index.js"]