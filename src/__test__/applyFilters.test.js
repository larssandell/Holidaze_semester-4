import { render, screen } from '@testing-library/react';
import { applyFilters } from '../components/SearchBar/helpers';

test('applyFilters should return filtered data based on provided options', () => {
    // Test data
    const data = [
        {
            name: 'Venue 1',
            rating: 4,
            meta: { parking: true, breakfast: true, pets: true, wifi: true },
        },
        {
            name: 'Venue 2',
            rating: 3,
            meta: { parking: true, breakfast: false, pets: true, wifi: true },
        },
        {
            name: 'Venue 3',
            rating: 5,
            meta: { parking: false, breakfast: true, pets: true, wifi: false },
        },
    ];

    // Test options
    const options = {
        rating: 4,
        parking: true,
        breakfast: true,
        pets: true,
        wifi: true,
    };

    const searchTerm = 'venue';

    const filteredData = applyFilters(data, searchTerm, options);

    console.log(filteredData);

    expect(filteredData).toHaveLength(1);
    expect(filteredData[0].name).toBe('Venue 1');
});
