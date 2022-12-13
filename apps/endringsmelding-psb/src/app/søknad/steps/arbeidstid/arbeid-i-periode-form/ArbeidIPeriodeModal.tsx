import { Heading, Modal } from '@navikt/ds-react';
import React, { FunctionComponent } from 'react';
import { ArbeidstidAktivitetEndring } from '../../../../types/ArbeidstidAktivitetEndring';
import { ArbeidAktivitet } from '../../../../types/Sak';
import './arbeidIPeriodeModal.scss';

interface Props {
    isVisible?: boolean;
    arbeidAktivitet: ArbeidAktivitet;
    onSubmit: (endring: ArbeidstidAktivitetEndring) => void;
    onClose: () => void;
}

const ArbeidIPeriodeModal: FunctionComponent<Props> = ({ arbeidAktivitet, isVisible = false, onClose, onSubmit }) => {
    return (
        <Modal open={isVisible} shouldCloseOnOverlayClick={false} className="arbeidIPeriodeModal" onClose={onClose}>
            <Modal.Content>
                <div style={{ marginTop: 'var(--a-spacing-1)', paddingBottom: 'var(--a-spacing-2)' }}>
                    <Heading spacing={true} size="medium" level="1">
                        Endre arbeidstid i perioden
                    </Heading>
                </div>
            </Modal.Content>
        </Modal>
    );
};

export default ArbeidIPeriodeModal;
