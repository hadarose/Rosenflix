// Assist function that validates date
export function isValidDate(dateString) {

    // Date format: YYYY-MM-DD
    let datePattern = /^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;

    // Check if the date string format is a match
    let matchArray = dateString.match(datePattern);
    if (matchArray == null) {
        return false;
    }

    // Remove any non digit characters
    let cleanDateString = dateString.replace(/\D/g, '');

    // Parse integer values from date string
    let year = parseInt(cleanDateString.substr(0, 4));
    let month = parseInt(cleanDateString.substr(4, 2));
    let day = parseInt(cleanDateString.substr(6, 2));

    // Define number of days per month
    let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    // Adjust for leap years
    if (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)) {
        daysInMonth[1] = 29;
    }

    // check month and day range
    return (month < 1 || month > 12 || day < 1 || day > daysInMonth[month - 1]);
}

