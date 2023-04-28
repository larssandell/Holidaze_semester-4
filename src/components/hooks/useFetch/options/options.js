export const API_BASE_URL = 'https://api.noroff.dev/api/v1';
export const getVenuesUrl = `${API_BASE_URL}/holidaze/venues`;
export const registerUrl = `${API_BASE_URL}/holidaze/auth/register`;
export const loginUrl = `${API_BASE_URL}/holidaze/auth/login`;

export const token = localStorage.getItem('accessToken');

export const headersAuth = {
    'content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${token}`,
};

export const headersInfo = {
    'content-Type': 'application/json',
    Accept: 'application/json',
};

export const postReqBody = async (body, url) => {
    // POST request using fetch with async/await
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    };
    try {
        const response = await fetch(url, requestOptions);
        const json = await response.json();
        return { response, json };
    } catch (error) {
        console.log(error);
    }
};
