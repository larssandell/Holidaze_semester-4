import { useState, useEffect } from 'react';

function useFetch(url) {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [responseOk, setResponseOk] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const response = await fetch(url);
                setResponseOk(response);
                console.log(response);
                const json = await response.json();
                setData(json);
                console.log(json);
                setIsLoading(false);
            } catch (err) {
                console.log(err);
                setIsError(true);
                setIsLoading(false);
            }
        })();
    }, [url]);

    return { data, isLoading, isError, responseOk };
}

export default useFetch;
