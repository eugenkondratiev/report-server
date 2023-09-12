const SQL_PARAMS = "SELECT * FROM eco.paramseco1";
const { dbQuery } = require('./db-local');



module.exports = async () => {
    const data = { fields: [] }
    try {
        const answer = await dbQuery(SQL_PARAMS)
        // console.log("answer  SQL_PARAMS = ", answer);
        answer.rows.forEach(([id, index, tag, eu, format, type, caption]) => {
            data[tag] = { index, eu, format, type, caption }
            data.fields.push(tag)
        });

        return data
    } catch (error) {
        console.log("get day data error", error);
        return error
    }
}