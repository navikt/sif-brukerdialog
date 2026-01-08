import { BodyLong, BodyShort, ExpansionCard, Heading, VStack } from '@navikt/ds-react';
import { dateFormatter } from '@navikt/sif-common-utils';
import { FormattedNumber } from 'react-intl';

import { Inntektsmelding } from '../../types';
import InfoBlock from '../info-block/InfoBlock';
import NaturalYtelserInfo from './parts/NaturalYtelserInfo';
import RefusjonInfo from './parts/RefusjonInfo';

interface Props {
    inntektsmelding: Inntektsmelding;
}

const InntektsmeldingDetaljer = ({ inntektsmelding }: Props) => {
    const { startDatoPermisjon, inntektBeløp, refusjon, endringerRefusjon, naturalYtelser } = inntektsmelding;

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

            <Heading level="2" size="medium">
                JSON data
            </Heading>
            <BodyShort size="small" as="div">
                <pre>{JSON.stringify(inntektsmelding, null, 2)}</pre>
            </BodyShort>
        </VStack>
    );
};

export default InntektsmeldingDetaljer;
