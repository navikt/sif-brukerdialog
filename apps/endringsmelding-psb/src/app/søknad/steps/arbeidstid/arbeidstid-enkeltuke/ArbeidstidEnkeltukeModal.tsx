import { Heading, Modal } from '@navikt/ds-react';
import React, { FunctionComponent } from 'react';
import dayjs from 'dayjs';
import { ArbeidstidAktivitetEndring } from '../../../../types/ArbeidstidAktivitetEndring';
import { Arbeidsuke } from '../../../../types/K9Sak';
import { ArbeidAktivitet } from '../../../../types/Sak';
import ArbeidIPeriodeForm from '../arbeid-i-periode-form/ArbeidIPeriodeForm';

interface Props {
    arbeidAktivitet: ArbeidAktivitet;
    arbeidsuke?: Arbeidsuke;
    isVisible?: boolean;
    onClose: () => void;
    onSubmit: (endring: ArbeidstidAktivitetEndring) => void;
}

const ArbeidstidEnkeltukeModal: FunctionComponent<Props> = ({
    isVisible = false,
    onClose,
    onSubmit,
    arbeidsuke,
    arbeidAktivitet,
}) => {
    if (arbeidsuke === undefined) {
        return null;
    }
    return (
        <Modal open={isVisible} onClose={onClose} className="arbeidIPeriodeModal">
            <Modal.Content>
                <div style={{ marginTop: 'var(--a-spacing-1)', paddingBottom: 'var(--a-spacing-2)' }}>
                    <Heading spacing={true} size="medium" level="1">
                        Endre arbeidstid uke {dayjs(arbeidsuke.periode.from).isoWeek()}{' '}
                        {dayjs(arbeidsuke.periode.from).isoWeekYear()}
                    </Heading>

                    <ArbeidIPeriodeForm
                        arbeidAktivitet={arbeidAktivitet}
                        arbeidsstedNavn={'ASFD'}
                        arbeidsuke={arbeidsuke.periode}
                        onCancel={onClose}
                        onSubmit={onSubmit}
                    />
                </div>
            </Modal.Content>
        </Modal>
    );
};

export default ArbeidstidEnkeltukeModal;
