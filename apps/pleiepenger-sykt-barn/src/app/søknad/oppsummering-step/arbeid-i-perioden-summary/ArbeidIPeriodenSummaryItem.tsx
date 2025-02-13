import React from 'react';
import { DateRange } from '@navikt/sif-common-formik-ds';
import {
    decimalDurationToDuration,
    ISODateToDate,
    ISODurationToDecimalDuration,
    ISODurationToDuration,
} from '@navikt/sif-common-utils';
import { AppIntlShape, AppText, useAppIntl } from '../../../i18n';
import { ArbeidIPeriodeType } from '../../../types/ArbeidIPeriodeType';
import { RedusertArbeidstidType } from '../../../types/RedusertArbeidstidType';
import { ArbeidsforholdApiData, ArbeidsukeTimerApiData } from '../../../types/søknad-api-data/SøknadApiData';
import { getArbeidsukeInfoIPeriode } from '../../../utils/arbeidsukeInfoUtils';
import { formatTimerOgMinutter } from '../../../utils/formatTimerOgMinutter';
import { List } from '@navikt/ds-react';

interface Props {
    periode: DateRange;
    arbeidIPeriodeSummaryItem: ArbeidIPeriodenSummaryItemType;
}

export interface ArbeidIPeriodenSummaryItemType extends ArbeidsforholdApiData {
    tittel: string;
    gjelderHonorar?: boolean;
}

const ArbeidIPeriodeSummaryItem: React.FunctionComponent<Props> = ({ arbeidIPeriodeSummaryItem }) => {
    const appIntl = useAppIntl();
    const { text } = appIntl;

    const { arbeidIPeriode, normalarbeidstid, gjelderHonorar } = arbeidIPeriodeSummaryItem;
    const timerNormaltNumber = ISODurationToDecimalDuration(normalarbeidstid.timerPerUkeISnitt);

    if (arbeidIPeriode === undefined || timerNormaltNumber === undefined) {
        return <>Informasjon om arbeid i perioden mangler</>;
    }

    if (arbeidIPeriode.type === ArbeidIPeriodeType.arbeiderVanlig) {
        return (
            <List>
                <List.Item>
                    {gjelderHonorar ? (
                        <AppText id={`oppsummering.arbeidIPeriode.arbeiderIPerioden.somVanlig.honorar`} />
                    ) : (
                        <AppText id={`oppsummering.arbeidIPeriode.arbeiderIPerioden.somVanlig`} />
                    )}
                </List.Item>
            </List>
        );
    }

    if (arbeidIPeriode.type === ArbeidIPeriodeType.arbeiderIkke) {
        return (
            <List>
                <List.Item>
                    {gjelderHonorar ? (
                        <AppText id={`oppsummering.arbeidIPeriode.arbeiderIPerioden.nei.honorar`} />
                    ) : (
                        <AppText id={`oppsummering.arbeidIPeriode.arbeiderIPerioden.nei`} />
                    )}
                </List.Item>
            </List>
        );
    }

    const { redusertArbeid } = arbeidIPeriode;

    switch (redusertArbeid.type) {
        case RedusertArbeidstidType.prosentAvNormalt:
            return (
                <List>
                    <List.Item>
                        <AppText id="oppsummering.arbeidIPeriode.arbeiderIPerioden.redusert" />
                    </List.Item>
                    <List.Item>{getArbeidProsentTekst(redusertArbeid.prosentAvNormalt, appIntl)}</List.Item>
                </List>
            );
        case RedusertArbeidstidType.timerISnittPerUke:
            return (
                <List>
                    <List.Item>
                        <AppText id="oppsummering.arbeidIPeriode.arbeiderIPerioden.redusert" />
                    </List.Item>
                    <List.Item>
                        <AppText
                            id="oppsummering.arbeidIPeriode.arbeiderIPerioden.timerPerUke"
                            values={{
                                timer: formatTimerOgMinutter(
                                    appIntl,
                                    ISODurationToDuration(redusertArbeid.timerPerUke),
                                ),
                                timerNormalt: getTimerNormaltString(timerNormaltNumber, appIntl),
                            }}
                        />
                    </List.Item>
                </List>
            );
        case RedusertArbeidstidType.ulikeUkerTimer:
            return (
                <List>
                    <List.Item>
                        <AppText id="oppsummering.arbeidIPeriode.arbeiderIPerioden.redusert" />
                    </List.Item>
                    <List.Item
                        title={text(
                            redusertArbeid.arbeidsuker.length === 1
                                ? 'oppsummering.arbeidIPeriode.arbeiderIPerioden.ulikeUker.enkeltuke.timer.tittel'
                                : 'oppsummering.arbeidIPeriode.arbeiderIPerioden.ulikeUker.timer.tittel',
                        )}>
                        {getArbeiderUlikeUkerTimerSummary(redusertArbeid.arbeidsuker, appIntl)}
                    </List.Item>
                </List>
            );
    }
};

const getTimerNormaltString = (timerNormaltNumber: number, appIntl: AppIntlShape) =>
    formatTimerOgMinutter(appIntl, decimalDurationToDuration(timerNormaltNumber));

const getArbeidProsentTekst = (prosent: number, { text }: AppIntlShape) => {
    return text('oppsummering.arbeidIPeriode.arbeiderIPerioden.prosent', {
        prosent: Intl.NumberFormat().format(prosent),
    });
};

const getArbeiderUlikeUkerTimerSummary = (arbeidsuker: ArbeidsukeTimerApiData[], appIntl: AppIntlShape) => {
    return (
        <List>
            {arbeidsuker.map((uke) => {
                const dateRange: DateRange = {
                    from: ISODateToDate(uke.periode.fraOgMed),
                    to: ISODateToDate(uke.periode.tilOgMed),
                };
                const week = getArbeidsukeInfoIPeriode(dateRange);
                return (
                    <List.Item key={week.ukenummer}>
                        <AppText
                            id="oppsummering.arbeidIPeriode.arbeiderIPerioden.ulikeUker.timer.uke"
                            values={{
                                ukenummer: week.ukenummer,
                                timer: formatTimerOgMinutter(appIntl, ISODurationToDuration(uke.timer)),
                            }}
                        />
                    </List.Item>
                );
            })}
        </List>
    );
};

export default ArbeidIPeriodeSummaryItem;
