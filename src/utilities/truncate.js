function truncateToWordLength(str, numWords, ending = '...') {
    const words = str.trim().split(/\s+/);

        if (words.length <= numWords) {
            return str;
        }
    const truncatedWords = words.slice(0, numWords);
    return truncatedWords.join(' ') + ending;
}

export { truncateToWordLength }