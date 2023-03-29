import { Button, Heading, Modal } from '@navikt/ds-react';
import React, { FunctionComponent, useEffect } from 'react';
import { Close } from '@navikt/ds-icons';
import Block from '@navikt/sif-common-core-ds/lib/components/block/Block';
import './endreArbeidstidModal.css';

interface Props {
    title: string;
    isVisible?: boolean;
    children: React.ReactNode;
    onClose: () => void;
}

const EndreArbeidstidModal: FunctionComponent<Props> = ({ children, title, isVisible = false, onClose }) => {
    useEffect(() => {
        Modal.setAppElement('#app');
    });
    return (
        <Modal
            open={isVisible}
            onClose={onClose}
            className="endreArbeidstidModal"
            aria-label="Endre arbeidstid dialog"
            closeButton={false}>
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
                        id="endreArbeidstidModalHeader"
                        className="endreArbeidstidModal__noFocusOutline">
                        {title}
                    </Heading>
                    <Block margin="l">{children}</Block>
                </div>
            </Modal.Content>
        </Modal>
    );
};

export default EndreArbeidstidModal;
