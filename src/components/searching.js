export function initSearching(searchField) {
    return (query, state) => {
        const value = state[searchField];

        return value
            ? { ...query, search: value.trim() }
            : query;
    };
}