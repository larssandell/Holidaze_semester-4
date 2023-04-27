export const baseUrl = 'https://api.noroff.dev/api/v1';
export const getVenuesUrl = `${baseUrl}/holidaze/venues`;
export const registerUrl = `${baseUrl}/holidaze/auth/register`;
export const loginUrl = `${baseUrl}/holidaze/auth/login`;

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
