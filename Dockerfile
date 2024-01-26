FROM mhart/apline-node

WORKDIR /app

COPY package* .

RUN npm install

COPY . .

EXPOSE 8000

CMD ["node", "index.js"]