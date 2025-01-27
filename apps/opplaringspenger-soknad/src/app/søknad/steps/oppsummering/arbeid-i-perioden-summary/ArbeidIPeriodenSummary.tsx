import { FormSummary, Heading } from '@navikt/ds-react';
import React from 'react';
import { DateRange } from '@navikt/sif-common-formik-ds';
import EditStepLink from '@navikt/sif-common-soknad-ds/src/components/edit-step-link/EditStepLink';
import { ISODateToDate, prettifyDateExtended } from '@navikt/sif-common-utils';
import dayjs from 'dayjs';
import { AppIntlShape, AppText, useAppIntl } from '../../../../i18n';
import { ArbeidsgiverType } from '../../../../types/Arbeidsgiver';
import {
    ArbeidsforholdApiData,
    ArbeidsgiverApiData,
    SøknadApiData,
} from '../../../../types/søknadApiData/SøknadApiData';
import ArbeidIPeriodeSummaryItem from './ArbeidIPeriodenSummaryItem';

interface Props {
    apiValues: SøknadApiData;
    valgteDatoer: Date[];
    søknadsperiode: DateRange;
    onEdit?: () => void;
}

export interface ArbeidIPeriodenSummaryItemType extends ArbeidsforholdApiData {
    tittel: string;
    erAktivIPeriode: boolean;
}

const getArbeidsgiverTittel = ({ text }: AppIntlShape, arbeidsgiver: ArbeidsgiverApiData, periode: DateRange) => {
    switch (arbeidsgiver.type) {
        case ArbeidsgiverType.ORGANISASJON:
            return text('arbeidsgiver.tittel', {
                navn: arbeidsgiver.navn,
                organisasjonsnummer: arbeidsgiver.organisasjonsnummer,
            });
        case ArbeidsgiverType.PRIVATPERSON:
            return arbeidsgiver.navn;
        case ArbeidsgiverType.FRILANSOPPDRAG: {
            const startdato = arbeidsgiver.ansattFom && ISODateToDate(arbeidsgiver.ansattFom);
            const sluttdato = arbeidsgiver.ansattTom && ISODateToDate(arbeidsgiver.ansattTom);

            if (startdato || sluttdato) {
                const intlValues = {
                    hvor: arbeidsgiver.navn,
                    startdato: startdato ? prettifyDateExtended(startdato) : undefined,
                    sluttdato: sluttdato ? prettifyDateExtended(sluttdato) : undefined,
                };
                const visStartdato = startdato;
                const visSluttdato = sluttdato && dayjs(sluttdato).isBefore(periode.to, 'day');

                if (visStartdato && visSluttdato) {
                    return text('frilans.tittel.startOgSlutt', intlValues);
                }
                if (visStartdato) {
                    return text('frilans.tittel.start', intlValues);
                }
                if (visSluttdato) {
                    return text('frilans.tittel.slutt', intlValues);
                }
            }
            return text('frilans.tittel');
        }
    }
};

const ArbeidIPeriodenSummary: React.FunctionComponent<Props> = ({
    apiValues: { arbeidsgivere, frilans, selvstendigNæringsdrivende },
    valgteDatoer,
    søknadsperiode,
    onEdit,
}) => {
    const appIntl = useAppIntl();
    const { text } = appIntl;
    const alleArbeidsforhold: ArbeidIPeriodenSummaryItemType[] = [];

    if (arbeidsgivere) {
        arbeidsgivere.forEach((arbeidsgiverApiData) => {
            if (arbeidsgiverApiData.arbeidsforhold) {
                alleArbeidsforhold.push({
                    ...arbeidsgiverApiData.arbeidsforhold,
                    tittel: getArbeidsgiverTittel(appIntl, arbeidsgiverApiData, søknadsperiode),
                    erAktivIPeriode: arbeidsgiverApiData.arbeidsforhold.arbeidIPeriode !== undefined,
                });
            }
        });
    }

    if (frilans?.arbeidsforhold) {
        alleArbeidsforhold.push({
            ...frilans.arbeidsforhold,
            tittel: 'Frilanser',
            erAktivIPeriode: frilans.arbeidsforhold.arbeidIPeriode !== undefined,
        });
    }

    if (selvstendigNæringsdrivende?.arbeidsforhold) {
        alleArbeidsforhold.push({
            ...selvstendigNæringsdrivende.arbeidsforhold,
            tittel: text('selvstendigNæringsdrivende.tittel'),
            erAktivIPeriode: true,
        });
    }

    return (
        <>
            {alleArbeidsforhold.length > 0 && (
                <FormSummary>
                    <FormSummary.Header>
                        <FormSummary.Heading level="2">
                            <AppText id="oppsummering.arbeidIPeriode.jobbIPerioden.header" />
                        </FormSummary.Heading>
                        {onEdit && <EditStepLink onEdit={onEdit} />}
                    </FormSummary.Header>
                    <FormSummary.Answers>
                        {alleArbeidsforhold.map((forhold) => (
                            <FormSummary.Answer key={forhold.tittel}>
                                {forhold.arbeidIPeriode ? (
                                    <>
                                        <FormSummary.Label>
                                            <Heading level="3" size="small">
                                                {forhold.tittel}
                                            </Heading>
                                        </FormSummary.Label>
                                        <FormSummary.Value>
                                            <ArbeidIPeriodeSummaryItem
                                                periode={søknadsperiode}
                                                valgteDatoer={valgteDatoer}
                                                arbeidIPeriode={forhold.arbeidIPeriode}
                                                normaltimerUke={forhold.jobberNormaltTimer}
                                            />
                                        </FormSummary.Value>
                                    </>
                                ) : (
                                    <FormSummary.Value>
                                        <AppText id="oppsummering.arbeidIPeriode.jobberIPerioden.informasjonMangler" />
                                    </FormSummary.Value>
                                )}
                            </FormSummary.Answer>
                        ))}
                    </FormSummary.Answers>
                </FormSummary>
            )}
        </>
    );
};

export default ArbeidIPeriodenSummary;
