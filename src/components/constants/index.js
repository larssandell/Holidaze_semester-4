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

/**
 *
 * @param {*} form
 * @returns
 */
// export function removeEmptyInputsCreateVenue(form) {
//     const updatedForm = Object.entries(form).reduce((acc, [key, value]) => {
//         if (typeof value === 'string' && value.trim() !== '') {
//             if (key.startsWith('media')) {
//                 if (!Array.isArray(acc.media)) {
//                     acc.media = [];
//                 }
//                 acc.media.push(value);
//             } else {
//                 acc[key] = value;
//             }
//         }
//         return acc;
//     }, {});

//     return updatedForm;
// }

export function removeEmptyInputsCreateVenue(form) {
    const updatedForm = Object.entries(form).reduce((acc, [key, value]) => {
        if (typeof value === 'string' && value.trim() !== '') {
            if (key.startsWith('media')) {
                if (!Array.isArray(acc.media)) {
                    acc.media = [];
                }
                acc.media.push(value);
            } else {
                acc[key] = value;
            }
        }
        return acc;
    }, {});

    const restOfForm = Object.entries(form).reduce((acc, [key, value]) => {
        if (!updatedForm.hasOwnProperty(key)) {
            acc[key] = value;
        }
        return acc;
    }, {});

    return { updatedForm, restOfForm };
}

export function validateAndConvertMedia(form) {
    const updatedForm = { ...form };

    if (
        typeof updatedForm.media === 'string' &&
        updatedForm.media.trim() !== ''
    ) {
        updatedForm.media = convertMedia(updatedForm.media);
    }

    return updatedForm;
}
