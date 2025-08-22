export function initFiltering() {
    const updateIndexes = (elements, indexes) => {
        Object.keys(indexes).forEach((elementName) => {
            const select = elements[elementName];
            if (!select) return;

            Object.values(indexes[elementName]).forEach(name => {
                const option = document.createElement('option');
                option.value = name;
                option.textContent = name;
                select.appendChild(option);
            });
        });
    };

const applyFiltering = (query, state, action) => {
    if (action && action.name === 'clear') {
        const field = action.dataset.field;
        const parent = action.parentElement;
        const input = parent.querySelector('input, select');

        if (input) {
            input.value = '';
        }
        if (state[field] !== undefined) {
            state[field] = '';
        }
        const { [`filter[${field}]`]: removed, ...newQuery } = query;
        const filter = {};
        Object.keys(state).forEach(key => {
            if (
                ['seller', 'customer', 'date', 'totalFrom', 'totalTo'].includes(key)
                && state[key]
            ) {
                filter[`filter[${key}]`] = state[key];
            }
        });

        return {
            ...newQuery,
            ...filter
        };
    }
    const filter = {};
    Object.keys(state).forEach(key => {
        if (
            ['seller', 'customer', 'date', 'totalFrom', 'totalTo'].includes(key)
            && state[key]
        ) {
            filter[`filter[${key}]`] = state[key];
        }
    });

    return Object.keys(filter).length
        ? { ...query, ...filter }
        : query;
};


    return {
        updateIndexes,
        applyFiltering
    };
}