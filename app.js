require('dotenv').config()
const PORT = process.env.PORT || 3001
console.log("PORT", PORT);

const http = require('http');
const { json } = require('stream/consumers');
const url = require('url');
const response = require('./response')
const monthHandler = require('./controller/month-report')
const dayHandler = require('./controller/day-report')
const periodHandler = require('./controller/period-report')

const server = http.createServer(async (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const query = parsedUrl.query;
    const path = parsedUrl.pathname;
    const method = req.method.toUpperCase();

    if (req.url === "/api" && method === "GET") {
        response(res, 200, { message: "MAIN ROUTE" })
    }
    else if (req.url === "/api/month" && method === "GET") {
        response(res, 200, { message: "TEST  /api/month " })
    }
    else if (path === "/api/period" && method === "GET") {
        const rsp = await periodHandler({ res, query })
        // response(res, 200, { message: "TEST  /api/period " })
    }
    else if (path.match(/\/api\/month\/[0-9]+\/[0-9]+/) && method === "GET") {
        const [, , , year = 2023, month = 9] = path.split('/')
        const rsp = await monthHandler(
            {
                res,
                year,
                month
            }
        )
    }
    else if (path.match(/\/api\/day\/[0-9]+\/[0-9]+\/[0-9]+/) && method === "GET") {
        const [, , , year, month, day] = path.split('/')
        const rsp = await dayHandler(
            {
                res,
                year,
                month,
                day
            }
        )
    }
    else {
        response(res, 400, { message: "Route not found" })
    }
})

server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);

})

