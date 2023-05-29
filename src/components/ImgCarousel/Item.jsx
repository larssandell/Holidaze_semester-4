import { Paper, CardMedia } from '@mui/material';

function Item({ item, venue, noImage }) {
    return (
        <Paper>
            <CardMedia
                image={item}
                alt={venue.name}
                component='img'
                sx={{
                    height: '400px',
                    objectFit: 'cover',
                    objectPosition: 'center',
                }}
                onError={({ currentTarget }) => {
                    currentTarget.onerror = null;
                    currentTarget.src = noImage;
                }}
            />
        </Paper>
    );
}
export default Item;
