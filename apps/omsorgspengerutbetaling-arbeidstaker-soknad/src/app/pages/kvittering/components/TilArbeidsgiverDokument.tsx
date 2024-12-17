import { Alert, Box, Heading, List } from '@navikt/ds-react';
import * as React from 'react';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import {
    iso8601DurationToTime,
    ISODateToDate,
    isValidTime,
    prettifyDateExtended,
    Time,
} from '@navikt/sif-common-utils';
import { AppText } from '../../../i18n';
import { utbetalingsperiodeDagToDagSummaryStringView } from '../../../søknad/steps/oppsummering/components/UtbetalingsperioderSummaryView';
import { ApiAktivitet, ArbeidsgiverDetaljer, Utbetalingsperiode } from '../../../types/søknadApiData/SøknadApiData';

interface Props {
    arbeidsgiverDetaljer: ArbeidsgiverDetaljer;
    key: number;
    søkersNavn: string;
    søknadNavn: string;
}

const isoDurationToMaybeTime = (value: string | null): Time | undefined => {
    if (value) {
        const partialTimeOrUndefined: Partial<Time> | undefined = iso8601DurationToTime(value);
        const maybeTime: Time | undefined = isValidTime(partialTimeOrUndefined)
            ? { ...partialTimeOrUndefined }
            : undefined;
        return maybeTime;
    }
    return undefined;
};

const TilArbeidsgiverDokument: React.FC<Props> = ({ arbeidsgiverDetaljer, søkersNavn, søknadNavn }: Props) => {
    return (
        <div className={'pagebreak'}>
            <Box borderWidth="1" borderColor="border-default" borderRadius="small" padding="5" marginBlock="0 10">
                <Heading level="2" size="medium">
                    Til {arbeidsgiverDetaljer.navn}
                </Heading>

                <p>
                    <AppText id="page.conformation.tilArbeidsgiverDokument.tittel" />
                </p>

                <p>
                    <strong>
                        <AppText
                            id="page.conformation.tilArbeidsgiverDokument.1"
                            values={{
                                søkersNavn: søkersNavn,
                                arbeidsgiversNavn: arbeidsgiverDetaljer.navn,
                            }}
                        />
                    </strong>
                </p>
                <p>
                    <strong>
                        <AppText
                            id="page.conformation.tilArbeidsgiverDokument.2"
                            values={{
                                søkersNavn: søkersNavn,
                                søknadNavn: søknadNavn,
                            }}
                        />
                    </strong>
                </p>
                {arbeidsgiverDetaljer.perioder.length > 0 && (
                    <List>
                        {arbeidsgiverDetaljer.perioder.map((periode: Utbetalingsperiode, i: number) => {
                            const maybePlanlagt: Time | undefined = isoDurationToMaybeTime(periode.antallTimerPlanlagt);
                            const maybeBorte: Time | undefined = isoDurationToMaybeTime(periode.antallTimerBorte);

                            return maybePlanlagt && maybeBorte ? (
                                <List.Item key={`delvisDag-${i}`}>
                                    {utbetalingsperiodeDagToDagSummaryStringView({
                                        dato: periode.fraOgMed,
                                        antallTimerPlanlagt: maybePlanlagt,
                                        antallTimerBorte: maybeBorte,
                                        årsak: periode.årsak,
                                        aktivitetFravær: [ApiAktivitet.ARBEIDSTAKER],
                                    })}
                                </List.Item>
                            ) : (
                                <List.Item key={`periode-${i}`}>
                                    {prettifyDateExtended(ISODateToDate(periode.fraOgMed))} -{' '}
                                    {prettifyDateExtended(ISODateToDate(periode.tilOgMed))}
                                </List.Item>
                            );
                        })}
                    </List>
                )}

                <Box borderWidth="1" borderColor="border-default" borderRadius="small" padding="5" marginBlock="0 10">
                    <Alert variant="warning" inline={true}>
                        <AppText id="page.conformation.tilArbeidsgiverDokument.alert.1" />
                        <Block padBottom={'l'}>
                            <strong>
                                <AppText
                                    id="page.conformation.tilArbeidsgiverDokument.alert.2"
                                    values={{
                                        søknadNavn: søknadNavn,
                                    }}
                                />
                            </strong>
                        </Block>
                        <Block>
                            <AppText id="page.conformation.tilArbeidsgiverDokument.alert.3" />
                        </Block>
                    </Alert>
                </Box>

                <div>
                    <Heading level="3" size="small">
                        <AppText id="page.conformation.tilArbeidsgiverDokument.info.tittel" />
                    </Heading>

                    <p>
                        <AppText id="page.conformation.tilArbeidsgiverDokument.info.1" />
                    </p>
                    <p>
                        <AppText id="page.conformation.tilArbeidsgiverDokument.info.2" />
                    </p>
                    <p>
                        <AppText id="page.conformation.tilArbeidsgiverDokument.info.3" />{' '}
                        <a
                            className="lenke"
                            target="_blank"
                            rel="noopener noreferrer"
                            href={
                                'https://www.nav.no/no/bedrift/tjenester-og-skjemaer/nav-og-altinn-tjenester/inntektsmelding'
                            }>
                            <AppText id="page.conformation.tilArbeidsgiverDokument.info.4.lenkeTekst" />
                        </a>
                    </p>
                </div>
            </Box>
        </div>
    );
};

export default TilArbeidsgiverDokument;
