FROM node
MAINTAINER Equipo Web Platforms
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 3000
CMD npm start
