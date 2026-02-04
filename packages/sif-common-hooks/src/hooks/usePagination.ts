import { useEffect, useState } from 'react';

export const usePagination = <T>(items: T[], itemsPerPage = 10) => {
    const effectiveItemsPerPage = Math.max(1, itemsPerPage);
    const [visibleItemsCount, setVisibleItemsCount] = useState<number>(Math.min(items.length, effectiveItemsPerPage));

    useEffect(() => {
        setVisibleItemsCount(Math.min(items.length, effectiveItemsPerPage));
    }, [items.length, effectiveItemsPerPage]);

    const visibleItems = items.slice(0, visibleItemsCount);

    const showMoreItems = () => {
        setVisibleItemsCount((prev) => Math.min(prev + effectiveItemsPerPage, items.length));
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
