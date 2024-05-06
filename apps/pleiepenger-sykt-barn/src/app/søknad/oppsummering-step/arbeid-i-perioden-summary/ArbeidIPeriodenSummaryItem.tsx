import React from 'react';
import { DateRange } from '@navikt/sif-common-formik-ds/src';
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

    const { arbeidIPeriode, normalarbeidstid, gjelderHonorar } = arbeidIPeriodeSummaryItem;
    const timerNormaltNumber = ISODurationToDecimalDuration(normalarbeidstid.timerPerUkeISnitt);

    if (arbeidIPeriode === undefined || timerNormaltNumber === undefined) {
        return <>Informasjon om arbeid i perioden mangler</>;
    }

    if (arbeidIPeriode.type === ArbeidIPeriodeType.arbeiderVanlig) {
        return (
            <ul>
                <li>
                    {gjelderHonorar ? (
                        <AppText id={`oppsummering.arbeidIPeriode.arbeiderIPerioden.somVanlig.honorar`} />
                    ) : (
                        <AppText id={`oppsummering.arbeidIPeriode.arbeiderIPerioden.somVanlig`} />
                    )}
                </li>
            </ul>
        );
    }

    if (arbeidIPeriode.type === ArbeidIPeriodeType.arbeiderIkke) {
        return (
            <ul>
                <li>
                    {gjelderHonorar ? (
                        <AppText id={`oppsummering.arbeidIPeriode.arbeiderIPerioden.nei.honorar`} />
                    ) : (
                        <AppText id={`oppsummering.arbeidIPeriode.arbeiderIPerioden.nei`} />
                    )}
                </li>
            </ul>
        );
    }

    const { redusertArbeid } = arbeidIPeriode;

    switch (redusertArbeid.type) {
        case RedusertArbeidstidType.prosentAvNormalt:
            return (
                <ul>
                    <li>
                        <AppText id="oppsummering.arbeidIPeriode.arbeiderIPerioden.redusert" />
                    </li>
                    <li>{getArbeidProsentTekst(redusertArbeid.prosentAvNormalt, appIntl)}</li>
                </ul>
            );
        case RedusertArbeidstidType.timerISnittPerUke:
            return (
                <ul>
                    <li>
                        <AppText id="oppsummering.arbeidIPeriode.arbeiderIPerioden.redusert" />
                    </li>
                    <li>
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
                    </li>
                </ul>
            );
        case RedusertArbeidstidType.ulikeUkerTimer:
            return (
                <ul>
                    <li>
                        <AppText id="oppsummering.arbeidIPeriode.arbeiderIPerioden.redusert" />
                    </li>
                    <li>
                        <p>
                            <AppText
                                id={
                                    redusertArbeid.arbeidsuker.length === 1
                                        ? 'oppsummering.arbeidIPeriode.arbeiderIPerioden.ulikeUker.enkeltuke.timer.tittel'
                                        : 'oppsummering.arbeidIPeriode.arbeiderIPerioden.ulikeUker.timer.tittel'
                                }
                            />
                        </p>
                        {getArbeiderUlikeUkerTimerSummary(redusertArbeid.arbeidsuker, appIntl)}
                    </li>
                </ul>
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
        <ul>
            {arbeidsuker.map((uke) => {
                const dateRange: DateRange = {
                    from: ISODateToDate(uke.periode.fraOgMed),
                    to: ISODateToDate(uke.periode.tilOgMed),
                };
                const week = getArbeidsukeInfoIPeriode(dateRange);
                return (
                    <li key={week.ukenummer}>
                        <AppText
                            id="oppsummering.arbeidIPeriode.arbeiderIPerioden.ulikeUker.timer.uke"
                            values={{
                                ukenummer: week.ukenummer,
                                timer: formatTimerOgMinutter(appIntl, ISODurationToDuration(uke.timer)),
                            }}
                        />
                    </li>
                );
            })}
        </ul>
    );
};

export default ArbeidIPeriodeSummaryItem;
