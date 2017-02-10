FROM node:7.4.0
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app
RUN npm install
COPY . /usr/src/app
EXPOSE 4000
EXPOSE 3000
CMD [ "/bin/bash", "start.sh" ]
