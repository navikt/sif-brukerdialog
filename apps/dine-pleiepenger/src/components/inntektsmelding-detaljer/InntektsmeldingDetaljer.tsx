import { BodyLong, BodyShort, ExpansionCard, FormSummary, Heading, List, VStack } from '@navikt/ds-react';
import { dateFormatter } from '@navikt/sif-common-utils';
import { FormattedNumber } from 'react-intl';

import { Inntektsmelding } from '../../types';
import InfoBlock from '../info-block/InfoBlock';
import NaturalYtelserInfo from './parts/NaturalYtelserInfo';

interface Props {
    inntektsmelding: Inntektsmelding;
}

const InntektsmeldingDetaljer = ({ inntektsmelding }: Props) => {
    const { startDatoPermisjon, inntektBeløp, refusjon, endringerRefusjon, naturalYtelser, refusjonOpphører } =
        inntektsmelding;
    const harEndringerIRefusjon = endringerRefusjon && endringerRefusjon.length > 0;
    const harRefusjonOpphører = refusjonOpphører !== undefined;
    const harRefusjon = refusjon !== undefined;

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
                            <span className="nowrap">[TODO: må få grunnpeløp for periode fra backend]</span> kroner
                            (seks ganger grunnbeløpet). Siden du tjener mer enn dette, vil Nav ikke dekke hele inntekten
                            din.
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
                {harRefusjon ? (
                    <>Du får pleiepengene utbetalt gjennom arbeidsgiveren din.</>
                ) : (
                    <>Du får pleiepengene utbetalt direkte fra Nav.</>
                )}
            </InfoBlock>

            <InfoBlock icon="spark" title="Mister du naturalytelser (goder) under fraværet?">
                <NaturalYtelserInfo naturalYtelser={naturalYtelser} />
            </InfoBlock>

            <FormSummary>
                <FormSummary.Header>
                    <FormSummary.Heading level="2">Første dag med pleiepenger</FormSummary.Heading>
                </FormSummary.Header>
                <FormSummary.Answers>
                    <FormSummary.Answer>
                        <FormSummary.Label>Første dag med pleiepenger</FormSummary.Label>
                        <FormSummary.Value>
                            {startDatoPermisjon ? (
                                <>
                                    <span className="capitalize">{dateFormatter.day(startDatoPermisjon)}</span>{' '}
                                    {dateFormatter.full(startDatoPermisjon)}
                                </>
                            ) : (
                                'Ikke oppgitt'
                            )}
                        </FormSummary.Value>
                    </FormSummary.Answer>
                </FormSummary.Answers>
            </FormSummary>
            <FormSummary>
                <FormSummary.Header>
                    <FormSummary.Heading level="2">Månedslønn</FormSummary.Heading>
                </FormSummary.Header>
                <FormSummary.Answers>
                    <FormSummary.Answer>
                        <FormSummary.Label>Beregnet månedslønn</FormSummary.Label>
                        <FormSummary.Value>
                            <FormattedNumber value={inntektBeløp} style="currency" currency="NOK" />
                        </FormSummary.Value>
                    </FormSummary.Answer>
                </FormSummary.Answers>
            </FormSummary>
            <FormSummary>
                <FormSummary.Header>
                    <FormSummary.Heading level="2">Refusjon</FormSummary.Heading>
                </FormSummary.Header>
                <FormSummary.Answers>
                    {endringerRefusjon && refusjon !== undefined ? (
                        <>
                            <FormSummary.Answer>
                                <FormSummary.Label>Refusjonsbeløp per måned</FormSummary.Label>
                                <FormSummary.Value>
                                    <FormattedNumber
                                        value={refusjon.refusjonBeløpPerMnd}
                                        style="currency"
                                        currency="NOK"
                                    />
                                </FormSummary.Value>
                            </FormSummary.Answer>
                            <FormSummary.Answer>
                                <FormSummary.Label>
                                    Vil det være endringer eller opphør av refusjon i løpet av fraværsperioden?
                                </FormSummary.Label>
                                <FormSummary.Value>
                                    {harEndringerIRefusjon || refusjonOpphører ? 'Ja' : 'Nei'}
                                </FormSummary.Value>
                            </FormSummary.Answer>
                            {harEndringerIRefusjon && (
                                <FormSummary.Answer>
                                    <FormSummary.Label>Endringer</FormSummary.Label>
                                    <FormSummary.Value>
                                        <List>
                                            {endringerRefusjon.map((endring) => (
                                                <List.Item key={endring.fom.toDateString()}>
                                                    Fra og med {dateFormatter.compact(endring.fom)}:{' '}
                                                    <FormattedNumber
                                                        value={endring.refusjonBeløpPerMnd}
                                                        style="currency"
                                                        currency="NOK"
                                                    />
                                                </List.Item>
                                            ))}
                                        </List>
                                    </FormSummary.Value>
                                </FormSummary.Answer>
                            )}
                            {harRefusjonOpphører && (
                                <FormSummary.Answer>
                                    <FormSummary.Label>Opphør</FormSummary.Label>
                                    <FormSummary.Value>
                                        <List>
                                            <List.Item key="refusjon-opphorer">
                                                Refusjon opphører fra og med {dateFormatter.compact(refusjonOpphører)}
                                            </List.Item>
                                        </List>
                                    </FormSummary.Value>
                                </FormSummary.Answer>
                            )}
                        </>
                    ) : (
                        <FormSummary.Answer>
                            <FormSummary.Label>Informasjon om refusjon</FormSummary.Label>
                            <FormSummary.Value>Ingen informasjon om refusjon</FormSummary.Value>
                        </FormSummary.Answer>
                    )}
                </FormSummary.Answers>
            </FormSummary>

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
