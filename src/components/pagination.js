import {getPages} from "../lib/utils.js";

export const initPagination = ({ pages, fromRow, toRow, totalRows }, createPage) => {
    const pageTemplate = pages.firstElementChild.cloneNode(true);
    pages.firstElementChild.remove();

    let pageCount = 1;

    const applyPagination = (query, state, action) => {
        const limit = parseInt(state.rowsPerPage) || 10;
        let page = parseInt(state.page) || 1;

        if (action) {
            switch (action.name) {
                case 'first':
                    page = 1;
                    break;
                case 'prev':
                    page = Math.max(1, page - 1);
                    break;
                case 'next':
                    page = page + 1;
                    break;
                case 'last':
                    page = pageCount;
                    break;
            }
        }

        return {
            ...query,
            limit: limit,
            page: page,
        };
    };

    const updatePagination = (total, { page, limit }) => {
        pageCount = Math.ceil(total / limit) || 1;

        const visiblePages = getPages(page, pageCount, 5);
        pages.replaceChildren(
            ...visiblePages.map(pageNumber => {
                const el = pageTemplate.cloneNode(true);
                return createPage(el, pageNumber, pageNumber === page);
            })
        );

        const from = (page - 1) * limit + 1;
        const to = Math.min(page * limit, total);

        fromRow.textContent = from > to ? 0 : from;
        toRow.textContent = to;
        totalRows.textContent = total;
    };

    return {
        applyPagination,
        updatePagination
    };
};