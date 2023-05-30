import dayjs from 'dayjs';

/**
Checks if a given day should be disabled based on the current date and existing bookings.
@param {Object} day - The day to check. (Must be a dayjs object)
@param {Array} bookings - An array of booking objects.
@returns {boolean} - Returns true if the day should be disabled, otherwise false.
*/

export const disableDate = (day, bookings) => {
    if (day.isBefore(dayjs(), 'day')) {
        return true;
    }

    if (bookings) {
        return bookings.some((booking) => {
            const bookingStartDate = dayjs(booking.dateFrom);
            const bookingEndDate = dayjs(booking.dateTo);
            return day.isBetween(bookingStartDate, bookingEndDate, 'day', '[]');
        });
    }
};
