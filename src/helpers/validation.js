export function notEmpty(val) {
    return val.trim().length > 0;
}

export function isEmpty(val) {
    return !notEmpty();
}

export function isValidEmail(val) {
    return !notEmpty() && val.includes('@');
}