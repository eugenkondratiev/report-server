module.exports = (res, _status, data) => {
    res.writeHead(_status, { "Content-Type": "application/json" })
    res.end(JSON.stringify(data))

}