FROM node:18-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . . 
EXPOSE 300
CMD ["npm", "run", "dev"]

