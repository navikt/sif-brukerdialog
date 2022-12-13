import { Accordion, BodyLong, Button, Heading } from '@navikt/ds-react';
import React, { useState } from 'react';
import Block from '@navikt/sif-common-core-ds/lib/components/block/Block';
import FormBlock from '@navikt/sif-common-core-ds/lib/components/form-block/FormBlock';
import { dateFormatter, dateToday } from '@navikt/sif-common-utils/lib';
import dayjs from 'dayjs';
import ArbeidstidUkeListe from '../../../components/arbeidstid-uke-liste/ArbeidstidUkeListe';
import { ArbeidsgiverType } from '../../../types/Arbeidsgiver';
import {
    ArbeidstidAktivitetEndring,
    ArbeidstidAktivitetEndringPeriodeMap,
} from '../../../types/ArbeidstidAktivitetEndring';
import { Arbeidsuke, ArbeidsukeMedEndring } from '../../../types/K9Sak';
import { ArbeidAktivitet, ArbeidAktivitetType } from '../../../types/Sak';
import ArbeidIPeriodeModal from './arbeid-i-periode-form/ArbeidIPeriodeModal';
import ArbeidstidEnkeltukeModal from './arbeidstid-enkeltuke/ArbeidstidEnkeltukeModal';

interface Props {
    arbeidAktivitet: ArbeidAktivitet;
    endringer: ArbeidstidAktivitetEndringPeriodeMap | undefined;
    kanEndrePeriode?: boolean;
    onArbeidsukeChange: (arbeidstidPeriodeEndring: ArbeidstidAktivitetEndring) => void;
}

const Arbeidsaktivitet: React.FunctionComponent<Props> = ({
    arbeidAktivitet,
    onArbeidsukeChange,
    endringer,
    kanEndrePeriode = false,
}) => {
    const [visArbeidIPeriodeModal, setVisArbeidIPeriodeModal] = useState(false);
    const [arbeidsukeForEndring, setArbeidsukeForEndring] = useState<Arbeidsuke | undefined>();
    const navn = getArbeidAktivitetNavn(arbeidAktivitet);
    const arbeidsuker: ArbeidsukeMedEndring[] = Object.keys(arbeidAktivitet.perioder.arbeidsuker).map((key) => ({
        ...arbeidAktivitet.perioder.arbeidsuker[key],
        endring: endringer ? endringer[key] : undefined,
    }));
    const startInneværendeUke = dayjs(dateToday).startOf('isoWeek').toDate();
    const ukerSomHarVært = arbeidsuker.filter((d) => dayjs(d.periode.to).isBefore(startInneværendeUke, 'day'));
    const ukerSomKommer = arbeidsuker.filter((d) => dayjs(d.periode.from).isSameOrAfter(startInneværendeUke, 'day'));

    return (
        <>
            <Heading level="2" size="medium" spacing={true}>
                {navn}
            </Heading>
            <ArbeidAktivitetInfo arbeidAktivitet={arbeidAktivitet} />

            {kanEndrePeriode && (
                <>
                    <Block margin="xl">
                        <Heading level="3" size="xsmall" spacing={true}>
                            Du kan endre arbeidstid på to måter:
                        </Heading>
                        <BodyLong as="div">
                            <ul>
                                <li>du kan endre enkeltuker direkte i listen, eller</li>
                                <li>du kan endre flere uker samtidig ved å følge knappen for dette</li>
                            </ul>
                        </BodyLong>
                    </Block>
                    <FormBlock>
                        <Button
                            style={{ alignSelf: 'flex-end' }}
                            variant="secondary"
                            type="button"
                            onClick={() => setVisArbeidIPeriodeModal(true)}>
                            Endre arbeidstid for flere uker
                        </Button>
                    </FormBlock>
                </>
            )}

            <FormBlock paddingBottom="l">
                <Heading
                    level="3"
                    size="medium"
                    spacing={false}
                    style={{ borderBottom: '2px solid var(--a-border-strong)', paddingBottom: '1rem' }}>
                    Arbeidsuker
                </Heading>
                {ukerSomHarVært.length > 0 && (
                    <Accordion>
                        <Accordion.Item defaultOpen={true}>
                            <Accordion.Header>Uker som har vært</Accordion.Header>
                            <Accordion.Content>
                                <ArbeidstidUkeListe
                                    arbeidsuker={ukerSomHarVært}
                                    onVelgUke={(uke) => {
                                        setArbeidsukeForEndring(uke);
                                    }}
                                />
                            </Accordion.Content>
                        </Accordion.Item>
                    </Accordion>
                )}
                {ukerSomKommer.length > 0 && (
                    <Accordion>
                        <Accordion.Item>
                            <Accordion.Header>Denne og kommende uker</Accordion.Header>
                            <Accordion.Content>
                                <ArbeidstidUkeListe
                                    arbeidsuker={ukerSomKommer}
                                    onVelgUke={(uke) => {
                                        setArbeidsukeForEndring(uke);
                                    }}
                                />
                            </Accordion.Content>
                        </Accordion.Item>
                    </Accordion>
                )}
            </FormBlock>

            <ArbeidIPeriodeModal
                arbeidAktivitet={arbeidAktivitet}
                isVisible={visArbeidIPeriodeModal}
                onClose={() => setVisArbeidIPeriodeModal(false)}
                onSubmit={(endring) => {
                    onArbeidsukeChange(endring);
                    setVisArbeidIPeriodeModal(false);
                }}
            />
            <ArbeidstidEnkeltukeModal
                arbeidAktivitet={arbeidAktivitet}
                isVisible={arbeidsukeForEndring !== undefined}
                arbeidsuke={arbeidsukeForEndring}
                onClose={() => setArbeidsukeForEndring(undefined)}
                onSubmit={(endring) => {
                    onArbeidsukeChange(endring);
                    setArbeidsukeForEndring(undefined);
                }}
            />
        </>
    );
};

export default Arbeidsaktivitet;

const getArbeidAktivitetNavn = (arbeidAktivitet: ArbeidAktivitet): string => {
    switch (arbeidAktivitet.type) {
        case ArbeidAktivitetType.arbeidstaker:
            return arbeidAktivitet.arbeidsgiver.navn;
        case ArbeidAktivitetType.frilanser:
            return 'Frilanser';
        case ArbeidAktivitetType.selvstendigNæringsdrivende:
            return 'Selvstendig næringsdrivende';
    }
};

const ArbeidAktivitetInfo = ({ arbeidAktivitet }: { arbeidAktivitet: ArbeidAktivitet }) => {
    if (arbeidAktivitet.type !== ArbeidAktivitetType.arbeidstaker) {
        return null;
    }
    const { type, id, ansattFom, ansattTom } = arbeidAktivitet.arbeidsgiver;
    return (
        <BodyLong>
            {type === ArbeidsgiverType.ORGANISASJON ? `Organisasjonsnummer: ${id}` : 'Privatperson'}
            <br />
            {ansattFom && <>Ansatt: {dateFormatter.full(ansattFom)}.</>}
            {ansattTom && <> Sluttdato: {dateFormatter.full(ansattTom)}</>}
        </BodyLong>
    );
};
