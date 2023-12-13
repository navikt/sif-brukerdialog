import React from 'react';
import { FormattedMessage, IntlShape, useIntl } from 'react-intl';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import { DateRange } from '@navikt/sif-common-formik-ds/lib';
import {
    decimalDurationToDuration,
    ISODateToDate,
    ISODurationToDecimalDuration,
    ISODurationToDuration,
} from '@navikt/sif-common-utils/lib';
import { formatTimerOgMinutter } from '../../../local-sif-common-pleiepenger/components/timer-og-minutter/TimerOgMinutter';
import { ArbeidIPeriodeType } from '../../../types/ArbeidIPeriodeType';
import { RedusertArbeidstidType } from '../../../types/RedusertArbeidstidType';
import { ArbeidsforholdApiData, ArbeidsukeTimerApiData } from '../../../types/søknad-api-data/SøknadApiData';
import { getArbeidsukeInfoIPeriode } from '../../../utils/arbeidsukeInfoUtils';

interface Props {
    periode: DateRange;
    arbeidIPeriodeSummaryItem: ArbeidIPeriodenSummaryItemType;
}

export interface ArbeidIPeriodenSummaryItemType extends ArbeidsforholdApiData {
    tittel: string;
    gjelderHonorar?: boolean;
}

const ArbeidIPeriodeSummaryItem: React.FunctionComponent<Props> = ({ arbeidIPeriodeSummaryItem }) => {
    const intl = useIntl();

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
                        <FormattedMessage id={`oppsummering.arbeidIPeriode.arbeiderIPerioden.somVanlig.honorar`} />
                    ) : (
                        <FormattedMessage id={`oppsummering.arbeidIPeriode.arbeiderIPerioden.somVanlig`} />
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
                        <FormattedMessage id={`oppsummering.arbeidIPeriode.arbeiderIPerioden.nei.honorar`} />
                    ) : (
                        <FormattedMessage id={`oppsummering.arbeidIPeriode.arbeiderIPerioden.nei`} />
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
                        <FormattedMessage id="oppsummering.arbeidIPeriode.arbeiderIPerioden.redusert" />
                    </li>
                    <li>{getArbeidProsentTekst(redusertArbeid.prosentAvNormalt, intl)}</li>
                </ul>
            );
        case RedusertArbeidstidType.timerISnittPerUke:
            return (
                <ul>
                    <li>
                        <FormattedMessage id="oppsummering.arbeidIPeriode.arbeiderIPerioden.redusert" />
                    </li>
                    <li>
                        <FormattedMessage
                            id="oppsummering.arbeidIPeriode.arbeiderIPerioden.timerPerUke"
                            values={{
                                timer: formatTimerOgMinutter(intl, ISODurationToDuration(redusertArbeid.timerPerUke)),
                                timerNormalt: getTimerNormaltString(timerNormaltNumber, intl),
                            }}
                        />
                    </li>
                </ul>
            );
        case RedusertArbeidstidType.ulikeUkerTimer:
            return (
                <ul>
                    <li>
                        <FormattedMessage id="oppsummering.arbeidIPeriode.arbeiderIPerioden.redusert" />
                    </li>
                    <li>
                        <p>
                            <FormattedMessage
                                id={
                                    redusertArbeid.arbeidsuker.length === 1
                                        ? 'oppsummering.arbeidIPeriode.arbeiderIPerioden.ulikeUker.enkeltuke.timer.tittel'
                                        : 'oppsummering.arbeidIPeriode.arbeiderIPerioden.ulikeUker.timer.tittel'
                                }
                            />
                        </p>
                        {getArbeiderUlikeUkerTimerSummary(redusertArbeid.arbeidsuker, intl)}
                    </li>
                </ul>
            );
    }
};

const getTimerNormaltString = (timerNormaltNumber: number, intl: IntlShape) =>
    formatTimerOgMinutter(intl, decimalDurationToDuration(timerNormaltNumber));

const getArbeidProsentTekst = (prosent: number, intl: IntlShape) => {
    return intlHelper(intl, 'oppsummering.arbeidIPeriode.arbeiderIPerioden.prosent', {
        prosent: Intl.NumberFormat().format(prosent),
    });
};

const getArbeiderUlikeUkerTimerSummary = (arbeidsuker: ArbeidsukeTimerApiData[], intl: IntlShape) => {
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
                        <FormattedMessage
                            id="oppsummering.arbeidIPeriode.arbeiderIPerioden.ulikeUker.timer.uke"
                            values={{
                                ukenummer: week.ukenummer,
                                timer: formatTimerOgMinutter(intl, ISODurationToDuration(uke.timer)),
                            }}
                        />
                    </li>
                );
            })}
        </ul>
    );
};

export default ArbeidIPeriodeSummaryItem;
