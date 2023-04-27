import { useEffect, useState } from 'react';

function useFetch(url, method, headers, body) {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                const getResponse = await fetch(url, {
                    method: method,
                    headers: headers,
                    body: JSON.stringify(body),
                });
                // console.log(getResponse);
                const getData = await getResponse.json();
                // console.log(getData);
                setData(getData);
                setIsLoading(false);
            } catch (error) {
                console.log(error);
                setError(true);
                setIsLoading(false);
            }
        })();
    }, [url]);

    return { data, isLoading, error };
}

export default useFetch;
