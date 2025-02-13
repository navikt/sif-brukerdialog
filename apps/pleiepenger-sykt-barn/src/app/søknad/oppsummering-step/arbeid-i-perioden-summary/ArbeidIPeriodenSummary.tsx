import { FormSummary } from '@navikt/ds-react';
import React from 'react';
import { AppText, useAppIntl } from '@i18n/index';
import { EditStepLink } from '@navikt/sif-common-soknad-ds';
import { DateRange } from '@navikt/sif-common-utils';
import { ArbeidsforholdApiData, SøknadApiData } from '../../../types/søknad-api-data/SøknadApiData';
import ArbeidIPeriodeSummaryItem, { ArbeidIPeriodenSummaryItemType } from './ArbeidIPeriodenSummaryItem';

interface Props {
    apiValues: SøknadApiData;
    søknadsperiode: DateRange;
    søknadsdato: Date;
    onEdit?: () => void;
}

export interface ArbeidIPeriodenFrilansSummaryItemType extends ArbeidsforholdApiData {
    tittel: string;
}

const ArbeidIPeriodenSummary: React.FunctionComponent<Props> = ({
    apiValues: { arbeidsgivere, frilans, selvstendigNæringsdrivende },
    søknadsperiode,
    onEdit,
}) => {
    const { text } = useAppIntl();
    const summaryItem: ArbeidIPeriodenSummaryItemType[] = [];

    arbeidsgivere.forEach((arbeidsgiverApiData) => {
        if (arbeidsgiverApiData.arbeidsforhold) {
            if (arbeidsgiverApiData.arbeidsforhold.arbeidIPeriode) {
                summaryItem.push({
                    ...arbeidsgiverApiData.arbeidsforhold,
                    tittel: text('arbeidsgiver.tittel', {
                        navn: arbeidsgiverApiData.navn,
                        organisasjonsnummer: arbeidsgiverApiData.organisasjonsnummer,
                    }),
                });
            }
        }
    });

    if (frilans.harInntektSomFrilanser && frilans._misterInntektSomFrilanser) {
        summaryItem.push({
            ...frilans.arbeidsforhold,
            tittel: text('frilans.tittel'),
        });
    }

    if (selvstendigNæringsdrivende.harInntektSomSelvstendig && selvstendigNæringsdrivende.arbeidsforhold) {
        summaryItem.push({
            ...selvstendigNæringsdrivende.arbeidsforhold,
            tittel: text('selvstendigNæringsdrivende.tittel'),
        });
    }

    return (
        <>
            {summaryItem.length > 0 && (
                <FormSummary>
                    <FormSummary.Header>
                        <FormSummary.Heading level="2">
                            <AppText id="oppsummering.arbeidIPeriode.jobbIPerioden.header" />
                        </FormSummary.Heading>
                        {onEdit && <EditStepLink onEdit={onEdit} />}
                    </FormSummary.Header>
                    <FormSummary.Answers>
                        {summaryItem.map((item) => (
                            <FormSummary.Answer key={item.tittel}>
                                <FormSummary.Label>{item.tittel}</FormSummary.Label>
                                <FormSummary.Value>
                                    <ArbeidIPeriodeSummaryItem
                                        periode={søknadsperiode}
                                        arbeidIPeriodeSummaryItem={item}
                                    />
                                </FormSummary.Value>
                            </FormSummary.Answer>
                        ))}
                    </FormSummary.Answers>
                </FormSummary>
            )}
        </>
    );
};

export default ArbeidIPeriodenSummary;
