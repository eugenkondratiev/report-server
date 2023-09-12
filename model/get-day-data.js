
const { formDayStr, formHourRow } = require('./utils');
const { dbQuery } = require('./db-local');
const getParams = require('./get-params');

const { HOURS_TABLE } = require('../utils/constants')

const getDayReportSql = (day, month, year) => {
    const startDay = formDayStr(day, month, year);
    return `SELECT *  FROM ${HOURS_TABLE} where dt between '${startDay}' and DATE_ADD('${startDay}', INTERVAL 23 hour)`;
}

module.exports = async (_day, _month, _year) => {
    let data
    try {
        const answer = await dbQuery(getDayReportSql(_day, _month, _year))
        // console.log("answer.rows = ", answer.rows);
        // console.log("answer.fields = ", answer.fields);
        const params = await getParams()

        const data = {
            rows: answer.rows.map(row => formHourRow(row)),
            fields: answer.fields.map(field => field.name).filter(name => name !== 'id')

        }
        data.params = params
        // console.log("DATA", data);
        return data
    } catch (error) {
        console.log("get day data error", error);
        return error
    }
}