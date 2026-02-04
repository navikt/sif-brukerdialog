import { ExternalLinkIcon } from '@navikt/aksel-icons';
import { BodyLong, BodyShort, Box, ExpansionCard, Link, VStack } from '@navikt/ds-react';
import { dateFormatter } from '@navikt/sif-common-utils';
import { FormattedNumber } from 'react-intl';

import { Inntektsmelding } from '../../types';
import InfoBlock from '../info-block/InfoBlock';
import NaturalYtelserInfo from './parts/NaturalYtelserInfo';
import RefusjonInfo from './parts/RefusjonInfo';

interface Props {
    inntektsmelding: Inntektsmelding;
}

const ariaOrgnummer = (orgnummer: string) => orgnummer.split('').join(' ');

const InntektsmeldingDetaljer = ({ inntektsmelding }: Props) => {
    const { startDatoPermisjon, inntektBeløp, refusjon, endringerRefusjon, naturalYtelser, arbeidsgiver } =
        inntektsmelding;

    return (
        <VStack gap="space-16">
            <VStack gap="space-40">
                <BodyShort>
                    Arbeidsgiveren din har sendt oss disse opplysningene. Har du spørsmål eller mener noe er feil, må du
                    kontakte arbeidsgiver.
                </BodyShort>
            </VStack>
            <ExpansionCard aria-labelledby="beregnet-månedsinntekt">
                <ExpansionCard.Header>
                    <ExpansionCard.Title size="medium" as="div">
                        <span style={{ fontWeight: 'normal' }} id="beregnet-månedsinntekt">
                            Beregnet månedsinntekt:
                        </span>{' '}
                        <FormattedNumber
                            value={inntektBeløp}
                            style="currency"
                            currency="NOK"
                            maximumFractionDigits={2}
                            trailingZeroDisplay="stripIfInteger"
                        />
                    </ExpansionCard.Title>
                </ExpansionCard.Header>
                <ExpansionCard.Content>
                    <BodyLong spacing>
                        Beregnet månedsinntekt skal som regel være et gjennomsnitt av det du tjente de tre siste
                        månedene før din første dag med pleiepenger.
                    </BodyLong>
                    <BodyLong>
                        Vi bruker denne inntekten for å vurdere hvor mye du kan få utbetalt i pleiepenger.
                    </BodyLong>
                </ExpansionCard.Content>
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
            <InfoBlock
                icon="wallet"
                title="Hvordan utbetales pleiepengene?"
                titleInfo={
                    <>
                        Pleiepenger kan utbetales direkte til deg fra Nav, eller som vanlig lønn fra arbeidsgiver. Hvis
                        arbeidsgiver betaler deg lønn og får pengene tilbake fra Nav, kalles det forskuttering. Noen
                        arbeidsgivere kan være pliktig til å forskuttere på grunn av tariffavtaler, mens andre velger
                        det selv.
                    </>
                }>
                <RefusjonInfo
                    inntektBeløp={inntektBeløp}
                    refusjon={refusjon}
                    endringerRefusjon={endringerRefusjon}
                    startDatoPermisjon={startDatoPermisjon}
                />
            </InfoBlock>
            <InfoBlock
                icon="spark"
                title="Mister du naturalytelser (goder) under fraværet?"
                titleInfo={
                    <>
                        Naturalytelser er goder som ansatte får i tillegg til vanlig lønn. Dette kan for eksempel være
                        forsikringer, mobilabonnement, internett eller bruk av firmabil.
                    </>
                }>
                <NaturalYtelserInfo naturalYtelser={naturalYtelser} />
            </InfoBlock>

            <InfoBlock icon="building" title="Din arbeidsgiver" background="info-softA">
                {arbeidsgiver.organisasjon && (
                    <VStack gap="space-4">
                        <div>{arbeidsgiver.organisasjon.navn}</div>
                        <div>
                            Orgnr.{' '}
                            <span aria-label={ariaOrgnummer(arbeidsgiver.organisasjon.organisasjonsnummer)}>
                                {arbeidsgiver.organisasjon.organisasjonsnummer}
                            </span>
                        </div>
                    </VStack>
                )}
                {arbeidsgiver.privat && (
                    <VStack gap="space-4">
                        <div>{arbeidsgiver.privat.navn}</div>
                    </VStack>
                )}
            </InfoBlock>
            <Box marginBlock="space-8 space-0">
                <Link href="#" target="_blank" rel="noopener noreferrer">
                    Se hele inntektsmeldingen i dokumentarkivet <ExternalLinkIcon role="presentation" />
                </Link>
            </Box>
        </VStack>
    );
};

export default InntektsmeldingDetaljer;
