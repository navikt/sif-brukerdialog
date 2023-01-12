import { Heading, Modal } from '@navikt/ds-react';
import React, { FunctionComponent } from 'react';
import Block from '@navikt/sif-common-core-ds/lib/components/block/Block';
import { ArbeidstidAktivitetEndring } from '../../types/ArbeidstidAktivitetEndring';
import { Arbeidsuke } from '../../types/K9Sak';
import { ArbeidAktivitet } from '../../types/Sak';
import { getArbeidAktivitetNavn } from '../../utils/arbeidAktivitetUtils';
import EndreArbeidstidForm from '../endre-arbeidstid-form/EndreArbeidstidForm';
import './endreArbeidstidModal.css';

interface Props {
    arbeidAktivitet: ArbeidAktivitet;
    arbeidsuker: Arbeidsuke[];
    isVisible?: boolean;
    onClose: () => void;
    onSubmit: (endring: ArbeidstidAktivitetEndring) => void;
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
                    <Heading spacing={true} size="small" level="1">
                        {getArbeidAktivitetNavn(arbeidAktivitet)}
                    </Heading>
                    <Block margin="l">
                        <Heading size="large" level="1">
                            {arbeidsuker.length === 1 ? 'Endre arbeidstid' : 'Endre arbeidstid for flere uker'}
                        </Heading>
                    </Block>
                    <Block margin="l">
                        <EndreArbeidstidForm
                            arbeidAktivitet={arbeidAktivitet}
                            arbeidsuker={arbeidsuker}
                            onCancel={onClose}
                            onSubmit={onSubmit}
                        />
                    </Block>
                </div>
            </Modal.Content>
        </Modal>
    );
};

export default EndreArbeidstidModal;
