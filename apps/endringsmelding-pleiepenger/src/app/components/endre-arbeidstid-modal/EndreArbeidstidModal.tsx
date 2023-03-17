import { Heading, Modal } from '@navikt/ds-react';
import React, { FunctionComponent } from 'react';
import Block from '@navikt/sif-common-core-ds/lib/components/block/Block';
import './endreArbeidstidModal.css';

interface Props {
    title: string;
    isVisible?: boolean;
    children: React.ReactNode;
    onClose: () => void;
}

const EndreArbeidstidModal: FunctionComponent<Props> = ({ children, title, isVisible = false, onClose }) => {
    return (
        <Modal open={isVisible} onClose={onClose} className="endreArbeidstidModal">
            <Modal.Content>
                <div style={{ marginTop: 'var(--a-spacing-1)', paddingBottom: 'var(--a-spacing-2)' }}>
                    <Heading
                        spacing={true}
                        size="small"
                        level="1"
                        id="endreArbeidstidModalHeader"
                        tabIndex={0}
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
