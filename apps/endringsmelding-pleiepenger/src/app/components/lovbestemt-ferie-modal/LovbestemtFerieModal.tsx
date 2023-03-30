import { Button, Heading, Modal } from '@navikt/ds-react';
import React, { FunctionComponent, useEffect } from 'react';
import Block from '@navikt/sif-common-core-ds/lib/components/block/Block';
import './lovbestemtFerieModal.css';
import { Close } from '@navikt/ds-icons';

interface Props {
    title: string;
    open?: boolean;
    children: React.ReactNode;
    onClose: () => void;
}

const LovbestemtFerieModal: FunctionComponent<Props> = ({ children, title, open = false, onClose }) => {
    useEffect(() => {
        Modal.setAppElement('#app');
    });
    return (
        <Modal open={open} onClose={onClose} className="lovbestemtFerieModal" closeButton={false}>
            <Button
                className="navds-modal__button"
                size="small"
                variant="tertiary"
                onClick={onClose}
                tabIndex={0}
                icon={<Close title="Lukk modalvindu" aria-label="Lukk modalvindu" />}
            />

            <Modal.Content>
                <div style={{ marginTop: 'var(--a-spacing-1)', paddingBottom: 'var(--a-spacing-2)' }}>
                    <Heading
                        spacing={true}
                        size="small"
                        level="1"
                        id="lovbestemtFerieModalHeader"
                        className="lovbestemtFerieModal__noFocusOutline">
                        {title}
                    </Heading>
                    <Block margin="l">{children}</Block>
                </div>
            </Modal.Content>
        </Modal>
    );
};

export default LovbestemtFerieModal;
