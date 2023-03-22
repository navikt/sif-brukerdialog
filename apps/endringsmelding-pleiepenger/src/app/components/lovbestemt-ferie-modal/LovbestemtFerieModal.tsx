import { Heading, Modal } from '@navikt/ds-react';
import React, { FunctionComponent } from 'react';
import Block from '@navikt/sif-common-core-ds/lib/components/block/Block';
import './lovbestemtFerieModal.css';

interface Props {
    title: string;
    open?: boolean;
    children: React.ReactNode;
    onClose: () => void;
}

const LovbestemtFerieModal: FunctionComponent<Props> = ({ children, title, open = false, onClose }) => {
    return (
        <Modal open={open} onClose={onClose} className="lovbestemtFerieModal">
            <Modal.Content>
                <div style={{ marginTop: 'var(--a-spacing-1)', paddingBottom: 'var(--a-spacing-2)' }}>
                    <Heading
                        spacing={true}
                        size="small"
                        level="1"
                        id="lovbestemtFerieModalHeader"
                        tabIndex={0}
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
