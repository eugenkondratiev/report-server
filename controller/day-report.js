const response = require('../response');

module.exports = async ({ res, year, month, day }) => {
    const data = {}
    console.log("dat-report-start", day, month, year);
    const answer = await require('../model/get-day-data')(day, month, year);

    response(res, 200, {
        message: `report for ${day}/${month}/${year}`,
        data: data,
        year: year,
        month: month,
        day: day
    })

}