import { BodyLong, BodyShort, ExpansionCard, HGrid, Switch, VStack } from '@navikt/ds-react';
import { dateFormatter } from '@navikt/sif-common-utils';
import { useState } from 'react';
import { FormattedNumber } from 'react-intl';

import { Inntektsmelding } from '../../types';
import InfoBlock from '../info-block/InfoBlock';
import NaturalYtelserInfo from './parts/NaturalYtelserInfo';
import RefusjonInfo from './parts/RefusjonInfo';

interface Props {
    inntektsmelding: Inntektsmelding;
}

const InntektsmeldingDetaljer = ({ inntektsmelding }: Props) => {
    const { startDatoPermisjon, inntektBeløp, refusjon, endringerRefusjon, naturalYtelser, arbeidsgiver } =
        inntektsmelding;

    const [visJson, setVisJson] = useState(false);

    return (
        <VStack gap="4">
            <BodyShort>
                Arbeidsgiveren din har sendt oss disse opplysningene. Har du spørsmål eller mener noe er feil, må du
                kontakte arbeidsgiver.
            </BodyShort>

            <ExpansionCard aria-label="sdf">
                <ExpansionCard.Header>
                    <ExpansionCard.Title size="medium">
                        <span style={{ fontWeight: 'normal' }}>Beregnet månedsinntekt:</span>{' '}
                        <FormattedNumber
                            value={inntektBeløp}
                            style="currency"
                            currency="NOK"
                            maximumFractionDigits={0}
                        />
                    </ExpansionCard.Title>
                    <ExpansionCard.Content>
                        <BodyLong spacing>
                            Beregnet månedsinntekt skal være er et gjennomsnitt av det du tjente de tre siste månedene
                            før din første dag med pleiepenger.
                        </BodyLong>
                        <BodyLong spacing>
                            Vi bruker denne inntekten for å finne ut hvor mye du kan få utbetalt i pleiepenger.
                        </BodyLong>
                        <BodyLong>
                            Nav dekker inntekten du har opptil{' '}
                            <span className="nowrap">
                                [TODO: kan vi vise dette - dette vil jo variere ut fra hvilken periode?]
                            </span>{' '}
                            kroner (seks ganger grunnbeløpet). Siden du tjener mer enn dette, vil Nav ikke dekke hele
                            inntekten din.
                        </BodyLong>
                    </ExpansionCard.Content>
                </ExpansionCard.Header>
            </ExpansionCard>

            <InfoBlock icon="calendar" title="Første fraværsdag med pleiepenger">
                {startDatoPermisjon ? (
                    <>
                        <span className="capitalize">{dateFormatter.day(startDatoPermisjon)}</span>{' '}
                        {dateFormatter.full(startDatoPermisjon)}
                    </>
                ) : (
                    'Ikke oppgitt'
                )}
            </InfoBlock>

            <InfoBlock icon="wallet" title="Hvordan utbetales pleiepengene?">
                <RefusjonInfo inntektBeløp={inntektBeløp} refusjon={refusjon} endringerRefusjon={endringerRefusjon} />
            </InfoBlock>

            <InfoBlock icon="spark" title="Mister du naturalytelser (goder) under fraværet?">
                <NaturalYtelserInfo naturalYtelser={naturalYtelser} />
            </InfoBlock>

            <HGrid columns={{ sm: 1, md: 2 }} gap="4">
                <InfoBlock icon="building" title="Din arbeidsgiver" background="info-softA">
                    {arbeidsgiver.organisasjon && (
                        <VStack gap="1">
                            <div>{arbeidsgiver.organisasjon.navn}</div>
                            <div>Orgnr. {arbeidsgiver.organisasjon.organisasjonsnummer}</div>
                        </VStack>
                    )}
                    {arbeidsgiver.privat && (
                        <VStack gap="1">
                            <div>{arbeidsgiver.privat.navn}</div>
                        </VStack>
                    )}
                </InfoBlock>
            </HGrid>
            <Switch checked={visJson} onChange={(evt) => setVisJson(evt.currentTarget.checked)}>
                Vis JSON
            </Switch>
            {visJson && (
                <InfoBlock icon="code" title="Inntektsmelding JSON" background="default">
                    <BodyShort size="small" as="div">
                        <pre>{JSON.stringify(inntektsmelding, null, 2)}</pre>
                    </BodyShort>
                </InfoBlock>
            )}
        </VStack>
    );
};

export default InntektsmeldingDetaljer;
