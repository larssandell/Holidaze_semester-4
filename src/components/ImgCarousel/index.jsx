import Carousel from 'react-material-ui-carousel';
import noImage from '../../assets/noimage.webp';
import Item from '../ImgCarousel/Item';

function ImgCarousel({ images, venue }) {
    return (
        <Carousel animation='fade'>
            {images.map((item, i) => (
                <Item key={i} item={item} venue={venue} noImage={noImage} />
            ))}
        </Carousel>
    );
}

export default ImgCarousel;
