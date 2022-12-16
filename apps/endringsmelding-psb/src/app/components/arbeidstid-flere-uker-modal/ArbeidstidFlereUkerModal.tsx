import { Heading, Modal } from '@navikt/ds-react';
import React, { FunctionComponent } from 'react';
import Block from '@navikt/sif-common-core-ds/lib/components/block/Block';
import { ArbeidstidAktivitetUkeEndring } from '../../types/ArbeidstidAktivitetEndring';
import { Arbeidsuke } from '../../types/K9Sak';
import { ArbeidAktivitet } from '../../types/Sak';
import { getArbeidAktivitetNavn } from '../../utils/arbeidAktivitetUtils';
import './arbeidstidFlereUkerModal.css';

interface Props {
    arbeidAktivitet: ArbeidAktivitet;
    arbeidsuker?: Arbeidsuke[];
    isVisible?: boolean;
    onClose: () => void;
    onSubmit: (endring: ArbeidstidAktivitetUkeEndring[]) => void;
}

const ArbeidstidFlereUkerModal: FunctionComponent<Props> = ({
    isVisible = false,
    onClose,
    arbeidsuker,
    arbeidAktivitet,
}) => {
    if (arbeidsuker === undefined) {
        return null;
    }
    return (
        <Modal open={isVisible} onClose={onClose} className="arbeidstidFlereUkerModal">
            <Modal.Content>
                <div style={{ marginTop: 'var(--a-spacing-1)', paddingBottom: 'var(--a-spacing-2)' }}>
                    <Heading spacing={true} size="medium" level="1">
                        Endre arbeidstid
                    </Heading>

                    <Block margin="l">
                        <Heading size="large" level="2">
                            {getArbeidAktivitetNavn(arbeidAktivitet)}
                        </Heading>
                    </Block>
                </div>
            </Modal.Content>
        </Modal>
    );
};

export default ArbeidstidFlereUkerModal;
