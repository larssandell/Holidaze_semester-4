import React, { useEffect } from 'react';
import { Grid } from '@mui/material';
import ProfileCards from '../ProfileCards';
import noImage from '../../../../assets/noimagewhite.webp';

export const TabGridBookings = ({ items, onDelete, onEdit, type, img }) => {
    return (
        <>
            {items.length === 0 ? (
                <p>{`No Current ${type}`}</p>
            ) : (
                <Grid container spacing={2} sx={{ my: 1, ml: 0 }}>
                    {items.map((item) => (
                        <Grid item key={item.id} xs={12} sm={6} md={4} lg={3}>
                            <ProfileCards
                                id={item.venue.id}
                                image={item.venue.media[0] || noImage}
                                onDelete={() => onDelete(item.id)}
                                onEdit={() => onEdit(item.id)}
                                title={item.venue.name}
                            />
                        </Grid>
                    ))}
                </Grid>
            )}
        </>
    );
};
export const TabGridVenues = ({ items, onDelete, onEdit, type }) => {
    return (
        <>
            {items.length === 0 ? (
                <p>{`No Current ${type}`}</p>
            ) : (
                <Grid container spacing={2} sx={{ my: 1, ml: 0 }}>
                    {items.map((item) => (
                        <Grid item key={item.id} xs={12} sm={6} md={4} lg={3}>
                            <ProfileCards
                                id={item.id}
                                image={item.media[0] || noImage}
                                onDelete={() => onDelete(item.id)}
                                onEdit={() => onEdit(item.id)}
                                title={item.name}
                            />
                        </Grid>
                    ))}
                </Grid>
            )}
        </>
    );
};
