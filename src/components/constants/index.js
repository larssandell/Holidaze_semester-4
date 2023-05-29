// Local Storage
export const setLoggedIn = localStorage.setItem('loggedIn', true);

/**
 * Removes empty inputs from the form object and returns the updated form.
 * @param {object} form - The form object containing input values.
 * @returns {object} - The updated form object with empty inputs removed.
 */
export function removeEmptyInputsCreateVenue(form) {
    const { media, media2, media3, ...updatedForm } = form;

    if (media || media2 || media3) {
        updatedForm.media = [];
        if (media) updatedForm.media.push(media);
        if (media2) updatedForm.media.push(media2);
        if (media3) updatedForm.media.push(media3);
    }

    return updatedForm;
}

/**
Removes empty inputs from a form object and returns the updated form.
@param {Object} form - The form object.
@param {string} form.media - The media input.
@param {string} form.media2 - The second media input.
@param {string} form.media3 - The third media input.
@param {string} form.country - The country input.
@param {boolean} form.wifi - The wifi input.
@param {boolean} form.pets - The pets input.
@param {boolean} form.breakfast - The breakfast input.
@param {boolean} form.parking - The parking input.
@returns {Object} - The updated form object without empty inputs.
*/
export function removeEmptyInputs(form) {
    const {
        media,
        media2,
        media3,
        country,
        wifi,
        pets,
        breakfast,
        parking,
        ...updatedForm
    } = form;

    if (media || media2 || media3) {
        updatedForm.media = [];
        if (media) updatedForm.media.push(media);
        if (media2) updatedForm.media.push(media2);
        if (media3) updatedForm.media.push(media3);
    }

    if (updatedForm.meta) {
        updatedForm.meta = {
            ...updatedForm.meta,
            wifi,
            pets,
            breakfast,
            parking,
        };
    } else {
        updatedForm.meta = { wifi, pets, breakfast, parking };
    }

    if (updatedForm.location) {
        updatedForm.location.country = country;
    } else {
        updatedForm.location = { country };
    }

    return updatedForm;
}

export const pages = [
    { name: 'Home', url: '/' },
    { name: 'Venues', url: '/venues' },
];
