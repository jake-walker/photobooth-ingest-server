FROM kkarczmarczyk/node-yarn:latest

WORKDIR /opt/

ADD ./ /opt/

ENV NODE_ENV production
ENV INSTAGRAM_USERNAME changeme
ENV INSTAGRAM_PASSWORD changeme

RUN yarn install

EXPOSE 3000

ENTRYPOINT [ "node", "/opt/index.js" ]