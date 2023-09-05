export const findImages = (text: string): string[] => {
    const regex = /<img[^>]*src="([^"]+)"/g;
    const matches = [];
    let match;
    while ((match = regex.exec(text)) !== null) {
        matches.push(match[1]);
    }
    return matches;
};
