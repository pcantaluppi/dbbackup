FROM node:14-alpine3.10

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

EXPOSE 80
#CMD [ "npm", "start" ]
CMD ["pm2-runtime", ".\\bin\\www"]
