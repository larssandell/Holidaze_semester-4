import React from 'react';

// AccessToken

// Local Storage
export const setLoggedIn = localStorage.setItem('loggedIn', true);
// export const setName = localStorage.setItem('name', name);
// export const setVenueManager = localStorage.setItem(
//     'venueManager',
//     venueManager
// );
// export const setToken = localStorage.setItem('token', accessToken);

export const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
        return React.cloneElement(child, { handleClose });
    }
    return child;
});
