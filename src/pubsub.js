const {REDIS_URL, REDIS_CHANNEL, NODE_INDEX} = require('./config');
const redis = require('redis');

// Create Pub/Sub Clients
const sub = redis.createClient(REDIS_URL);
const pub = redis.createClient(REDIS_URL);

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