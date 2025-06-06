import { FormSummary } from '@navikt/ds-react';
import React, { ReactElement } from 'react';
import { SummaryList } from '@navikt/sif-common-ui';
import { iso8601DurationToTime, ISODateToDate, prettifyDate, Time, timeToDecimalTime } from '@navikt/sif-common-utils';
import dayjs from 'dayjs';
import flatten from 'lodash/flatten';
import uniq from 'lodash/uniq';
import { AppIntlShape, AppText, useAppIntl } from '../../../../i18n';
import { ApiAktivitet } from '../../../../types/AktivitetFravær';
import { UtbetalingsperiodeApi } from '../../../../types/søknadApiData/SøknadApiData';

export interface Props {
    utbetalingsperioder: UtbetalingsperiodeApi[];
}

const timeText = (timer: string, { text }: AppIntlShape): string =>
    timer === '0' || timer === '0.5' || timer === '1' ? text('time') : text('timer');

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

const getFraværAktivitetString = (aktivitetFravær: ApiAktivitet[], { text }: AppIntlShape) => {
    return aktivitetFravær.length === 2
        ? text(`step.oppsummering.fravær.aktivitet.2`, {
              aktivitet1: text(`aktivitetFravær.${aktivitetFravær[0]}`),
              aktivitet2: text(`aktivitetFravær.${aktivitetFravær[1]}`),
          })
        : text(`step.oppsummering.fravær.aktivitet.1`, {
              aktivitet: text(`aktivitetFravær.${aktivitetFravær[0]}`),
          });
};

const renderEnkeltdagElement = (date: Date): ReactElement => (
    <div>
        <span style={{ textTransform: 'capitalize' }}>{dayjs(date).format('dddd')}</span> {prettifyDate(date)}
    </div>
);

const renderFraværAktivitetElement = (
    aktivitet: ApiAktivitet[],
    visAktivitet: boolean,
    appIntl: AppIntlShape,
): ReactElement | null => (visAktivitet ? <div>{getFraværAktivitetString(aktivitet, appIntl)}</div> : null);

export const renderUtbetalingsperiodeDag = (
    dag: UtbetalingsperiodeDag,
    visAktivitet: boolean,
    appIntl: AppIntlShape,
): ReactElement => {
    const antallTimerSkulleJobbet = `${timeToDecimalTime(dag.antallTimerPlanlagt)} ${timeText(
        `${timeToDecimalTime(dag.antallTimerPlanlagt)}`,
        appIntl,
    )}`;
    const antallTimerBorteFraJobb = `${timeToDecimalTime(dag.antallTimerBorte)} ${timeText(
        `${timeToDecimalTime(dag.antallTimerBorte)}`,
        appIntl,
    )}`;
    return (
        <div style={{ marginBottom: '.5rem' }}>
            {renderEnkeltdagElement(ISODateToDate(dag.dato))}
            Skulle jobbet {antallTimerSkulleJobbet}. Borte fra jobb {antallTimerBorteFraJobb}.
            {renderFraværAktivitetElement(dag.aktivitetFravær, visAktivitet, appIntl)}
        </div>
    );
};

const renderUtbetalingsperiode = (
    periode: UtbetalingsperiodeApi,
    visAktivitet: boolean,
    appIntl: AppIntlShape,
): ReactElement => {
    const fom = ISODateToDate(periode.fraOgMed);
    const tom = ISODateToDate(periode.tilOgMed);

    return (
        <div style={{ marginBottom: '.5rem' }}>
            {periode.fraOgMed === periode.tilOgMed ? (
                <div>
                    {renderEnkeltdagElement(fom)}
                    {renderFraværAktivitetElement(periode.aktivitetFravær, visAktivitet, appIntl)}
                </div>
            ) : (
                <div>
                    Fra og med {prettifyDate(fom)}, til og med {prettifyDate(tom)}
                    {renderFraværAktivitetElement(periode.aktivitetFravær, visAktivitet, appIntl)}
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
    const appIntl = useAppIntl();
    const dager: UtbetalingsperiodeDag[] = utbetalingsperioder.map(toMaybeUtbetalingsperiodeDag).filter(outNull);
    const visAktivitetInfo = harFlereFraværAktiviteter(utbetalingsperioder);

    return (
        <>
            {perioder.length > 0 && (
                <FormSummary.Answer>
                    <FormSummary.Label>
                        <AppText id="step.oppsummering.utbetalinger.heleDager" />
                    </FormSummary.Label>
                    <FormSummary.Value>
                        <SummaryList
                            useAkselList={true}
                            items={perioder}
                            itemRenderer={(periode) => renderUtbetalingsperiode(periode, visAktivitetInfo, appIntl)}
                        />
                    </FormSummary.Value>
                </FormSummary.Answer>
            )}
            {dager.length > 0 && (
                <FormSummary.Answer>
                    <FormSummary.Label>
                        <AppText id="step.oppsummering.utbetalinger.delvisDager" />
                    </FormSummary.Label>
                    <FormSummary.Value>
                        <SummaryList
                            useAkselList={true}
                            items={dager}
                            itemRenderer={(dag: UtbetalingsperiodeDag) =>
                                renderUtbetalingsperiodeDag(dag, visAktivitetInfo, appIntl)
                            }
                        />
                    </FormSummary.Value>
                </FormSummary.Answer>
            )}
        </>
    );
};

export default UtbetalingsperioderOppsummering;
