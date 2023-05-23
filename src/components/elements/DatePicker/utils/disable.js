import dayjs from 'dayjs';

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
