import { Button, VStack } from '@navikt/ds-react';
import { ReactNode, useEffect, useRef, useState } from 'react';

type ListRenderer<ItemType> = (props: {
    items: ItemType[];
    onEdit: (item: ItemType) => void;
    onDelete: (item: ItemType) => void;
}) => ReactNode;

type DialogRenderer<ItemType> = (props: {
    item?: ItemType;
    allItems?: ItemType[];
    isOpen: boolean;
    onSubmit: (item: ItemType) => void;
    onCancel: () => void;
}) => ReactNode;

interface Props<ItemType> {
    items?: ItemType[];
    getItemId: (item: ItemType) => string;
    addButtonLabel: ReactNode;
    addButtonId?: string;
    maxItems?: number;
    emptyState?: ReactNode;
    onChange: (items: ItemType[]) => void;
    listRenderer: ListRenderer<ItemType>;
    dialogRenderer: DialogRenderer<ItemType>;
}

type DialogState<ItemType> = {
    isOpen: boolean;
    selectedItem?: ItemType;
    ensureFocusOnAddButton?: boolean;
};

const oppdaterItems = <ItemType,>(
    items: ItemType[] | undefined,
    getItemId: (item: ItemType) => string,
    item: ItemType,
) => {
    if (!items) return [item];
    if (items.some((currentItem) => getItemId(currentItem) === getItemId(item))) {
        return items.map((currentItem) => (getItemId(currentItem) === getItemId(item) ? item : currentItem));
    }
    return [...items, item];
};

export function ModalFormAndList<ItemType>({
    items,
    getItemId,
    addButtonLabel,
    addButtonId,
    maxItems,
    emptyState,
    onChange,
    listRenderer,
    dialogRenderer,
}: Props<ItemType>) {
    const [dialogState, setDialogState] = useState<DialogState<ItemType>>({ isOpen: false });
    const addButtonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (dialogState.ensureFocusOnAddButton) {
            addButtonRef.current?.focus();
            setDialogState((currentState) => ({ ...currentState, ensureFocusOnAddButton: false }));
        }
    }, [dialogState.ensureFocusOnAddButton]);

    const canAddMoreItems = maxItems === undefined || (items?.length ?? 0) < maxItems;

    return (
        <VStack gap="space-16">
            {items &&
                items.length > 0 &&
                listRenderer({
                    items,
                    onEdit: (item) => setDialogState({ isOpen: true, selectedItem: item }),
                    onDelete: (item) =>
                        onChange(items.filter((currentItem) => getItemId(currentItem) !== getItemId(item))),
                })}
            {(!items || items.length === 0) && emptyState}
            {canAddMoreItems && (
                <div>
                    <Button
                        ref={addButtonRef}
                        id={addButtonId}
                        type="button"
                        variant="secondary"
                        size="small"
                        onClick={() => setDialogState({ isOpen: true })}>
                        {addButtonLabel}
                    </Button>
                </div>
            )}
            {dialogRenderer({
                item: dialogState.selectedItem,
                allItems: items,
                isOpen: dialogState.isOpen,
                onSubmit: (item) => {
                    const isNewItem = dialogState.selectedItem === undefined;
                    onChange(oppdaterItems(items, getItemId, item));
                    setDialogState({
                        isOpen: false,
                        ensureFocusOnAddButton: isNewItem,
                    });
                },
                onCancel: () => setDialogState({ isOpen: false }),
            })}
        </VStack>
    );
}
