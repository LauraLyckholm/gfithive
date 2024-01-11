export const safelyParseJson = (jsonString) => {
    try {
        const parsed = JSON.parse(jsonString);
        if (Array.isArray(parsed)) {
            return parsed;
        }
        return [];
    } catch (e) {
        return [];
    }
}