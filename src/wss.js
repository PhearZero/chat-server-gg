const {REDIS_CHANNEL, NODE_INDEX} = require('./config')
const {pub, sub} = require('./pubsub');
const {createQueue} = require('./mq');
const {fail} = require('./utils');

const queue = createQueue({});

/**
 * Handle the subscription
 * @param channel {String}
 * @param msg {String}
 * @param socket {WebSocket}
 */
const handleSub = (channel, msg, socket) =>{
    // Log message
    console.log(`RECEIVED from ${channel}`)
    // If a socket exists, send the message
    if(socket) socket.send(`${channel}: ${msg}, NODE: ${NODE_INDEX}`)
    // Fail, we always need a socket
    else fail(new Error('No Socket Instance!'))
}

// So fast yaz
module.exports = App => App.ws('/*', {
    idleTimeout: 30,
    maxBackpressure: 1024,
    maxPayloadLength: 512,
    // Setup Redis Subscription Listener on Open
    open: (ws) => {
        console.log(`WS_OPEN`);
        // Receive Message from Redis and emit to socket
        sub.on('message', (channel, message)=>handleSub(channel, message, ws))
    },
    // Remove Redis Subscription Listener on Close
    close: (ws) => {
        console.log(`WS_CLOSE`);
        sub.removeAllListeners()
    },
    // Publish messages to Redis + Queue
    message: (ws, message, isBinary) => {
        // TODO: Compress/ProtoBuff
        let sBuffer = Buffer.from(message)
        // Add the message to the storage queue
        // TODO: Pass Buffer instead of string
        queue.add("messages", {channel: REDIS_CHANNEL, message: sBuffer.toString()});
        // Every Message gets published into for all instances of WSS
        pub.publish(REDIS_CHANNEL, sBuffer)
    }

})