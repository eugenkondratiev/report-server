const response = require('../response');

module.exports = async ({ res, query: periodObject }) => {

    const {
        startYear = 2023,
        startMonth = 9,
        startDay = 12,
        startHour = 10,
        endYear = 2023,
        endMonth = 9,
        endDay = 12,
        endHour = 11,
    } = periodObject;

    const data = {}

    response(res, 200, {
        message: `report from ${startHour} ${startDay}/${startMonth}/${startYear}\n
            to ${endHour} ${endDay}/${endMonth}/${endYear}`,
        data: data,
    })

}