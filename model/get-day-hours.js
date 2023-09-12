const { dbQuery } = require('./db-local');
const { getNiceMonth, getDateTimeFromMySql } = require('./utils')

const getDayReportSql = (day, month, year) => {
    const startDay = formDayStr(day, month, year);
    return `SELECT *  FROM eco.hourseco1 where dt between '${startDay}' and DATE_ADD('${startDay}', INTERVAL 23 hour)`;
}

const monthDatesSql = (month, year) => {
    const mm = getNiceMonth(month);
    return `select distinct DATE_ADD(DATE(dt), INTERVAL 8 hour) as dtm  from eco.hourseco1 where month(dt) ='${mm}' and year(dt) = '${year}' `;//order by dt asc` ; 
}

module.exports = async (_month, _year) => {
    let data
    try {
        const answer = await dbQuery(monthDatesSql(_month, _year))
        // console.log("answer  monthDatesSql = ", answer);
        const data = [...answer.rows.map(row => getDateTimeFromMySql(row[0]))]
        // console.log("DATA hours", data);
        return data
    } catch (error) {
        console.log("get day data error", error);
        return error
    }
}