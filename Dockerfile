
FROM node:16-alpine
RUN mkdir -p /app
WORKDIR /app
COPY . .

RUN yarn install --ignore-scripts

EXPOSE 3300

CMD ["yarn", "start:dev"]