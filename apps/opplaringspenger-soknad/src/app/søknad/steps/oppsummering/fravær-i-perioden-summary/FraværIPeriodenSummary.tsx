import { Box, FormSummary, Heading } from '@navikt/ds-react';
import { DateRange } from '@navikt/sif-common-formik-ds';
import EditStepLink from '@navikt/sif-common-soknad-ds/src/components/edit-step-link/EditStepLink';
import { ISODateToDate, prettifyDateExtended } from '@navikt/sif-common-utils';
import dayjs from 'dayjs';

import TidEnkeltdager from '../../../../components/tid-enkeltdager/TidEnkeltdager';
import { AppIntlShape, AppText, useAppIntl } from '../../../../i18n';
import { ArbeidsgiverType } from '../../../../types/Arbeidsgiver';
import {
    ArbeidsforholdApiData,
    ArbeidsgiverApiData,
    SøknadApiData,
} from '../../../../types/søknadApiData/SøknadApiData';
import { JobberIPeriodeSvar } from '../../arbeidstid/ArbeidstidTypes';

interface Props {
    apiValues: SøknadApiData;
    søknadsperiode: DateRange;
    onEdit?: () => void;
}

export interface FraværIPeriodenSummaryItemType extends ArbeidsforholdApiData {
    tittel: string;
    erAktivIPeriode: boolean;
    hvor: string;
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

const FraværIPeriodenSummary = ({
    apiValues: { arbeidsgivere, frilans, selvstendigNæringsdrivende },
    søknadsperiode,
    onEdit,
}: Props) => {
    const appIntl = useAppIntl();
    const { text } = appIntl;
    const alleArbeidsforhold: FraværIPeriodenSummaryItemType[] = [];

    if (arbeidsgivere) {
        arbeidsgivere.forEach((arbeidsgiverApiData) => {
            if (arbeidsgiverApiData.arbeidsforhold) {
                alleArbeidsforhold.push({
                    ...arbeidsgiverApiData.arbeidsforhold,
                    tittel: getArbeidsgiverTittel(appIntl, arbeidsgiverApiData, søknadsperiode),
                    erAktivIPeriode: arbeidsgiverApiData.arbeidsforhold.arbeidIPeriode !== undefined,
                    hvor: appIntl.text('arbeidstidPeriode.arbeidIPeriodeIntlValues.somAnsatt', {
                        arbeidsstedNavn: arbeidsgiverApiData.navn,
                    }),
                });
            }
        });
    }

    if (frilans?.arbeidsforhold) {
        alleArbeidsforhold.push({
            ...frilans.arbeidsforhold,
            tittel: 'Frilanser',
            erAktivIPeriode: frilans.arbeidsforhold.arbeidIPeriode !== undefined,
            hvor: appIntl.text('arbeidstidPeriode.arbeidIPeriodeIntlValues.somFrilanser'),
        });
    }

    if (selvstendigNæringsdrivende?.arbeidsforhold) {
        alleArbeidsforhold.push({
            ...selvstendigNæringsdrivende.arbeidsforhold,
            tittel: text('selvstendigNæringsdrivende.tittel'),
            erAktivIPeriode: true,
            hvor: appIntl.text('arbeidstidPeriode.arbeidIPeriodeIntlValues.somSN'),
        });
    }

    return (
        <>
            {alleArbeidsforhold.length > 0 && (
                <FormSummary>
                    <FormSummary.Header>
                        <FormSummary.Heading level="2">
                            <AppText id="oppsummering.fraværIPeriode.jobbIPerioden.header" />
                        </FormSummary.Heading>
                    </FormSummary.Header>
                    <FormSummary.Answers>
                        {alleArbeidsforhold.map((forhold) => (
                            <FormSummary.Answer key={forhold.tittel}>
                                {forhold.arbeidIPeriode ? (
                                    <>
                                        <FormSummary.Label>
                                            <Box paddingBlock="space-12">
                                                <Heading level="3" size="small">
                                                    {forhold.tittel}
                                                </Heading>
                                            </Box>
                                        </FormSummary.Label>
                                        <FormSummary.Value>
                                            <FormSummary.Answers>
                                                <FormSummary.Answer>
                                                    <FormSummary.Label>
                                                        <AppText
                                                            id="fraværIPeriode.jobberIPerioden.spm"
                                                            values={{ hvor: forhold.hvor }}
                                                        />
                                                    </FormSummary.Label>
                                                    <FormSummary.Value>
                                                        <Box marginBlock="space-8 space-0">
                                                            {forhold.arbeidIPeriode.jobberIPerioden ===
                                                                JobberIPeriodeSvar.heltFravær && (
                                                                <AppText id="fraværIPeriode.jobberIPerioden.jobberIkke" />
                                                            )}
                                                            {forhold.arbeidIPeriode.jobberIPerioden ===
                                                                JobberIPeriodeSvar.redusert && (
                                                                <AppText id="fraværIPeriode.jobberIPerioden.jobberRedusert" />
                                                            )}
                                                            {forhold.arbeidIPeriode.jobberIPerioden ===
                                                                JobberIPeriodeSvar.somVanlig && (
                                                                <AppText id="fraværIPeriode.jobberIPerioden.jobberVanlig" />
                                                            )}
                                                        </Box>
                                                    </FormSummary.Value>
                                                </FormSummary.Answer>
                                                {forhold.arbeidIPeriode.jobberIPerioden ===
                                                    JobberIPeriodeSvar.redusert &&
                                                    forhold.arbeidIPeriode.enkeltdagerFravær && (
                                                        <FormSummary.Answer>
                                                            <FormSummary.Label>
                                                                <Box marginBlock="space-24 space-0">
                                                                    <Heading level="4" size="xsmall">
                                                                        <AppText id="oppsummering.fraværIPeriode.jobberIPerioden.dagerJegSkalJobbe.heading" />
                                                                    </Heading>
                                                                </Box>
                                                            </FormSummary.Label>
                                                            <FormSummary.Value>
                                                                <Box marginBlock="space-16 space-0">
                                                                    <TidEnkeltdager
                                                                        dager={forhold.arbeidIPeriode.enkeltdagerFravær}
                                                                        renderAsAccordion={false}
                                                                        headingLevel="5"
                                                                    />
                                                                </Box>
                                                            </FormSummary.Value>
                                                        </FormSummary.Answer>
                                                    )}
                                            </FormSummary.Answers>
                                        </FormSummary.Value>
                                    </>
                                ) : (
                                    <FormSummary.Value>
                                        <AppText id="oppsummering.fraværIPeriode.jobberIPerioden.informasjonMangler" />
                                    </FormSummary.Value>
                                )}
                            </FormSummary.Answer>
                        ))}
                    </FormSummary.Answers>
                    {onEdit && (
                        <FormSummary.Footer>
                            <EditStepLink onEdit={onEdit} />
                        </FormSummary.Footer>
                    )}
                </FormSummary>
            )}
        </>
    );
};

export default FraværIPeriodenSummary;
