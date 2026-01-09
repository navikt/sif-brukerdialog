import { BodyLong, BodyShort, ExpansionCard, HGrid, HStack, VStack } from '@navikt/ds-react';
import { dateFormatter } from '@navikt/sif-common-utils';
import { useState } from 'react';
import { FormattedNumber } from 'react-intl';

import { Inntektsmelding } from '../../types';
import InfoBlock from '../info-block/InfoBlock';
import { InntektsmeldingStatusTag } from '../inntektsmelding-status-tag/InntektsmeldingStatusTag';
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
            <VStack gap="10">
                <HStack gap="2" align="center">
                    <BodyShort weight="semibold" size="large">
                        Status:
                    </BodyShort>
                    <InntektsmeldingStatusTag status={inntektsmelding.status} size="medium" showIcon={true} />
                </HStack>

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
                    <ExpansionCard.Content>
                        <BodyLong spacing>
                            Beregnet månedsinntekt skal være et gjennomsnitt av det du tjente de tre siste månedene før
                            din første dag med pleiepenger.
                        </BodyLong>
                        <BodyLong>
                            Vi bruker denne inntekten for å finne ut hvor mye du kan få utbetalt i pleiepenger.
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

            <InfoBlock
                icon="wallet"
                title="Hvordan utbetales pleiepengene?"
                titleInfo={
                    <>
                        Pleiepenger kan enten utbetales direkte fra Nav, eller som vanlig lønn fra arbeidsgiver. Hvis
                        arbeidsgiver betaler deg lønn og får pengene tilbake fra Nav, kalles det forskuttering. Noen
                        arbeidsgivere må forskuttere på grunn av tariffavtaler, mens andre velger det selv.
                    </>
                }>
                <RefusjonInfo inntektBeløp={inntektBeløp} refusjon={refusjon} endringerRefusjon={endringerRefusjon} />
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
        </VStack>
    );
};

export default InntektsmeldingDetaljer;
