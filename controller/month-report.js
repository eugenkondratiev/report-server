const response = require('../response');

module.exports = async ({ res, year, month }) => {
    const data = {}

    response(res, 200, {
        message: `report for ${month}/${year}`,
        data: data,
        year: year,
        month: month
    })

}