const http = require('http')
const app = require('./app').default.default

const port = process.env.PORT || 3000;

const server = http.createServerServer(app);

server.lister(port)