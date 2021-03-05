// Generic failure with process exit
const fail = (err)=>{
    console.error(err)
    process.exit(1)
};

module.exports = {
    fail
}