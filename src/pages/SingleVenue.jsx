import { useParams } from 'react-router-dom';
import SingleVenueCard from '../components/elements/SingleVenueCard/';

function SingleVenue() {
    const { id } = useParams();

    return <SingleVenueCard id={id} />;
}

export default SingleVenue;
