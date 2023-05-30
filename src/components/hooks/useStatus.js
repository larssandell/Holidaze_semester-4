import { useState } from 'react';

function useStatus() {
    const [status, setStatus] = useState(false);
    const toggleStatus = () => setStatus((prevStatus) => !prevStatus);
    return { status, toggleStatus };
}

export default useStatus;
