const { COUCHDB_URL } = require('./config');
const PouchDB = require('pouchdb');

let db;
const createDB =() =>{
    db = db instanceof PouchDB ?
        db :
        new PouchDB(COUCHDB_URL);
    return db;
}


const handleStoreJob = async job => {
    console.log(`WORKER: Process Queue ${job.id}`);
    await createDB().post(job.data);
}
module.exports = {
    createDB,
    handleStoreJob
}