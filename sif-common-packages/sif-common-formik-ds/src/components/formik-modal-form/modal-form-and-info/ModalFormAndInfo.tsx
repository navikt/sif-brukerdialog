import { Button, Modal, ModalProps, Panel } from '@navikt/ds-react';
import React from 'react';
import bemUtils from '../../../utils/bemUtils';
import SkjemagruppeQuestion from '../../helpers/skjemagruppe-question/SkjemagruppeQuestion';
import { FormikModalFormWidths, ModalFormAndInfoLabels } from '../types';
import './modalFormAndInfo.scss';

type ModalFormRenderer<DataType> = (props: {
    data?: DataType;
    onSubmit: (data: DataType) => void;
    onCancel: () => void;
}) => React.ReactNode;

type InfoRenderer<DataType> = (props: {
    data: DataType;
    onEdit: (data: DataType) => void;
    onDelete: (data: DataType) => void;
}) => React.ReactNode;

export interface ModalFormAndInfoProps<DataType> extends Pick<ModalProps, 'shouldCloseOnOverlayClick'> {
    labels: ModalFormAndInfoLabels;
    infoRenderer: InfoRenderer<DataType>;
    formRenderer: ModalFormRenderer<DataType>;
    wrapInfoInFieldset?: boolean;
    renderEditButtons?: boolean;
    renderDeleteButton?: boolean;
    dialogWidth?: FormikModalFormWidths;
    dialogClassName?: string;
    wrapInfoInPanel?: boolean;
}
interface PrivateProps<DataType> {
    onDelete: () => void;
    onChange: (data: DataType) => void;
    data?: DataType;
    error?: React.ReactNode | boolean;
}

type Props<DataType> = ModalFormAndInfoProps<DataType> &
    PrivateProps<DataType> &
    Pick<ModalProps, 'shouldCloseOnOverlayClick'>;

const bem = bemUtils('formikModalForm').child('modal');

function ModalFormAndInfo<DataType>({
    data,
    labels,
    error,
    dialogWidth,
    renderEditButtons = false,
    renderDeleteButton = true,
    dialogClassName,
    wrapInfoInPanel = true,
    shouldCloseOnOverlayClick = false,
    wrapInfoInFieldset = true,
    infoRenderer,
    formRenderer,
    onDelete,
    onChange,
}: Props<DataType>) {
    const [modalState, setModalState] = React.useState<{ isVisible: boolean; data?: DataType }>({
        isVisible: false,
    });

    const handleOnSubmit = (values: DataType) => {
        onChange(values);
        setModalState({ isVisible: false });
    };

    const handleEdit = (data: DataType) => {
        setModalState({ isVisible: true, data });
    };

    const handleDelete = () => {
        onDelete();
    };

    const resetModal = () => {
        setModalState({ isVisible: false, data: undefined });
    };

    const content =
        data === undefined ? (
            <Button
                type="button"
                onClick={() => setModalState({ isVisible: true, data })}
                size="small"
                variant="secondary">
                {labels.addLabel}
            </Button>
        ) : (
            <>
                <div className="modalFormAndInfo__infoWrapper">
                    {wrapInfoInPanel ? (
                        <Panel border={true} className={'modalFormAndInfo__infoWrapper__panel'}>
                            {infoRenderer({ data, onEdit: handleEdit, onDelete: handleDelete })}
                        </Panel>
                    ) : (
                        infoRenderer({ data, onEdit: handleEdit, onDelete: handleDelete })
                    )}
                </div>
                {renderEditButtons && (
                    <div className={'modalFormAndInfo__buttons'}>
                        <Button
                            type="button"
                            onClick={() => setModalState({ isVisible: true, data })}
                            size="small"
                            variant="secondary">
                            {data ? labels.editLabel : labels.addLabel}
                        </Button>
                        {renderDeleteButton && (
                            <Button type="button" onClick={onDelete} size="small" variant="secondary">
                                {labels.deleteLabel}
                            </Button>
                        )}
                    </div>
                )}
            </>
        );

    return (
        <>
            <Modal
                open={modalState.isVisible}
                shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
                className={bem.classNames(bem.block, bem.modifier(dialogWidth), dialogClassName)}
                onClose={resetModal}>
                {formRenderer({
                    onSubmit: handleOnSubmit,
                    onCancel: resetModal,
                    data: modalState.data,
                })}
            </Modal>
            {wrapInfoInFieldset === true ? (
                <SkjemagruppeQuestion error={error} legend={labels.infoTitle}>
                    {content}
                </SkjemagruppeQuestion>
            ) : (
                content
            )}
        </>
    );
}

export default ModalFormAndInfo;
