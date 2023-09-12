
const { formDayStr, formHourRow } = require('./utils');
const { dbQuery } = require('./db-local');
const {HOURS_TABLE} = require('../utils/constants')

// const getDayReportSql = (day, month, year) => {
//     const startDay = formDayStr(day, month, year);
//     return `SELECT *  FROM ${HOURS_TABLE} where dt between '${startDay}' and DATE_ADD('${startDay}', INTERVAL 23 hour)`;
// }
const getHourSql = (_hourString) => `SELECT * FROM ${HOURS_TABLE} WHERE dt= '${_hourString}'`

module.exports = async (_hourString) => {
    let data
    try {
        const answer = await dbQuery(getHourSql(_hourString))
        // console.log("answer.rows = ", answer.rows);
        // console.log("answer.fields = ", answer.fields);
        const data = formHourRow(answer.rows[0])

        // console.log("HOUR DATA ", _hourString, data);
        return data
    } catch (error) {
        console.log("get HOUR data error", error);
        return error
    }
}