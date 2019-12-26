// nodemon -r esm index.js"
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

import postsRouter from './posts/router';

const server = express();
server.use(express.json());
server.use(helmet());
server.use(morgan('dev'));

server.use('/api/posts', postsRouter);

server.get('/', (req, res) => {
    res.send(`
        <h2>Welcome to my REST API</h2>
        <p>Visit <a>https://github.com/chingsley/webapi-ii-challenge</a> to see the available endpoints</p>
    `);
})


export default server;
