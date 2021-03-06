const {Queue, Worker} = require('bullmq');
const IORedis = require('ioredis');
const {REDIS_URL} = require('./config');

const connection = new IORedis(REDIS_URL);
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