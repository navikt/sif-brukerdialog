import { Heading, Ingress, Modal } from '@navikt/ds-react';
import React, { FunctionComponent } from 'react';
import dayjs from 'dayjs';
import { ArbeidstidAktivitetEndring } from '../../../../types/ArbeidstidAktivitetEndring';
import { Arbeidsuke } from '../../../../types/K9Sak';
import { ArbeidAktivitet } from '../../../../types/Sak';
import ArbeidIPeriodeForm from '../arbeid-i-periode-form/ArbeidIPeriodeForm';
import { dateFormatter } from '@navikt/sif-common-utils/lib';
import { getArbeidAktivitetNavn } from '../../../../utils/arbeidAktivitetUtils';
import Block from '@navikt/sif-common-core-ds/lib/components/block/Block';
import DurationText from '../../../../components/duration-text/DurationText';

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
                        Endre arbeidstid
                    </Heading>

                    <Block margin="l">
                        <Heading size="large" level="2">
                            {getArbeidAktivitetNavn(arbeidAktivitet)}
                        </Heading>
                        <Block margin="m">
                            Uke {dayjs(arbeidsuke.periode.from).isoWeek()},{' '}
                            {dayjs(arbeidsuke.periode.from).isoWeekYear()}.
                            <span>
                                {dateFormatter.compact(arbeidsuke.periode.from)} -{' '}
                                {dateFormatter.compact(arbeidsuke.periode.to)}
                            </span>
                        </Block>

                        <Block margin="xl">
                            <Ingress>
                                Du har oppgitt at du normalt jobber{' '}
                                <DurationText duration={arbeidsuke.normalt} type="decimal" fullText={true} /> denne
                                uken.
                            </Ingress>
                        </Block>

                        <ArbeidIPeriodeForm
                            arbeidAktivitet={arbeidAktivitet}
                            arbeidsuke={arbeidsuke}
                            onCancel={onClose}
                            onSubmit={onSubmit}
                        />
                    </Block>
                </div>
            </Modal.Content>
        </Modal>
    );
};

export default ArbeidstidEnkeltukeModal;
