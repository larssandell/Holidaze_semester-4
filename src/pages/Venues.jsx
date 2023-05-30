import { Container, useMediaQuery } from '@mui/material';
import { useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar';
import Cards from '../components/elements/Cards';
import { useGetAllVenuesSearchQuery } from '../components/features/rtkSlices/apiSlice';
import { applyFilters } from '../components/SearchBar/helpers';
import Loader from '../components/Loader';

const Venues = () => {
    const [filteredData, setFilteredData] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [filterOptions, setFilterOptions] = useState({
        rating: 0,
        parking: false,
        breakfast: false,
        pets: false,
        wifi: false,
    });

    const {
        data: allVenuesData,
        isLoading,
        isError,
    } = useGetAllVenuesSearchQuery();

    const handleDataReceived = (data) => {
        setFilteredData(data);
    };

    useEffect(() => {
        if (allVenuesData) {
            const filteredData = applyFilters(
                allVenuesData,
                searchText,
                filterOptions
            );
            handleDataReceived(filteredData);
        }
    }, [allVenuesData, searchText, filterOptions]);

    if (isLoading) {
        return <Loader />;
    }

    if (isError) {
        return <div>Error fetching data</div>;
    }

    return (
        <Container>
            <Container sx={{ position: 'relative', maxWidth: '700px' }}>
                <SearchBar
                    onDataReceived={handleDataReceived}
                    allVenuesData={allVenuesData}
                    setSearchText={setSearchText}
                    setFilterOptions={setFilterOptions}
                    searchText={searchText}
                    filterOptions={filterOptions}
                />
            </Container>
            <div>
                <Cards api={filteredData} />
            </div>
        </Container>
    );
};

export default Venues;
