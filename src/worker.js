const os = require('os');
const cluster = require('cluster');
const {createWorker} = require('./mq');
const {createDB} = require('./database');

if(cluster.isMaster){
    for (let i = 0; i < os.cpus().length; i++) {
        cluster.fork();
    }

    cluster.on('online', function(worker) {
        console.log('WORKER: ' + worker.process.pid + ' online');
    });

    cluster.on('exit', function(worker, code, signal) {
        console.log('WORKER: ' + worker.process.pid + ' died');
    });
}else{
    createWorker({db:createDB()});
}