import * as React from 'react';
import { ApiAktivitet, ArbeidsgiverDetaljer, Utbetalingsperiode } from '../../../types/søknadApiData/SøknadApiData';
import {
    ISODateToDate,
    Time,
    isValidTime,
    iso8601DurationToTime,
    prettifyDateExtended,
} from '@navikt/sif-common-utils';
import { Alert, Heading, Panel } from '@navikt/ds-react';
import { FormattedMessage } from 'react-intl';
import { utbetalingsperiodeDagToDagSummaryStringView } from '../../../søknad/steps/oppsummering/components/UtbetalingsperioderSummaryView';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';

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
        <div className={'pagebreak tilArbeidsgiverPanel'}>
            <Panel border={true} className={'luftOver'}>
                <Heading level="2" size="medium">
                    Til {arbeidsgiverDetaljer.navn}
                </Heading>

                <p>
                    <FormattedMessage id="page.conformation.tilArbeidsgiverDokument.tittel" />
                </p>

                <p>
                    <b>
                        <FormattedMessage
                            id="page.conformation.tilArbeidsgiverDokument.1"
                            values={{
                                søkersNavn: søkersNavn,
                                arbeidsgiversNavn: arbeidsgiverDetaljer.navn,
                            }}
                        />
                    </b>
                </p>
                <p>
                    <b>
                        <FormattedMessage
                            id="page.conformation.tilArbeidsgiverDokument.2"
                            values={{
                                søkersNavn: søkersNavn,
                                søknadNavn: søknadNavn,
                            }}
                        />
                    </b>
                </p>
                {arbeidsgiverDetaljer.perioder.length > 0 && (
                    <ul>
                        {arbeidsgiverDetaljer.perioder.map((periode: Utbetalingsperiode, i: number) => {
                            const maybePlanlagt: Time | undefined = isoDurationToMaybeTime(periode.antallTimerPlanlagt);
                            const maybeBorte: Time | undefined = isoDurationToMaybeTime(periode.antallTimerBorte);

                            return maybePlanlagt && maybeBorte ? (
                                <li key={`delvisDag-${i}`}>
                                    {utbetalingsperiodeDagToDagSummaryStringView({
                                        dato: periode.fraOgMed,
                                        antallTimerPlanlagt: maybePlanlagt,
                                        antallTimerBorte: maybeBorte,
                                        årsak: periode.årsak,
                                        aktivitetFravær: [ApiAktivitet.ARBEIDSTAKER],
                                    })}
                                </li>
                            ) : (
                                <li key={`periode-${i}`}>
                                    {prettifyDateExtended(ISODateToDate(periode.fraOgMed))} -{' '}
                                    {prettifyDateExtended(ISODateToDate(periode.tilOgMed))}
                                </li>
                            );
                        })}
                    </ul>
                )}

                <Panel border={true} className={'luftOver'}>
                    <Alert variant="warning" inline={true}>
                        <FormattedMessage id="page.conformation.tilArbeidsgiverDokument.alert.1" />

                        <Block padBottom={'l'}>
                            <b>
                                <FormattedMessage
                                    id="page.conformation.tilArbeidsgiverDokument.alert.2"
                                    values={{
                                        søknadNavn: søknadNavn,
                                    }}
                                />
                            </b>
                        </Block>
                        <Block>
                            <FormattedMessage id="page.conformation.tilArbeidsgiverDokument.alert.3" />
                        </Block>
                    </Alert>
                </Panel>

                <div>
                    <h3>
                        <FormattedMessage id="page.conformation.tilArbeidsgiverDokument.info.tittel" />
                    </h3>

                    <p>
                        <FormattedMessage id="page.conformation.tilArbeidsgiverDokument.info.1" />
                    </p>
                    <p>
                        <FormattedMessage id="page.conformation.tilArbeidsgiverDokument.info.2" />
                    </p>
                    <p>
                        <FormattedMessage id="page.conformation.tilArbeidsgiverDokument.info.3" />{' '}
                        <a
                            className="lenke"
                            target="_blank"
                            rel="noopener noreferrer"
                            href={
                                'https://www.nav.no/no/bedrift/tjenester-og-skjemaer/nav-og-altinn-tjenester/inntektsmelding'
                            }>
                            <FormattedMessage id="page.conformation.tilArbeidsgiverDokument.info.4.lenkeTekst" />
                        </a>
                    </p>
                </div>
            </Panel>
        </div>
    );
};

export default TilArbeidsgiverDokument;
