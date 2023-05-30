import { useState, useEffect } from 'react';
import {
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    Grid,
    IconButton,
    Slider,
    TextField,
    Typography,
} from '@mui/material';
import TuneRoundedIcon from '@mui/icons-material/TuneRounded';
import { applyFilters } from './helpers';

const SearchBar = ({
    onDataReceived,
    allVenuesData,
    setSearchText,
    setFilterOptions,
    searchText,
    filterOptions,
}) => {
    const [showFilters, setShowFilters] = useState(false);

    const handleSearchChange = (event) => {
        setSearchText(event.target.value);
    };

    const handleChange = (name) => (event) => {
        setFilterOptions((prevOptions) => ({
            ...prevOptions,
            [name]: event.target.checked,
        }));
    };

    const handleResetFilters = () => {
        setFilterOptions({
            rating: 0,
            parking: false,
            breakfast: false,
            pets: false,
            wifi: false,
        });
        setSearchText('');
    };

    useEffect(() => {
        const filteredData = applyFilters(
            allVenuesData,
            searchText,
            filterOptions
        );
        onDataReceived(filteredData);
    }, [allVenuesData, searchText, filterOptions, onDataReceived]);

    return (
        <Box sx={{ marginBottom: 10, display: 'grid' }}>
            <Box>
                <Box
                    sx={{
                        width: '100%',
                        alignItems: 'center',
                        display: 'flex',
                    }}
                >
                    <TextField
                        label='Search'
                        value={searchText}
                        onChange={handleSearchChange}
                        sx={{ width: '100%' }}
                    />
                    <IconButton onClick={() => setShowFilters(!showFilters)}>
                        <TuneRoundedIcon />
                    </IconButton>
                </Box>
                <Box>
                    {showFilters && (
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                marginTop: '10px',
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    flexWrap: 'wrap',
                                }}
                            >
                                <Typography sx={{ mr: 2 }} gutterBottom>
                                    Rating:
                                </Typography>
                                <Slider
                                    sx={{ width: '180px' }}
                                    step={1}
                                    max={5}
                                    value={filterOptions.rating}
                                    onChange={(e, value) =>
                                        setFilterOptions((prevOptions) => ({
                                            ...prevOptions,
                                            rating: value,
                                        }))
                                    }
                                />
                                <Typography sx={{ ml: 2 }}>
                                    {filterOptions.rating}
                                </Typography>
                            </Box>
                            <Grid
                                container
                                sx={{ flexWrap: 'wrap', userSelect: 'none' }}
                            >
                                <Grid item>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={filterOptions.parking}
                                                onChange={handleChange(
                                                    'parking'
                                                )}
                                            />
                                        }
                                        label='Parking'
                                    />
                                </Grid>
                                <Grid item>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={filterOptions.pets}
                                                onChange={handleChange('pets')}
                                            />
                                        }
                                        label='Pets'
                                    />
                                </Grid>
                                <Grid item>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={
                                                    filterOptions.breakfast
                                                }
                                                onChange={handleChange(
                                                    'breakfast'
                                                )}
                                            />
                                        }
                                        label='Breakfast'
                                    />
                                </Grid>
                                <Grid item>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={filterOptions.wifi}
                                                onChange={handleChange('wifi')}
                                            />
                                        }
                                        label='Wifi'
                                    />
                                </Grid>
                            </Grid>
                            <Button onClick={handleResetFilters}>Reset</Button>
                        </Box>
                    )}
                </Box>
            </Box>
        </Box>
    );
};

export default SearchBar;
