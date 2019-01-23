const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')
const port = (process.env.PORT || '3000');



const debug = require('debug')('app:server');
const http = require('http');



const mongoose = require('./db/mongoose')

//Routes

const postsRouter = require('./routes/posts');

const app = express();

app.use(bodyParser.json())

app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());


app.use('/posts', postsRouter);



// catch 404 and forward to error handler
app.use(function (req, res, next) {
    res.status(404).send({
        "error": "There is no such a method"
    })
});





const server = http.createServer(app);
server.listen(port);

server.on('error', onError);
server.on('listening', onListening);


function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    let bind = typeof port === 'string' ?
        'Pipe ' + port :
        'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    let addr = server.address();
    let bind = typeof addr === 'string' ?
        'pipe ' + addr :
        'port ' + addr.port;
    debug('Listening on ' + bind);
}

module.exports = server;
