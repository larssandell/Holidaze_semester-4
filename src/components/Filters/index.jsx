import React, { useState, useEffect } from 'react';
import {
    Grid,
    Card,
    CardMedia,
    CardContent,
    Typography,
    CardActions,
    Button,
    Box,
} from '@mui/material';
import { useGetAllVenuesQuery } from '../features/rtkSlices/apiSlice';
import noImage from '../../assets/noimagewhite.webp';
import { Link } from 'react-router-dom';

const Filters = () => {
    const [filteredVenues, setFilteredVenues] = useState([]);
    const [filterOptions, setFilterOptions] = useState({
        rating: 0,
        parking: false,
        breakfast: false,
        pets: false,
        wifi: false,
    });

    const { data, isLoading, error } = useGetAllVenuesQuery();

    useEffect(() => {
        if (data) {
            const filteredData = applyFilters(data, filterOptions);
            setFilteredVenues(filteredData);
        }
    }, [data, filterOptions]);

    const handleApplyFilter = (options) => {
        setFilterOptions(options);
    };

    const applyFilters = (data, options) => {
        return data.filter((venue) => {
            const meetsRating = venue.rating >= options.rating;
            const meetsParking =
                !options.parking || (options.parking && venue.meta.parking);
            const meetsBreakfast =
                !options.breakfast ||
                (options.breakfast && venue.meta.breakfast);
            const meetsPets =
                !options.pets || (options.pets && venue.meta.pets);
            const meetsWifi =
                !options.wifi || (options.wifi && venue.meta.wifi);

            return (
                meetsRating &&
                meetsParking &&
                meetsBreakfast &&
                meetsPets &&
                meetsWifi
            );
        });
    };

    return (
        <div>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <div>
                    Rating:
                    <input
                        type='range'
                        min='0'
                        max='5'
                        step='0.1'
                        value={filterOptions.rating}
                        onChange={(e) =>
                            setFilterOptions((prevOptions) => ({
                                ...prevOptions,
                                rating: parseFloat(e.target.value),
                            }))
                        }
                    />
                    <div>{filterOptions.rating}</div>
                </div>
                <div>
                    <label>
                        Parking:
                        <input
                            type='checkbox'
                            checked={filterOptions.parking}
                            onChange={(e) =>
                                setFilterOptions((prevOptions) => ({
                                    ...prevOptions,
                                    parking: e.target.checked,
                                }))
                            }
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Breakfast:
                        <input
                            type='checkbox'
                            checked={filterOptions.breakfast}
                            onChange={(e) =>
                                setFilterOptions((prevOptions) => ({
                                    ...prevOptions,
                                    breakfast: e.target.checked,
                                }))
                            }
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Pets:
                        <input
                            type='checkbox'
                            checked={filterOptions.pets}
                            onChange={(e) =>
                                setFilterOptions((prevOptions) => ({
                                    ...prevOptions,
                                    pets: e.target.checked,
                                }))
                            }
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Wifi:
                        <input
                            type='checkbox'
                            checked={filterOptions.wifi}
                            onChange={(e) =>
                                setFilterOptions((prevOptions) => ({
                                    ...prevOptions,
                                    wifi: e.target.checked,
                                }))
                            }
                        />
                    </label>
                </div>
            </Box>

            <Grid container spacing={2} sx={{ mt: 2, mb: 2 }}>
                {filteredVenues.map((venue) => (
                    <Grid key={venue.id} item xs={12} sm={6} md={4}>
                        <Card sx={{ height: '100%' }}>
                            <CardMedia
                                component={Link}
                                to={`/venues/${venue.id}`}
                                sx={{ height: '200px' }}
                                image={venue.media[0] || noImage}
                                alt={venue.name || 'No image'}
                                title={venue.name || 'No image'}
                            />
                            <CardContent>
                                <Typography variant='h5' component='div'>
                                    {venue.name}
                                </Typography>
                                <Typography variant='body2'>
                                    {venue.description}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button variant='outlined'>Hello</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default Filters;
