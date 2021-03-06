const {REDIS_URL, REDIS_CHANNEL} = require('./config');
const IORedis = require('ioredis');

// Create Pub/Sub Clients
const sub = new IORedis(REDIS_URL);
const pub = new IORedis(REDIS_URL);

// Generic failure with process exit
const fail = (err)=>{
    console.error(err)
    process.exit(1)
};

// Fail on error
pub.on("error", fail);
sub.on("error", fail);

// Subscribe to SUB Channel
sub.subscribe(REDIS_CHANNEL)



module.exports = {
    pub,
    sub
}