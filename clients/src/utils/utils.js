const yearRanges = () => {
    const yearRanges = Array.from({ length: 15 }, (_, i) => {
        const startYear = 2024 - i;
        return `${startYear}-${startYear + 1}`;
    });
    return yearRanges
}

module.exports = { yearRanges }