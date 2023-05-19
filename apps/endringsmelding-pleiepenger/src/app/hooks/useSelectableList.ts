import { useState } from 'react';

interface ListItem {
    id: string;
}

interface Props<T> {
    items: Array<T & ListItem>;
    onEditItems?: (items: Array<T & ListItem>) => void;
}

export const useSelectableList = <T>({ items, onEditItems }: Props<T>) => {
    const [showSelectItems, setShowSelectItems] = useState<boolean>(false);
    const [selectedItems, setSelectedItems] = useState<Array<T & ListItem>>([]);

    const isItemSelected = (item: T & ListItem): boolean => {
        return selectedItems.some((i) => i.id === item.id);
    };

    const toggleItem = (item: T & ListItem) => {
        const selected = isItemSelected(item);
        if (selected) {
            setSelectedItems(selectedItems.filter((i) => i.id !== item.id));
        } else {
            setSelectedItems([...selectedItems, item]);
        }
    };

    const setItemSelected = (item: T & ListItem, selected: boolean) => {
        if (selected) {
            setSelectedItems(selectedItems.filter((i) => i.id !== item.id));
        } else {
            setSelectedItems([...selectedItems, item]);
        }
    };

    const editSelectedItems = () => {
        if (!onEditItems || selectedItems.length === 0) {
            return;
        }
        onEditItems(selectedItems);
    };

    const editItem = (item: T & ListItem) => {
        if (!onEditItems) {
            return;
        }
        onEditItems([item]);
    };

    const selectAllIsIndeterminate = selectedItems.length > 0 && selectedItems.length !== items.length;
    const multipleSelectEnabled = onEditItems !== undefined && items.length > 1;
    const singleSelectEnabled = onEditItems !== undefined && showSelectItems !== true;

    return {
        listState: {
            isSelectable: onEditItems !== undefined,
            selectedItems,
            showSelectItems,
            selectAllIsIndeterminate,
            multipleSelectEnabled,
            singleSelectEnabled,
        },
        onChangeItems: onEditItems,
        setShowSelectItems,
        setSelectedItems,
        toggleItem,
        setItemSelected,
        isItemSelected,
        editItem,
        editSelectedItems,
    };
};
