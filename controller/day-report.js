const response = require('../response');

module.exports = async ({ res, year, month, day }) => {
    const data = {}

    response(res, 200, {
        message: `report for ${day}/${month}/${year}`,
        data: data,
        year: year,
        month: month,
        day: day
    })

}