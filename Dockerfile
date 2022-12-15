# base image
FROM alpine
RUN apk add --update nodejs npm

WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .

ENV BASE_URL=https://lambda-dev-be-wlui4vdhhq-no.a.run.app
RUN npm run build
CMD ["npm", "run", "server"]