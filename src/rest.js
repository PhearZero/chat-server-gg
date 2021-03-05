module.exports = App => App.get('/*', (res, req) => {
    console.log("GET from stupid fast API");

    res.writeStatus('200 OK').writeHeader('IsExample', 'Yes').end('Hello there!');
})