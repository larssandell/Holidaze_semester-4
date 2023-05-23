import { useState } from 'react';
import { TextField } from '@mui/material';
import { useGetAllVenuesQuery } from '../features/rtkSlices/apiSlice';

const SearchBar = ({ onDataReceived }) => {
    const [searchText, setSearchText] = useState('');
    const { data } = useGetAllVenuesQuery();
    const [filteredData, setFilteredData] = useState([]);

    const handleSearchChange = (event) => {
        const searchValue = event.target.value;
        setSearchText(searchValue);

        if (searchValue.trim() === '') {
            onDataReceived([]);
            return;
        }

        const filteredData = data?.filter((item) => {
            const countryMatch = item.location.country
                .toLowerCase()
                .includes(searchValue.toLowerCase());
            const nameMatch = item.name
                .toLowerCase()
                .includes(searchValue.toLowerCase());
            return countryMatch || nameMatch;
        });

        onDataReceived(filteredData);
        setFilteredData(filteredData);
    };

    return (
        <div style={{ position: 'relative' }}>
            <TextField
                sx={{ display: 'flex', justifyContent: 'center', flex: 1 }}
                label='Search'
                value={searchText}
                onChange={handleSearchChange}
            />
            {/* <SearchResult filteredData={filteredData} /> */}
        </div>
    );
};

export default SearchBar;
