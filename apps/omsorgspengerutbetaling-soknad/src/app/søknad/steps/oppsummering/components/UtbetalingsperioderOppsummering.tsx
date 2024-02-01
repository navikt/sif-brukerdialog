import React from 'react';
import { IntlShape, useIntl } from 'react-intl';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import { timeText } from '@navikt/sif-common-forms-ds';
import { SummaryBlock, SummaryList } from '@navikt/sif-common-ui';
import { iso8601DurationToTime, ISODateToDate, prettifyDate, Time, timeToDecimalTime } from '@navikt/sif-common-utils';
import dayjs from 'dayjs';
import flatten from 'lodash/flatten';
import uniq from 'lodash/uniq';
import { ApiAktivitet } from '../../../../types/AktivitetFravær';
import { UtbetalingsperiodeApi } from '../../../../types/søknadApiData/SøknadApiData';

export interface Props {
    utbetalingsperioder: UtbetalingsperiodeApi[];
}

type UtbetalingsperiodeDag = Omit<
    UtbetalingsperiodeApi,
    'fraOgMed' | 'tilOgMed' | 'antallTimerPlanlagt' | 'antallTimerBorte'
> & {
    dato: string;
    antallTimerPlanlagt: Time;
    antallTimerBorte: Time;
};

export const isTime = (value: any): value is Time => {
    return value && value.hours !== undefined && value.minutes !== undefined;
};

export const isUtbetalingsperiodeDag = (p: any): p is UtbetalingsperiodeDag =>
    p && p.fraOgMed && p.antallTimerBorte !== null && p.antallTimerPlanlagt !== null;

export const toMaybeUtbetalingsperiodeDag = (p: UtbetalingsperiodeApi): UtbetalingsperiodeDag | null => {
    if (isUtbetalingsperiodeDag(p)) {
        const antallTimerPlanlagtTime: Partial<Time> | undefined = iso8601DurationToTime(p.antallTimerPlanlagt);
        const antallTimerBorteTime = iso8601DurationToTime(p.antallTimerBorte);
        if (isTime(antallTimerPlanlagtTime) && isTime(antallTimerBorteTime)) {
            return {
                dato: p.fraOgMed,
                antallTimerPlanlagt: antallTimerPlanlagtTime,
                antallTimerBorte: antallTimerBorteTime,
                aktivitetFravær: p.aktivitetFravær,
                årsak: 'ORDINÆRT_FRAVÆR',
            };
        }
    }
    return null;
};

export const outNull = (
    maybeUtbetalingsperiodeDag: UtbetalingsperiodeDag | null,
): maybeUtbetalingsperiodeDag is UtbetalingsperiodeDag => maybeUtbetalingsperiodeDag !== null;

const getFraværAktivitetString = (aktivitetFravær: ApiAktivitet[], intl: IntlShape) => {
    return aktivitetFravær.length === 2
        ? intlHelper(intl, `step.oppsummering.fravær.aktivitet.2`, {
              aktivitet1: intlHelper(intl, `aktivitetFravær.${aktivitetFravær[0]}`),
              aktivitet2: intlHelper(intl, `aktivitetFravær.${aktivitetFravær[1]}`),
          })
        : intlHelper(intl, `step.oppsummering.fravær.aktivitet.1`, {
              aktivitet: intlHelper(intl, `aktivitetFravær.${aktivitetFravær[0]}`),
          });
};

const renderEnkeltdagElement = (date: Date): JSX.Element => (
    <div>
        <span style={{ textTransform: 'capitalize' }}>{dayjs(date).format('dddd')}</span> {prettifyDate(date)}
    </div>
);

const renderFraværAktivitetElement = (
    aktivitet: ApiAktivitet[],
    visAktivitet: boolean,
    intl: IntlShape,
): JSX.Element | null => (visAktivitet ? <div>{getFraværAktivitetString(aktivitet, intl)}</div> : null);

export const renderUtbetalingsperiodeDag = (
    dag: UtbetalingsperiodeDag,
    visAktivitet: boolean,
    intl: IntlShape,
): JSX.Element => {
    const antallTimerSkulleJobbet = `${timeToDecimalTime(dag.antallTimerPlanlagt)} ${timeText(
        `${timeToDecimalTime(dag.antallTimerPlanlagt)}`,
    )}`;
    const antallTimerBorteFraJobb = `${timeToDecimalTime(dag.antallTimerBorte)} ${timeText(
        `${timeToDecimalTime(dag.antallTimerBorte)}`,
    )}`;
    return (
        <div style={{ marginBottom: '.5rem' }}>
            {renderEnkeltdagElement(ISODateToDate(dag.dato))}
            Skulle jobbet {antallTimerSkulleJobbet}. Borte fra jobb {antallTimerBorteFraJobb}.
            {renderFraværAktivitetElement(dag.aktivitetFravær, visAktivitet, intl)}
        </div>
    );
};

const renderUtbetalingsperiode = (
    periode: UtbetalingsperiodeApi,
    visAktivitet: boolean,
    intl: IntlShape,
): JSX.Element => {
    const fom = ISODateToDate(periode.fraOgMed);
    const tom = ISODateToDate(periode.tilOgMed);

    return (
        <div style={{ marginBottom: '.5rem' }}>
            {periode.fraOgMed === periode.tilOgMed ? (
                <div>
                    {renderEnkeltdagElement(fom)}
                    {renderFraværAktivitetElement(periode.aktivitetFravær, visAktivitet, intl)}
                </div>
            ) : (
                <div>
                    Fra og med {prettifyDate(fom)}, til og med {prettifyDate(tom)}
                    {renderFraværAktivitetElement(periode.aktivitetFravær, visAktivitet, intl)}
                </div>
            )}
        </div>
    );
};

const harFlereFraværAktiviteter = (perioder: UtbetalingsperiodeApi[]) => {
    return uniq(flatten(perioder.map((p) => p.aktivitetFravær))).length > 1;
};

const UtbetalingsperioderOppsummering: React.FunctionComponent<Props> = ({ utbetalingsperioder = [] }) => {
    const perioder: UtbetalingsperiodeApi[] = utbetalingsperioder.filter(
        (p) => p.tilOgMed !== undefined && p.antallTimerBorte === null,
    );
    const intl = useIntl();
    const dager: UtbetalingsperiodeDag[] = utbetalingsperioder.map(toMaybeUtbetalingsperiodeDag).filter(outNull);
    const visAktivitetInfo = harFlereFraværAktiviteter(utbetalingsperioder);

    return (
        <>
            {perioder.length > 0 && (
                <SummaryBlock header={'Hele dager med fravær'}>
                    <SummaryList
                        items={perioder}
                        itemRenderer={(periode) => renderUtbetalingsperiode(periode, visAktivitetInfo, intl)}
                    />
                </SummaryBlock>
            )}
            {dager.length > 0 && (
                <SummaryBlock header={'Dager med delvis fravær'}>
                    <SummaryList
                        items={dager}
                        itemRenderer={(dag: UtbetalingsperiodeDag) =>
                            renderUtbetalingsperiodeDag(dag, visAktivitetInfo, intl)
                        }
                    />
                </SummaryBlock>
            )}
        </>
    );
};

export default UtbetalingsperioderOppsummering;
