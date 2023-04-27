export const addErrorToField = (errors) =>
    errors ? { error: true } : { error: false };

console.log(addErrorToField);
