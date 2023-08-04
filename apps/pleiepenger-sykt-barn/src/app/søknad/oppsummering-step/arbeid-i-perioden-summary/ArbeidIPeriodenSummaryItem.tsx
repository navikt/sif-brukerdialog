import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
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
import {
    ArbeidIPeriodeApiData,
    ArbeidsforholdApiData,
    ArbeidsukeTimerApiData,
    NormalarbeidstidApiData,
} from '../../../types/søknad-api-data/SøknadApiData';
import { getArbeidsukeInfoIPeriode } from '../../../utils/arbeidsukeInfoUtils';

interface Props {
    periode: DateRange;
    arbeidsforhold: ArbeidIPeriodenSummaryItemType;
}

export interface ArbeidIPeriodenSummaryItemType extends ArbeidsforholdApiData {
    tittel: string;
    gjelderHonorararbeid?: boolean;
}

const ArbeidIPeriodeSummaryItem: React.FunctionComponent<Props> = ({ arbeidsforhold }) => {
    const intl = useIntl();

    const timerNormaltNumber = ISODurationToDecimalDuration(arbeidsforhold.normalarbeidstid.timerPerUkeISnitt);

    if (arbeidsforhold.arbeidIPeriode === undefined || timerNormaltNumber === undefined) {
        return <>Informasjon om arbeid i perioden mangler</>;
    }

    const timerNormalt = formatTimerOgMinutter(intl, decimalDurationToDuration(timerNormaltNumber));

    const getTimerFraProsentAvNormalt = (prosent: number): string => {
        return formatTimerOgMinutter(intl, decimalDurationToDuration((timerNormaltNumber / 100) * prosent));
    };

    const getArbeidProsentTekst = (prosent: number, normalarbeidstid: NormalarbeidstidApiData) => {
        const timer = ISODurationToDecimalDuration(normalarbeidstid.timerPerUkeISnitt);
        if (!timer) {
            return undefined;
        }
        return intlHelper(intl, 'oppsummering.arbeidIPeriode.arbeiderIPerioden.prosent', {
            prosent: Intl.NumberFormat().format(prosent),
            timerNormalt,
            timerIPeriode: getTimerFraProsentAvNormalt(prosent),
        });
    };

    const getArbeiderUlikeUkerTimerSummary = (arbeidsuker: ArbeidsukeTimerApiData[]) => {
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

    const getArbeidIPeriodenDetaljer = (arbeidIPeriode: ArbeidIPeriodeApiData, gjelderHonorararbeid?: boolean) => {
        switch (arbeidIPeriode.type) {
            case ArbeidIPeriodeType.arbeiderVanlig:
                return (
                    <ul>
                        <li>
                            {gjelderHonorararbeid ? (
                                <FormattedMessage
                                    id={`oppsummering.arbeidIPeriode.arbeiderIPerioden.somVanlig.honorar`}
                                />
                            ) : (
                                <FormattedMessage id={`oppsummering.arbeidIPeriode.arbeiderIPerioden.somVanlig`} />
                            )}
                        </li>
                    </ul>
                );
            case ArbeidIPeriodeType.arbeiderIkke:
                return (
                    <ul>
                        <li>
                            {gjelderHonorararbeid ? (
                                <FormattedMessage id={`oppsummering.arbeidIPeriode.arbeiderIPerioden.nei.honorar`} />
                            ) : (
                                <FormattedMessage id={`oppsummering.arbeidIPeriode.arbeiderIPerioden.nei`} />
                            )}
                        </li>
                    </ul>
                );
            case ArbeidIPeriodeType.arbeiderRedusert:
                const { redusertArbeid } = arbeidIPeriode;
                switch (redusertArbeid.type) {
                    case RedusertArbeidstidType.prosentAvNormalt:
                        return (
                            <ul>
                                <li>
                                    {getArbeidProsentTekst(
                                        redusertArbeid.prosentAvNormalt,
                                        arbeidsforhold.normalarbeidstid
                                    )}
                                </li>
                            </ul>
                        );
                    case RedusertArbeidstidType.timerISnittPerUke:
                        return (
                            <ul>
                                <li>
                                    <FormattedMessage
                                        id="oppsummering.arbeidIPeriode.arbeiderIPerioden.timerPerUke"
                                        values={{
                                            timer: formatTimerOgMinutter(
                                                intl,
                                                ISODurationToDuration(redusertArbeid.timerPerUke)
                                            ),
                                        }}
                                    />
                                </li>
                            </ul>
                        );
                    case RedusertArbeidstidType.ulikeUkerTimer:
                        return (
                            <div>
                                <p>
                                    <FormattedMessage
                                        id={
                                            redusertArbeid.arbeidsuker.length === 1
                                                ? 'oppsummering.arbeidIPeriode.arbeiderIPerioden.ulikeUker.enkeltuke.timer.tittel'
                                                : 'oppsummering.arbeidIPeriode.arbeiderIPerioden.ulikeUker.timer.tittel'
                                        }
                                        values={{ timerNormalt: timerNormalt }}
                                    />
                                </p>
                                {getArbeiderUlikeUkerTimerSummary(redusertArbeid.arbeidsuker)}
                            </div>
                        );
                }
        }
    };

    return getArbeidIPeriodenDetaljer(arbeidsforhold.arbeidIPeriode, arbeidsforhold.gjelderHonorararbeid);
};

export default ArbeidIPeriodeSummaryItem;
