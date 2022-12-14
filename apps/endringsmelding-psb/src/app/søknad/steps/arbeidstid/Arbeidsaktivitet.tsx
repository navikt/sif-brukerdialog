import { Accordion, BodyLong, Heading } from '@navikt/ds-react';
import React, { useState } from 'react';
import Block from '@navikt/sif-common-core-ds/lib/components/block/Block';
import FormBlock from '@navikt/sif-common-core-ds/lib/components/form-block/FormBlock';
import { dateFormatter, dateToday } from '@navikt/sif-common-utils/lib';
import dayjs from 'dayjs';
import ArbeidstidUkeListe from '../../../components/arbeidstid-uke-liste/ArbeidstidUkeListe';
import { ArbeidsgiverType } from '../../../types/Arbeidsgiver';
import {
    ArbeidstidAktivitetUkeEndring,
    ArbeidstidAktivitetUkeEndringMap,
} from '../../../types/ArbeidstidAktivitetEndring';
import { Arbeidsuke, ArbeidsukeMedEndring } from '../../../types/K9Sak';
import { ArbeidAktivitet, ArbeidAktivitetType } from '../../../types/Sak';
import ArbeidstidEnkeltukeModal from './arbeidstid-enkeltuke/ArbeidstidEnkeltukeModal';
import { getArbeidAktivitetNavn } from '../../../utils/arbeidAktivitetUtils';

interface Props {
    arbeidAktivitet: ArbeidAktivitet;
    endringer: ArbeidstidAktivitetUkeEndringMap | undefined;
    visSamletListe?: boolean;
    onArbeidsukeChange: (arbeidstidPeriodeEndring: ArbeidstidAktivitetUkeEndring) => void;
}

const Arbeidsaktivitet: React.FunctionComponent<Props> = ({
    arbeidAktivitet,
    endringer,
    visSamletListe = true,
    onArbeidsukeChange,
}) => {
    const [arbeidsukeForEndring, setArbeidsukeForEndring] = useState<Arbeidsuke | undefined>();
    const navn = getArbeidAktivitetNavn(arbeidAktivitet);
    const arbeidsuker: ArbeidsukeMedEndring[] = Object.keys(arbeidAktivitet.perioder.arbeidsuker).map((key) => ({
        ...arbeidAktivitet.perioder.arbeidsuker[key],
        endring: endringer ? endringer[key] : undefined,
    }));
    const startInneværendeUke = dayjs(dateToday).startOf('isoWeek').toDate();
    const ukerSomHarVært = arbeidsuker.filter((d) => dayjs(d.periode.to).isBefore(startInneværendeUke, 'day'));
    const ukerSomKommer = arbeidsuker
        .filter((d) => dayjs(d.periode.from).isSameOrAfter(startInneværendeUke, 'day'))
        .slice(0, 50);

    return (
        <>
            <Heading level="2" size="medium" spacing={true}>
                {navn}
            </Heading>
            <ArbeidAktivitetInfo arbeidAktivitet={arbeidAktivitet} />

            {visSamletListe && (
                <Block padBottom="l">
                    <ArbeidstidUkeListe
                        arbeidsuker={arbeidsuker}
                        visNormaltid={true}
                        onVelgUke={(uke) => {
                            setArbeidsukeForEndring(uke);
                        }}
                    />
                </Block>
            )}
            {!visSamletListe && (
                <>
                    <FormBlock paddingBottom="l">
                        {ukerSomHarVært.length > 0 && (
                            <Accordion style={{ borderTop: '2px solid var(--a-border-strong)' }}>
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
                </>
            )}

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
