import { useState } from 'react';

interface ListItem {
    id: string;
}

interface Props<T> {
    items: Array<T & ListItem>;
    onEditItems?: (items: Array<T & ListItem>) => void;
}

interface ListState<T> {
    isSelectable: boolean;
    itemsAreSelectable: boolean;
    multipleSelectEnabled: boolean;
    selectAllIsIndeterminate: boolean;
    selectedItems: T[];
    showSelectItemsMessage: boolean;
    singleSelectEnabled: boolean;
}

export interface SelectableListType<T> {
    listState: ListState<T>;
    editItem: (item: T & ListItem) => void;
    editSelectedItems: () => void;
    isItemSelected: (item: T & ListItem) => boolean;
    onEditItems?: (items: Array<T & ListItem>) => void;
    setItemsAreSelectable: (selectable: boolean) => void;
    setItemSelected: (item: T & ListItem, selected: boolean) => void;
    setSelectedItems: (items: Array<T & ListItem>) => void;
    setShowSelectItemsMessage: (visible: boolean) => void;
    toggleItem: (item: T & ListItem) => void;
    resetList: () => void;
}

export const useSelectableList = <T>({ items, onEditItems }: Props<T>): SelectableListType<T> => {
    const [itemsAreSelectable, doSetItemsAreSelectable] = useState<boolean>(false);
    const [selectedItems, setSelectedItems] = useState<Array<T & ListItem>>([]);
    const [showSelectItemsMessage, setShowSelectItemsMessage] = useState(false);

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
        setShowSelectItemsMessage(false);
        if (selected) {
            setSelectedItems(selectedItems.filter((i) => i.id !== item.id));
        } else {
            setSelectedItems([...selectedItems, item]);
        }
    };

    const editSelectedItems = () => {
        if (!onEditItems) {
            return;
        }
        if (selectedItems.length === 0) {
            setShowSelectItemsMessage(true);
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

    const setItemsAreSelectable = (selectable: boolean) => {
        doSetItemsAreSelectable(selectable);
        setSelectedItems([]);
        setShowSelectItemsMessage(false);
    };

    const resetList = () => {
        setSelectedItems([]);
        setItemsAreSelectable(false);
        setShowSelectItemsMessage(false);
    };

    const isSelectable = onEditItems !== undefined;
    const selectAllIsIndeterminate = selectedItems.length > 0 && selectedItems.length !== items.length;
    const multipleSelectEnabled = isSelectable && items.length > 1;
    const singleSelectEnabled = onEditItems !== undefined && itemsAreSelectable !== true;

    return {
        listState: {
            isSelectable,
            selectedItems,
            itemsAreSelectable,
            selectAllIsIndeterminate,
            multipleSelectEnabled,
            singleSelectEnabled,
            showSelectItemsMessage,
        },
        onEditItems,
        setItemsAreSelectable,
        setSelectedItems,
        toggleItem,
        setItemSelected,
        isItemSelected,
        editItem,
        editSelectedItems,
        setShowSelectItemsMessage,
        resetList,
    };
};
