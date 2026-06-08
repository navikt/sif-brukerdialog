import { Box, Button, Fieldset, HStack, VStack } from '@navikt/ds-react';
import { ReactNode, useEffect, useRef, useState } from 'react';

type InfoRenderer<DataType> = (props: {
    data: DataType;
    onEdit: (data: DataType) => void;
    onDelete: (data: DataType) => void;
}) => ReactNode;

type DialogRenderer<DataType> = (props: {
    data?: DataType;
    isOpen: boolean;
    onSubmit: (data: DataType) => void;
    onCancel: () => void;
}) => ReactNode;

export interface ModalFormAndInfoLabels {
    infoTitle?: ReactNode;
    addLabel: ReactNode;
    editLabel: ReactNode;
    deleteLabel: ReactNode;
}

interface Props<DataType> {
    data?: DataType;
    labels: ModalFormAndInfoLabels;
    addButtonId?: string;
    error?: ReactNode | boolean;
    renderEditButtons?: boolean;
    renderDeleteButton?: boolean;
    wrapInfoInPanel?: boolean;
    wrapInfoInFieldset?: boolean;
    onChange: (data: DataType | undefined) => void;
    infoRenderer: InfoRenderer<DataType>;
    dialogRenderer: DialogRenderer<DataType>;
}

type DialogState<DataType> = {
    isOpen: boolean;
    selectedData?: DataType;
    ensureFocusOnAddButton?: boolean;
};

export function ModalFormAndInfo<DataType>({
    data,
    labels,
    addButtonId,
    error,
    renderEditButtons = false,
    renderDeleteButton = true,
    wrapInfoInPanel = true,
    wrapInfoInFieldset = true,
    onChange,
    infoRenderer,
    dialogRenderer,
}: Props<DataType>) {
    const [dialogState, setDialogState] = useState<DialogState<DataType>>({ isOpen: false });
    const addButtonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (dialogState.ensureFocusOnAddButton) {
            addButtonRef.current?.focus();
            setDialogState((currentState) => ({ ...currentState, ensureFocusOnAddButton: false }));
        }
    }, [dialogState.ensureFocusOnAddButton]);

    const content =
        data === undefined ? (
            <Button
                ref={addButtonRef}
                id={addButtonId}
                type="button"
                size="small"
                variant="secondary"
                onClick={() => setDialogState({ isOpen: true })}>
                {labels.addLabel}
            </Button>
        ) : (
            <VStack gap="space-16">
                {wrapInfoInPanel ? (
                    <Box
                        background="default"
                        borderColor="neutral-subtle"
                        borderWidth="1"
                        borderRadius="12"
                        padding="space-16">
                        {infoRenderer({
                            data,
                            onEdit: (currentData) => setDialogState({ isOpen: true, selectedData: currentData }),
                            onDelete: (currentData) => {
                                onChange(undefined);
                                setDialogState({
                                    isOpen: false,
                                    ensureFocusOnAddButton: true,
                                    selectedData: currentData,
                                });
                            },
                        })}
                    </Box>
                ) : (
                    infoRenderer({
                        data,
                        onEdit: (currentData) => setDialogState({ isOpen: true, selectedData: currentData }),
                        onDelete: (currentData) => {
                            onChange(undefined);
                            setDialogState({ isOpen: false, ensureFocusOnAddButton: true, selectedData: currentData });
                        },
                    })
                )}

                {renderEditButtons && (
                    <HStack gap="space-16">
                        <Button
                            type="button"
                            size="small"
                            variant="secondary"
                            onClick={() => setDialogState({ isOpen: true, selectedData: data })}>
                            {labels.editLabel}
                        </Button>
                        {renderDeleteButton && (
                            <Button
                                type="button"
                                size="small"
                                variant="secondary"
                                onClick={() => {
                                    onChange(undefined);
                                    setDialogState({ isOpen: false, ensureFocusOnAddButton: true, selectedData: data });
                                }}>
                                {labels.deleteLabel}
                            </Button>
                        )}
                    </HStack>
                )}
            </VStack>
        );

    return (
        <>
            {wrapInfoInFieldset && labels.infoTitle ? (
                <Fieldset legend={labels.infoTitle} error={typeof error === 'boolean' ? undefined : error}>
                    {content}
                </Fieldset>
            ) : (
                content
            )}
            {dialogRenderer({
                data: dialogState.selectedData,
                isOpen: dialogState.isOpen,
                onSubmit: (updatedData) => {
                    onChange(updatedData);
                    setDialogState({ isOpen: false });
                },
                onCancel: () => setDialogState({ isOpen: false }),
            })}
        </>
    );
}
