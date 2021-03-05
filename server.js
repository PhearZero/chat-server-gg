const {PORT, NODE_INDEX, WORKER} = require('./src/config');

if(WORKER) require('./src/worker')
else require('./src/app').listen(PORT, (listenSocket) => {
    if (listenSocket) {
        console.log(`Listening to port ${PORT} on agent ${NODE_INDEX}`);
    }
});