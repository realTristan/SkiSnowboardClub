export function isValidEventData(event: any) {
    if (event.title && event.title.length > 50) {
        return false;
    }

    if (event.description && event.description.length > 100) {
        return false;
    }

    if (event.price && event.price < 0) {
        return false;
    }

    return true;
}