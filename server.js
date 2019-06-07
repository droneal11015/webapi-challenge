const express = require('express');
const helmet = require('helmet');
const server = express();
const actionRouter = require('./data/helpers/actionRouter.js');
const projectRouter = require('./data/helpers/projectRouter.js');


server.use(helmet());
server.use(express.json());

server.use('/api/actions', actionRouter);
server.use('/api/projects', projectRouter);

server.get('/', (req, res) => {
    res.send('<h1>Server is up and running</h1>')
})

module.exports = server;