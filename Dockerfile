FROM node:14-alpine

# assign a working directory
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

# copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# install dependencies
RUN npm install

# copy the project to the working directory
COPY . .

# building a Vue application
RUN npm run build

# start app
CMD npm run serve
