import { Alert, Heading, Modal } from '@navikt/ds-react';
import React, { FunctionComponent } from 'react';
import Block from '@navikt/sif-common-core-ds/lib/components/block/Block';
import { dateFormatter } from '@navikt/sif-common-utils/lib';
import dayjs from 'dayjs';
import { ArbeidstidAktivitetUkeEndring } from '../../types/ArbeidstidAktivitetEndring';
import { Arbeidsuke } from '../../types/K9Sak';
import { ArbeidAktivitet } from '../../types/Sak';
import { getArbeidAktivitetNavn } from '../../utils/arbeidAktivitetUtils';
import ArbeidIPeriodeForm from '../arbeid-i-periode-form/ArbeidIPeriodeForm';
import './arbeidstidEnkeltukeModal.scss';
import FormBlock from '@navikt/sif-common-core-ds/lib/components/form-block/FormBlock';
import { erHelArbeidsuke, getDagerTekst } from '../../utils/arbeidsukeUtils';

interface Props {
    arbeidAktivitet: ArbeidAktivitet;
    arbeidsuke?: Arbeidsuke;
    isVisible?: boolean;
    onClose: () => void;
    onSubmit: (endring: ArbeidstidAktivitetUkeEndring) => void;
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
        <Modal open={isVisible} onClose={onClose} className="arbeidstidEnkeltukeModal">
            <Modal.Content>
                <div style={{ marginTop: 'var(--a-spacing-1)', paddingBottom: 'var(--a-spacing-2)' }}>
                    <Heading spacing={true} size="medium" level="1">
                        Endre arbeidstid
                    </Heading>

                    <Block margin="l">
                        <Heading size="large" level="2">
                            {getArbeidAktivitetNavn(arbeidAktivitet)}
                        </Heading>
                        <Block margin="m">
                            Uke {dayjs(arbeidsuke.periode.from).isoWeek()},{' '}
                            <span>
                                {dateFormatter.dayCompactDate(arbeidsuke.periode.from)} -{' '}
                                {dateFormatter.dayCompactDate(arbeidsuke.periode.to)}
                            </span>
                        </Block>
                        {erHelArbeidsuke(arbeidsuke) === false && (
                            <FormBlock>
                                <Alert variant="info" inline={true}>
                                    Ikke hel uke. Oppgi kun arbeidstid som gjelder {getDagerTekst(arbeidsuke.periode)}.
                                </Alert>
                            </FormBlock>
                        )}
                        <Block margin="l">
                            <ArbeidIPeriodeForm
                                arbeidAktivitet={arbeidAktivitet}
                                arbeidsuke={arbeidsuke}
                                onCancel={onClose}
                                onSubmit={onSubmit}
                            />
                        </Block>
                    </Block>
                </div>
            </Modal.Content>
        </Modal>
    );
};

export default ArbeidstidEnkeltukeModal;
