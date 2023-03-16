import { Heading, Modal } from '@navikt/ds-react';
import React, { FunctionComponent } from 'react';
import Block from '@navikt/sif-common-core-ds/lib/components/block/Block';
import { ArbeidAktivitet, Arbeidsuke } from '../../types/Sak';
import { LovbestemtFerieSøknadsdata } from '../../types/søknadsdata/LovbestemtFerieSøknadsdata';
import { getArbeidAktivitetNavn } from '../../utils/arbeidAktivitetUtils';
import EndreArbeidstidForm, { EndreArbeidstidData } from '../endre-arbeidstid-form/EndreArbeidstidForm';
import './endreArbeidstidModal.css';

interface Props {
    arbeidAktivitet: ArbeidAktivitet;
    lovbestemtFerie?: LovbestemtFerieSøknadsdata;
    arbeidsuker: Arbeidsuke[];
    isVisible?: boolean;
    onClose: () => void;
    onEndreArbeidstid: (endring: EndreArbeidstidData) => void;
}

const EndreArbeidstidModal: FunctionComponent<Props> = ({
    isVisible = false,
    onClose,
    onEndreArbeidstid,
    lovbestemtFerie,
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
                        tabIndex={0}
                        className="endreArbeidstidModal__noFocusOutline">
                        {getArbeidAktivitetNavn(arbeidAktivitet)}
                    </Heading>
                    <Block margin="l">
                        <EndreArbeidstidForm
                            arbeidsuker={arbeidsuker}
                            lovbestemtFerie={lovbestemtFerie}
                            onCancel={onClose}
                            onSubmit={onEndreArbeidstid}
                        />
                    </Block>
                </div>
            </Modal.Content>
        </Modal>
    );
};

export default EndreArbeidstidModal;
