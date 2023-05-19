import { useState } from 'react';

interface ListItem {
    id: string;
}

interface Props<T> {
    items: Array<T & ListItem>;
}

export const useSelectableList = <T>({ items }: Props<T>) => {
    const [showSelectItems, setShowSelectItems] = useState<boolean>(false);
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    const isItemSelected = (item: ListItem): boolean => {
        return selectedItems.includes(item.id);
    };

    const toggleItem = (item: ListItem) => {
        const selected = isItemSelected(item);
        if (selected) {
            setSelectedItems(selectedItems.filter((i) => i !== item.id));
        } else {
            setSelectedItems([...selectedItems, item.id]);
        }
    };

    const setItemSelected = (item: ListItem, selected: boolean) => {
        if (selected) {
            setSelectedItems(selectedItems.filter((i) => i !== item.id));
        } else {
            setSelectedItems([...selectedItems, item.id]);
        }
    };

    const selectAllIsIndeterminate = selectedItems.length > 0 && selectedItems.length !== items.length;

    return {
        listState: {
            selectedItems,
            showSelectItems,
            selectAllIsIndeterminate,
        },
        setShowSelectItems,
        setSelectedItems,
        toggleItem,
        setItemSelected,
        isItemSelected,
    };
};
