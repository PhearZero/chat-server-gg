const uWebSockets = require('uWebSockets.js')
const wss = require('./wss')
const rest = require('./rest');
// TODO: Fix Terrible composition
module.exports = rest(wss(uWebSockets.App({})))