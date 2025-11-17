import { BodyShort, FormSummary, Heading, List, VStack } from '@navikt/ds-react';
import { dateFormatter } from '@navikt/sif-common-utils';
import { FormattedNumber } from 'react-intl';

import { Inntektsmelding } from '../../types';

interface Props {
    inntektsmelding: Inntektsmelding;
}

const InntektsmeldingDetaljer = ({ inntektsmelding }: Props) => {
    const { startDatoPermisjon, inntektBeløp, refusjon, endringerRefusjon, naturalYtelser, refusjonOpphører } =
        inntektsmelding;
    const harEndringerIRefusjon = endringerRefusjon && endringerRefusjon.length > 0;
    const harNaturalytelser = naturalYtelser && naturalYtelser.length > 0;
    const harRefusjonOpphører = refusjonOpphører !== undefined;

    return (
        <VStack gap="4">
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
            <FormSummary>
                <FormSummary.Header>
                    <FormSummary.Heading level="2">Naturalytelser</FormSummary.Heading>
                </FormSummary.Header>
                <FormSummary.Answers>
                    <FormSummary.Answer>
                        <FormSummary.Label>
                            Har den ansatte naturalytelser som faller bort ved fraværet?
                        </FormSummary.Label>
                        <FormSummary.Value>{harNaturalytelser ? 'Ja' : 'Nei'}</FormSummary.Value>
                    </FormSummary.Answer>
                    {harNaturalytelser && (
                        <FormSummary.Answer>
                            <FormSummary.Label>Naturalytelser per måned</FormSummary.Label>
                            <FormSummary.Value>
                                <List>
                                    {naturalYtelser.map((naturalytelse, index) => (
                                        <List.Item key={index}>
                                            {naturalytelse.periode ? (
                                                <>
                                                    {dateFormatter.compact(naturalytelse.periode.fom)} -{' '}
                                                    {dateFormatter.compact(naturalytelse.periode.tom)}
                                                </>
                                            ) : (
                                                <>Periode mangler</>
                                            )}
                                            : {naturalytelse.type} -{' '}
                                            <FormattedNumber
                                                value={naturalytelse.beløpPerMnd}
                                                style="currency"
                                                currency="NOK"
                                            />
                                        </List.Item>
                                    ))}
                                </List>
                            </FormSummary.Value>
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
