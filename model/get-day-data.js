
const { formDayStr, formHourRow } = require('./utils');
const { dbQuery } = require('./db-local');

const getDayReportSql = (day, month, year) => {
    const startDay = formDayStr(day, month, year);
    return `SELECT *  FROM eco.hourseco1 where dt between '${startDay}' and DATE_ADD('${startDay}', INTERVAL 23 hour)`;
}

module.exports = async (_day, _month, _year) => {
    try {
        const answer = await dbQuery(getDayReportSql(_day, _month, _year))
        console.log("ANSWER = ", answer);
        const data = {
            rows: answer.rows.map(row => formHourRow(row)),
            fields: answer.fields.map(field => field.split('`')[0])
        }
        console.log("DATA", data);
        return data
    } catch (error) {
        return error
    }
}