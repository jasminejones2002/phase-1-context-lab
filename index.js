function createEmployeeRecord(array) {
    const employeeRecord = {};

    employeeRecord.firstName = array[0],
    employeeRecord.familyName = array[1],
    employeeRecord.title = array[2],
    employeeRecord.payPerHour = array[3],
    
    employeeRecord.timeInEvents = [],
    employeeRecord.timeOutEvents = []

    return employeeRecord
}

function createEmployeeRecords(arrayOfArrays) {
    return arrayOfArrays.map((array) => createEmployeeRecord(array));
}
function createTimeInEvent(dateStamp) {
    const [date, time] = dateStamp.split(' ')

    const timeInRecord = {
        type: 'TimeIn',
        hour: parseInt(time),
        date: date
    }
    this.timeInEvents.push(timeInRecord)

    return this;
}

function createTimeOutEvent(dateStamp) {
    const [date, time] = dateStamp.split(' ')

    const timeOutRecord = {
        type: 'TimeOut',
        hour: parseInt(time),
        date: date
    }

    this.timeOutEvents.push(timeOutRecord)

    return this;
}

function hoursWorkedOnDate(date) {
    const timeInEvent = this.timeInEvents.find(event => event.date === date)
    const timeOutEvent = this.timeOutEvents.find(event => event.date === date)

    if (!timeInEvent || !timeOutEvent) {
        return 0;
    }

    const timeInHour = parseInt(timeInEvent.hour)
    const timeOutHour = parseInt(timeOutEvent.hour)

    const hoursWorked = parseInt(timeOutHour - timeInHour) / 100;

    return hoursWorked;
}

function wagesEarnedOnDate(date) {
    const payOwed = this.payPerHour * hoursWorkedOnDate.bind(this)(date)

    return payOwed;
}

function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(employee => employee.firstName === firstName);
}

function calculatePayroll(employeeRecords) {
    const sumOfPay = employeeRecords.reduce((sum, employee) => {
        const wages = allWagesFor.call(employee);
        return sum + wages
    }, 0)

    return sumOfPay;
}
/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

