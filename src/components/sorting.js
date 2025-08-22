import { sortMap } from "../lib/sort.js";

export function initSorting(columns) {
    return (query, state, action) => {
        let field = null;
        let order = null;

        if (action && action.name === 'sort') {
            field = action.dataset.field;
            const currentOrder = action.dataset.value;
            order = sortMap[currentOrder];
            action.dataset.value = order;

            columns.forEach(col => {
                if (col.dataset.field !== field) {
                    col.dataset.value = 'none';
                }
            });
        } else {
            columns.forEach(col => {
                if (col.dataset.value !== 'none') {
                    field = col.dataset.field;
                    order = col.dataset.value;
                }
            });
        }

        const sort = field && order !== 'none' ? `${field}:${order}` : null;
        return sort ? { ...query, sort } : { ...query };
    };
}