let createEmployeeRecord = function (array) {
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: [],
    };
}

function createEmployeeRecords(arrays) {
    return arrays.map((records) => createEmployeeRecord(records));
}

function createTimeInEvent(employeeRecord, dateStamp) {
    let [date, hour] = dateStamp.split(" ");

    employeeRecord.timeInEvents.push({
        type: "TimeIn",
        date: date,
        hour: ~~hour
    });

    return employeeRecord;
}

function createTimeOutEvent(employeeRecord, dateStamp) {
    let [date, hour] = dateStamp.split(" ");

    employeeRecord.timeOutEvents.push({
        type: "TimeOut",
        date: date,
        hour: parseInt(hour)
    });

    return employeeRecord;
}

function hoursWorkedOnDate(employeeRecord, date) {
    let timeIn = employeeRecord.timeInEvents.find((event) => event.date === date);
    let timeOut = employeeRecord.timeOutEvents.find((event) => event.date === date);
    return (timeOut.hour - timeIn.hour) / 100;
}

function wagesEarnedOnDate(employeeRecord, date) {
    return parseFloat((hoursWorkedOnDate(employeeRecord, date) * employeeRecord.payPerHour).toString());
}

function allWagesFor(employeeRecord) {
    return employeeRecord.timeInEvents.map((event) => event.date).reduce((memo, date) => memo + wagesEarnedOnDate(employeeRecord, date), 0);
}

function calculatePayroll(employeeRecord) {
    return employeeRecord.reduce((memo, record) => memo + allWagesFor(record), 0);
}