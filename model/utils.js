//==============================================================================
const monthString = (month) => {
    const monthNames = ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня",
        "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"
    ];
    return monthNames[month - 1];
}
//==============================================================================
const monthName = (month) => {
    const monthNames = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
        "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
    ];
    return monthNames[month - 1];
}//==============================================================================
const getMonthTitle = (reportMonth, reportYear) => {
    return `Oтчет за ${monthName(reportMonth || 9)} ${reportYear || 2023}`;
}
const getDayTitle = (reportDay, reportMonth, reportYear) => {
    return `Oтчет за ${reportDay || 8} ${monthString(reportMonth || 9)} ${reportYear || 2023}`;
}
//==========================================================================

const getDateTimeFromMySql = (dt) => {
    //return dt.toISOString().slice(0, 19).replace('T', ' ');
    return (new Date((new Date((new Date(new Date(dt))).toISOString())).getTime() - ((new Date()).getTimezoneOffset() * 60000))).toISOString().slice(0, 19).replace('T', ' ');
}
//==============================================================================
const getNiceMonth = (month) => {
    return month > 9 ? "" + month : "0" + month;
}
//==============================================================================
const getNiceday = (day) => {
    return day > 9 ? "" + day : "0" + day;
}
//========================================================================================
const formDayStr = (day = 20, month = 1, fullyear = 2019) => {
    console.log("formDayStr  ", day, month, fullyear, `${fullyear}-${getNiceMonth(month)}-${getNiceday(day)} 08:00:00`);
    return `${fullyear}-${getNiceMonth(month)}-${getNiceday(day)} 08:00:00`;
}
//========================================================================================
const arrFromObjectArrray = (objArr, prop = "dtm") => {
    let arr = objArr.map(e => getDateTimeFromMySql(e[prop]));
    return arr;
}
//==============================================================================
const formHourRow = (row) => {
    const hourRow = [];
    try {
        for (const prop in row) {
            if (row.hasOwnProperty(prop)) {
                if (prop !== "id") {
                    prop == "dt" ? hourRow.push(getDateTimeFromMySql(row[prop])) : hourRow.push(row[prop].toFixed(4));
                };
            }
        }
    } catch (error) {
        console.log(error.message);
    } finally {
        return hourRow;
    }

};
//==============================================================================

const dressUpDayRow = (result) => {
    let queryDays = [];
    try {
        const queryFields = Object.values(result[0]);

        queryFields.map((el, index) => {
            queryDays.push(el.toString().match(/[TZ]/) ? getDateTimeFromMySql(el).slice(0, 10) : parseFloat(el).toFixed(3));
        });
    } catch (error) {
        console.log(error.message);
    } finally {
        return queryDays;
    }

}

//==============================================================================
const formErrorResponse = (err) => {
    const answer = {};
    answer.tytle = getTitle();
    answer.eco = eco;
    answer.err = "" + err;
    return answer;
}

//==============================================================================
const arrToTableRow = (arr) => {
    let row = [];
    try {
        row = arr.map(record => {
            return "<tr>" + record.map(el => "<td>" + el + "</td>").join('') + "</tr>";
        });
    } catch (error) {
        console.log(error.message);
        //row = ["error", "data"];           
    } finally {
        return row.join('');
    }
}
//==============================================================================.
//================================================
const calcMonthData = (allData) => {
    const days = allData.length;
    //console.log(days);
    const sumRow = ["", 0, 0, 0, 0, 0, 0, 0, 0];
    allData.map(function (dayRow) {
        dayRow.forEach((e, i) => {
            if (i >= 1 && i < 3) {
                sumRow[i] += parseFloat(e);
            } else if (i === 0) {
            } else {
                sumRow[i] += (parseFloat(e) / days);
            };
        })
    });
    return sumRow.map((e, i) => i > 0 ? e.toFixed(3) : "Всего/\nсреднее");
}

//==============================================================================


module.exports = {
    formDayStr: formDayStr,
    arrFromObjectArrray: arrFromObjectArrray,
    getDateTimeFromMySql: getDateTimeFromMySql,
    formHourRow: formHourRow,

};