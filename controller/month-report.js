const getDayHours = require('../model/get-day-hours');
const getParams = require('../model/get-params');
const getHourData = require('../model/get-hour-data')
const {HOURS_TABLE}= require('../utils/constants')

const response = require('../response');

const getDaySql = (hourString, params) => {
    const paramsList = params.fields.map((param) => {
        return params[param].type === 3
            ? `MIN(${param})`
            : params[param].type === 2
                ? `MAX(${param})`
                : params[param].type === 1 ? `SUM(${param})` : `AVG(${param})`
    })
    return `SELECT dt, ${paramsList.join(", ")} FROM ${HOURS_TABLE} where dt between '${hourString}' and DATE_ADD('${hourString}', INTERVAL 23 hour);`
}

module.exports = async ({ res, year, month }) => {
    let data = { rows: [] }
    console.log("month-report-start", month, year);
    const dayHours = await getDayHours(month, year)
    // console.log("DAY HOURS ", dayHours);
    const params = await getParams()
    // console.log("SQL_PARAMS OBJECT", params);
    data.params = params
    // console.log("FIRST HOUR SQL ", getDaySql(dayHours[0], params));
    // console.log("DAY HOURS ", dayHours[0], dayHours[1], dayHours);

    for (const hour of dayHours) {
        try {
            console.log("CURRENT datHour string", hour);
            const hourData = await getHourData(hour)
            data.rows.push(hourData)
        } catch (error) {

        }

    }

    console.log("MONTH DATA - ", data);
    response(res, 200, {
        message: `report for ${month}/${year}`,
        data: data,
        year: year,
        month: month
    })

}