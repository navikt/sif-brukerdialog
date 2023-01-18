import { Heading, Modal } from '@navikt/ds-react';
import React, { FunctionComponent } from 'react';
import Block from '@navikt/sif-common-core-ds/lib/components/block/Block';
import { Arbeidsuke } from '../../types/K9Sak';
import { ArbeidAktivitet } from '../../types/Sak';
import { getArbeidAktivitetNavn } from '../../utils/arbeidAktivitetUtils';
import EndreArbeidstidForm, { EndreArbeidstidFormData } from '../endre-arbeidstid-form/EndreArbeidstidForm';
import './endreArbeidstidModal.css';

interface Props {
    arbeidAktivitet: ArbeidAktivitet;
    arbeidsuker: Arbeidsuke[];
    isVisible?: boolean;
    onClose: () => void;
    onSubmit: (endring: EndreArbeidstidFormData) => void;
}

const EndreArbeidstidModal: FunctionComponent<Props> = ({
    isVisible = false,
    onClose,
    onSubmit,
    arbeidsuker,
    arbeidAktivitet,
}) => {
    return (
        <Modal open={isVisible} onClose={onClose} className="endreArbeidstidModal">
            <Modal.Content>
                <div style={{ marginTop: 'var(--a-spacing-1)', paddingBottom: 'var(--a-spacing-2)' }}>
                    <Heading
                        spacing={true}
                        size="small"
                        level="1"
                        id="endreArbeidstidModalHeader"
                        className="endreArbeidstidModal__noFocusOutline">
                        {getArbeidAktivitetNavn(arbeidAktivitet)}
                    </Heading>
                    <Block margin="l">
                        <EndreArbeidstidForm arbeidsuker={arbeidsuker} onCancel={onClose} onSubmit={onSubmit} />
                    </Block>
                </div>
            </Modal.Content>
        </Modal>
    );
};

export default EndreArbeidstidModal;
