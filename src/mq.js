const {Queue, Worker} = require('bullmq');
const {REDIS_HOSTNAME, REDIS_PORT, NODE_INDEX} = require('./config');
const {fail} = require('./utils');

const connection = {
    host: REDIS_HOSTNAME,
    port: REDIS_PORT
}
let queue;
/**
 * Create a Bullmq Storage Queue
 * @param name
 * @returns {Queue}
 */
const createQueue = ({name="Store"}) =>{
    queue = queue ?  queue : new Queue(name, {connection});
    return queue
}

let worker;
/**
 * Create a BullMQ Queue Worker
 *
 *   This worker stores jobs in Pouchdb
 * @param name
 * @param db {PouchDB}
 * @returns {Worker}
 */
const createWorker = ({name="Store", db})=>{
    if(worker) return worker;
    return new Worker(name, async job => {
        console.log(`WORKER: Processing ${job.id}`)
            await db.post(job.data);
        },
        {connection}
    );
}


module.exports = {
    createQueue,
    createWorker,
}