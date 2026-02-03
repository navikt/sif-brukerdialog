import { useState } from 'react';

export const usePagination = <T>(items: T[], itemsPerPage = 10) => {
    const [visibleItemsCount, setVisibleItemsCount] = useState<number>(Math.min(items.length, itemsPerPage));
    const visibleItems = visibleItemsCount ? items.slice(0, visibleItemsCount) : items;

    const showMoreItems = () => {
        setVisibleItemsCount(Math.min(visibleItemsCount + itemsPerPage, items.length));
    };

    const showAllItems = () => {
        setVisibleItemsCount(items.length);
    };

    const totalItemsCount = items.length;
    const hasMoreItems = visibleItemsCount < totalItemsCount;

    return {
        visibleItemsCount,
        totalItemsCount,
        visibleItems,
        hasMoreItems,
        showMoreItems,
        showAllItems,
    };
};
