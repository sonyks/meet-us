export function notEmpty(val) {
    return val.trim().length > 0;
}

export function isEmpty(val) {
    return !notEmpty();
}