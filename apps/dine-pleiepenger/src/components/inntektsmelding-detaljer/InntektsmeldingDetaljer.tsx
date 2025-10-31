import { FormSummary, List, VStack } from '@navikt/ds-react';
import { dateFormatter } from '@navikt/sif-common-utils';
import { FormattedNumber } from 'react-intl';

import { Inntektsmelding } from '../../server/api-models/InntektsmeldingSchema';

interface Props {
    inntektsmelding: Inntektsmelding;
}

const InntektsmeldingDetaljer = ({ inntektsmelding }: Props) => {
    const { startDatoPermisjon, inntektBeløp, refusjonBeløpPerMnd, endringerRefusjon, naturalYtelser } =
        inntektsmelding;
    const harEndringerIRefusjon = endringerRefusjon.length > 0;
    const harNaturalytelser = naturalYtelser && naturalYtelser.length > 0;
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
                            <FormattedNumber value={inntektBeløp.verdi} style="currency" currency="NOK" />
                        </FormSummary.Value>
                    </FormSummary.Answer>
                </FormSummary.Answers>
            </FormSummary>
            <FormSummary>
                <FormSummary.Header>
                    <FormSummary.Heading level="2">Refusjon</FormSummary.Heading>
                </FormSummary.Header>
                <FormSummary.Answers>
                    <FormSummary.Answer>
                        <FormSummary.Label>Refusjonsbeløp per måned</FormSummary.Label>
                        <FormSummary.Value>
                            <FormattedNumber value={refusjonBeløpPerMnd.verdi} style="currency" currency="NOK" />
                        </FormSummary.Value>
                    </FormSummary.Answer>
                    <FormSummary.Answer>
                        <FormSummary.Label>
                            Vil det være endringer eller opphør av refusjon i løpet av fraværsperioden?
                        </FormSummary.Label>
                        <FormSummary.Value>{harEndringerIRefusjon ? 'Ja' : 'Nei'}</FormSummary.Value>
                    </FormSummary.Answer>
                    {harEndringerIRefusjon && (
                        <FormSummary.Answer>
                            <FormSummary.Label>Endringer</FormSummary.Label>
                            <FormSummary.Value>
                                <List>
                                    {endringerRefusjon.map((e) => (
                                        <List.Item key={e.fom.toDateString()}>
                                            {dateFormatter.compact(e.fom)}:{' '}
                                            <FormattedNumber
                                                value={e.refusjonsbeløpMnd.verdi}
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
                            <FormSummary.Label>Naturalytelser</FormSummary.Label>
                            <FormSummary.Value>
                                <List>
                                    {naturalYtelser.map((n, index) => (
                                        <List.Item key={index}>
                                            {dateFormatter.compact(n.periode.fraOgMed)} -{' '}
                                            {dateFormatter.compact(n.periode.tilOgMed)}: {n.type} -{' '}
                                            <FormattedNumber
                                                value={n.beloepPerMnd.verdi}
                                                style="currency"
                                                currency="NOK"
                                            />{' '}
                                            per måned
                                        </List.Item>
                                    ))}
                                </List>
                            </FormSummary.Value>
                        </FormSummary.Answer>
                    )}
                </FormSummary.Answers>
            </FormSummary>
        </VStack>
    );
};

export default InntektsmeldingDetaljer;
