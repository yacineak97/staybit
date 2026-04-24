FROM node:alpine

WORKDIR /usr/src/app

COPY . .

RUN npm install

CMD ["npx", "jest", "--runInBand", "--verbose", "--detectOpenHandles"]