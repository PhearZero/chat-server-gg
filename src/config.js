// Port for WebSocket Server
const PORT = process.env.PORT || 9001;
// Hostname for Redis
const REDIS_HOSTNAME = process.env.REDIS_HOSTNAME || 'redis';
// Port for Redis
const REDIS_PORT = process.env.REDIS_PORT || '6379';
// Channel name to Subscribe to
const REDIS_CHANNEL = process.env.REDIS_CHANNEL || 'MESSAGES';
// Full Redis URL
const REDIS_URL = process.env.REDIS_URL || `redis://${REDIS_HOSTNAME}:${REDIS_PORT}`
// Message Queue Name
const BULLMQ_QUEUE_NAME = process.env.BULLMQ_QUEUE_NAME || REDIS_CHANNEL;
// Couchdb URL
const COUCHDB_URL = process.env.COUCHDB_URL || "http://admin:admin@database:5984/chat-gg";
// TODO: Remove instance metadata, should not track which instance just for demonstration
const NODE_INDEX = process.env.NODE_INDEX && process.env.NODE_INDEX !== "{{.Task.Slot}}" ? process.env.NODE_INDEX : "X";
// Spawn the worker if WORKER is set to anything at all, App will spawn if false/undefined
const WORKER = process.env.WORKER || false
module.exports = {
    REDIS_HOSTNAME,
    REDIS_PORT,
    REDIS_URL,
    REDIS_CHANNEL,
    BULLMQ_QUEUE_NAME,
    PORT,
    NODE_INDEX,
    COUCHDB_URL,
    WORKER
}