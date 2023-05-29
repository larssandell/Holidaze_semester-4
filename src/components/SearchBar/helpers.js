/**
Filters the given data based on the provided search term and options.
@param {Array} data - The data to be filtered.
@param {string} searchTerm - The search term to match against venue names.
@param {Object} options - The filtering options.
@param {number} options.rating - The minimum rating to meet.
@param {boolean} options.parking - The option for parking availability.
@param {boolean} options.breakfast - The option for breakfast availability.
@param {boolean} options.pets - The option for pets accommodation.
@param {boolean} options.wifi - The option for wifi availability.
@returns {Array} - The filtered data based on the search term and options.
*/

export const applyFilters = (data, searchTerm, options) => {
    if (!data) {
        return [];
    }

    return data.filter((venue) => {
        const matchesSearchTerm = venue.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
        const meetsRating = venue.rating >= options.rating;
        const meetsParking =
            !options.parking || (options.parking && venue.meta.parking);
        const meetsBreakfast =
            !options.breakfast || (options.breakfast && venue.meta.breakfast);
        const meetsPets = !options.pets || (options.pets && venue.meta.pets);
        const meetsWifi = !options.wifi || (options.wifi && venue.meta.wifi);

        return (
            matchesSearchTerm &&
            meetsRating &&
            meetsParking &&
            meetsBreakfast &&
            meetsPets &&
            meetsWifi
        );
    });
};
