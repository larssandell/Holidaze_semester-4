import Carousel from 'react-material-ui-carousel';
import noImage from '../../assets/noimage.webp';
import { CardMedia } from '@mui/material';

function ImgCarousel({ images, venue }) {
    if (images.length > 1) {
        return (
            <Carousel>
                {images.map((image, index) => (
                    <CardMedia
                        sx={{
                            objectFit: 'cover',
                            objectPosition: 'center',
                            width: '100%',
                            height: '100%',
                        }}
                        key={index}
                        image={image}
                        alt={`${venue.name}`}
                        component='img'
                    />
                ))}
            </Carousel>
        );
    }
    return (
        <CardMedia
            sx={{
                objectFit: 'contain',
                objectPosition: 'center',
                width: '100%',
                height: '100%',
            }}
            image={images[0] || noImage}
            alt='No image provided'
            component='img'
        />
    );
}

export default ImgCarousel;
