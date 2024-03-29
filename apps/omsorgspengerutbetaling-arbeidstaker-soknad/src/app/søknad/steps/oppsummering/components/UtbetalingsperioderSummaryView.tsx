import { FormattedMessage, useIntl } from 'react-intl';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import { timeText } from '@navikt/sif-common-forms-ds/src/forms/fravær/fraværUtilities';
import { SummaryBlock, SummaryList } from '@navikt/sif-common-ui';
import { ISODateToDate } from '@navikt/sif-common-utils/src';
import { prettifyDate, prettifyDateExtended } from '@navikt/sif-common-utils/src/dateFormatter';
import { iso8601DurationToTime, timeToDecimalTime } from '@navikt/sif-common-utils/src/timeUtils';
import { Time } from '@navikt/sif-common-utils/src/types';
import { isString } from 'formik';
import { ApiAktivitet, Utbetalingsperiode } from '../../../../types/søknadApiData/SøknadApiData';

export interface Props {
    utbetalingsperioder: Utbetalingsperiode[];
}

type UtbetalingsperiodeDag = Omit<
    Utbetalingsperiode,
    'fraOgMed' | 'tilOgMed' | 'antallTimerPlanlagt' | 'antallTimerBorte'
> & {
    dato: string;
    antallTimerPlanlagt: Time;
    antallTimerBorte: Time;
};

const isUtbetalingsperiode = (value: any): value is Utbetalingsperiode => {
    return isString(value.fraOgMed) && isString(value.tilOgMed) && value.antallTimerPlanlagt && value.antallTimerBorte;
};

export const timeToStringTemporaryFix = (time: Time, hideZeroMinutes?: boolean): string => {
    if (hideZeroMinutes && time.minutes === '0') {
        return `${time.hours} timer`;
    }
    return `${time.hours} timer og ${time.minutes} minutter`;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const isTime = (value: any): value is Time => {
    return value && value.hours !== undefined && value.minutes !== undefined;
};

export const toMaybeUtbetalingsperiodeDag = (p: Utbetalingsperiode): UtbetalingsperiodeDag | null => {
    if (isUtbetalingsperiode(p)) {
        const antallTimerPlanlagtTime: Partial<Time> | undefined = p.antallTimerPlanlagt
            ? iso8601DurationToTime(p.antallTimerPlanlagt)
            : undefined;
        const antallTimerBorteTime: Partial<Time> | undefined = p.antallTimerBorte
            ? iso8601DurationToTime(p.antallTimerBorte)
            : undefined;
        if (isTime(antallTimerPlanlagtTime) && isTime(antallTimerBorteTime)) {
            return {
                dato: p.fraOgMed,
                antallTimerPlanlagt: antallTimerPlanlagtTime,
                antallTimerBorte: antallTimerBorteTime,
                årsak: p.årsak,
                aktivitetFravær: [ApiAktivitet.ARBEIDSTAKER],
            };
        }
    }
    return null;
};

export const outNull = (
    maybeUtbetalingsperiodeDag: UtbetalingsperiodeDag | null,
): maybeUtbetalingsperiodeDag is UtbetalingsperiodeDag => maybeUtbetalingsperiodeDag !== null;

export const utbetalingsperiodeDagToDagSummaryStringView = (dag: UtbetalingsperiodeDag): JSX.Element => {
    const antallTimerSkulleJobbet = `${timeToDecimalTime(dag.antallTimerPlanlagt)} ${timeText(
        `${timeToDecimalTime(dag.antallTimerPlanlagt)}`,
    )}`;
    const antallTimerBorteFraJobb = `${timeToDecimalTime(dag.antallTimerBorte)} ${timeText(
        `${timeToDecimalTime(dag.antallTimerBorte)}`,
    )}`;
    return (
        <>
            <FormattedMessage
                tagName="span"
                id="step.oppsummering.arbeidsforhold.delvisFravær.item"
                values={{
                    dato: prettifyDateExtended(ISODateToDate(dag.dato)),
                    timerSkulleJobbet: antallTimerSkulleJobbet,
                    timerBorte: antallTimerBorteFraJobb,
                }}
            />
        </>
    );
};

const UtbetalingsperioderSummaryView: React.FC<Props> = ({ utbetalingsperioder = [] }: Props): JSX.Element => {
    const intl = useIntl();

    const perioder = utbetalingsperioder.filter((p) => p.antallTimerBorte === null);
    const dager: UtbetalingsperiodeDag[] = utbetalingsperioder.map(toMaybeUtbetalingsperiodeDag).filter(outNull);

    return (
        <>
            {perioder.length > 0 && (
                <SummaryBlock header={intlHelper(intl, 'step.oppsummering.arbeidsforhold.fravær.heleDager.header')}>
                    <SummaryList
                        items={perioder}
                        itemRenderer={(periode: Utbetalingsperiode): JSX.Element => (
                            <>
                                <FormattedMessage
                                    tagName="span"
                                    id="step.oppsummering.arbeidsforhold.fravær.heleDager.item"
                                    values={{
                                        fom: prettifyDate(ISODateToDate(periode.fraOgMed)),
                                        tom: prettifyDate(ISODateToDate(periode.tilOgMed)),
                                    }}
                                />
                            </>
                        )}
                    />
                </SummaryBlock>
            )}
            {dager.length > 0 && (
                <SummaryBlock header={intlHelper(intl, 'step.oppsummering.arbeidsforhold.delvisFravær.header')}>
                    <SummaryList
                        items={dager}
                        itemRenderer={(dag: UtbetalingsperiodeDag) => utbetalingsperiodeDagToDagSummaryStringView(dag)}
                    />
                </SummaryBlock>
            )}
        </>
    );
};

export default UtbetalingsperioderSummaryView;
