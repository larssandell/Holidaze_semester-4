import {
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Button,
} from '@mui/material';
import { Link } from 'react-router-dom';

const ProfileCards = ({ image, onDelete, onEdit, title, id }) => {
    console.log(id);
    return (
        <Card>
            <Link to={`/venues/${id}`}>
                <CardMedia
                    component='img'
                    height='140'
                    image={image}
                    alt='Card Image'
                />
            </Link>
            <CardContent sx={{ textAlign: 'center' }}>{title}</CardContent>
            <CardActions>
                <Button onClick={onDelete}>Delete</Button>
                <Button onClick={onEdit}>Edit</Button>
            </CardActions>
        </Card>
    );
};

export default ProfileCards;
