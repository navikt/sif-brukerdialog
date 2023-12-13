import { Heading } from '@navikt/ds-react';
import React from 'react';
import { useIntl } from 'react-intl';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import bemUtils from '@navikt/sif-common-core-ds/src/utils/bemUtils';
import { FormikInputGroup, FormikTimeInput, TestProps, ValidationError } from '@navikt/sif-common-formik-ds';
import {
    dateFormatter,
    decimalDurationToDuration,
    Duration,
    durationToDecimalDuration,
    DurationWeekdays,
    isDateInDates,
    isDateInWeekdays,
    summarizeDurationInDurationWeekdays,
    Weekday,
} from '@navikt/sif-common-utils';
import LabelInputInfoLayout from '../../common/label-input-info-layout/LabelInputInfoLayout';
import TimerOgMinutter, { formatTimerOgMinutter } from '../../common/timer-og-minutter/TimerOgMinutter';
import { Daginfo, Ukeinfo } from '../../types';
import './arbeidstidUkeInput.less';

export type ArbeidstidUkeInputEnkeltdagValidator = (dato: Date) => (value: Duration) => ValidationError | undefined;

export interface ArbeidstidUkeTekster {
    dag: React.ReactNode;
    jobber: React.ReactNode;
    fravær: React.ReactNode;
    ariaLabelTidInput: (dato: string) => React.ReactNode;
}
interface OwnProps {
    ukeinfo: Ukeinfo;
    visUkeTittel?: boolean;
    getFieldName: (dag: Daginfo) => string;
    getDagValue: (dag: Daginfo) => Duration | undefined;
    beregnFravær?: boolean;
    utilgjengeligeDatoer?: Date[];
    utilgjengeligeUkedager?: Weekday[];
    tekst: ArbeidstidUkeTekster;
    normalarbeidstidUkedager?: DurationWeekdays;
    enkeltdagValidator?: ArbeidstidUkeInputEnkeltdagValidator;
}

type Props = OwnProps & TestProps;

const bem = bemUtils('arbeidstidUkeInput');

const ArbeidOgFraværOppsummering = ({
    timerNormaltPerUke,
    timerRegistrertIUke,
}: {
    timerNormaltPerUke: number;
    timerRegistrertIUke: number;
}) => {
    const intl = useIntl();
    const durationNormalt = decimalDurationToDuration(timerNormaltPerUke);

    const durationRegistrert = decimalDurationToDuration(timerRegistrertIUke);
    const durationFravær = decimalDurationToDuration(timerNormaltPerUke - timerRegistrertIUke);

    if (timerRegistrertIUke === 0) {
        return <>Ingen arbeidstid registrert</>;
    }

    return (
        <>
            {formatTimerOgMinutter(intl, durationRegistrert)} av normalt {formatTimerOgMinutter(intl, durationNormalt)}{' '}
            registrert ({formatTimerOgMinutter(intl, durationFravær)} fravær)
        </>
    );
};

const renderFraværInfo = (fravær: Duration | undefined, arbeidstid: Duration | undefined) => {
    const heltFravær = fravær ? durationToDecimalDuration(fravær) === 0 : false;
    if (fravær) {
        return (
            <>
                {arbeidstid && (
                    <span className="sr-only">
                        <TimerOgMinutter timer={arbeidstid.hours} minutter={arbeidstid.minutes} /> med jobb gir{' '}
                    </span>
                )}
                {!heltFravær && (
                    <>
                        <TimerOgMinutter timer={fravær.hours} minutter={fravær.minutes} /> fravær
                    </>
                )}
                {heltFravær && <>Fullt fravær</>}
            </>
        );
    }

    return undefined;
};

const ArbeidstidUkeInput: React.FunctionComponent<Props> = ({
    ukeinfo,
    utilgjengeligeDatoer,
    utilgjengeligeUkedager,
    normalarbeidstidUkedager,
    visUkeTittel,
    getFieldName,
    getDagValue,
    enkeltdagValidator,
    tekst,
    beregnFravær,
    'data-testid': testId,
}) => {
    const { dager } = ukeinfo;

    const timerNormaltPerUke = normalarbeidstidUkedager
        ? durationToDecimalDuration(summarizeDurationInDurationWeekdays(normalarbeidstidUkedager))
        : undefined;

    const timerRegistrertIUke = dager
        .map((dag) => {
            const timerPåDag = dag.weekday ? getDagValue(dag) : undefined;
            return timerPåDag ? durationToDecimalDuration(timerPåDag) : 0;
        })
        .reduce((d, n) => d + n);

    return (
        <div className={bem.block}>
            {visUkeTittel && (
                <Heading level="3" size="small" className={bem.element('tittel')}>
                    {getUkeTittel(ukeinfo)}
                </Heading>
            )}
            <div className={bem.element('uke__ukedager')}>
                {dager.map((dag) => {
                    const erUtilgjengeligDato = isDateInDates(dag.dato, utilgjengeligeDatoer);
                    const erUtilgjengeligUkedag = utilgjengeligeUkedager
                        ? isDateInWeekdays(dag.dato, utilgjengeligeUkedager)
                        : false;
                    if (erUtilgjengeligDato || erUtilgjengeligUkedag) {
                        return null;
                    }
                    const dayDateString = inputDatoLabel(dag.dato);
                    const normalarbeidstid =
                        normalarbeidstidUkedager && dag.weekday ? normalarbeidstidUkedager[dag.weekday] : undefined;

                    const value = getDagValue(dag);
                    const fravær =
                        beregnFravær && value && normalarbeidstid
                            ? decimalDurationToDuration(
                                  durationToDecimalDuration(normalarbeidstid) - durationToDecimalDuration(value),
                              )
                            : normalarbeidstid;

                    return (
                        <FormikInputGroup
                            key={dag.isoDate}
                            legend={<span className="sr-only">{dayDateString}</span>}
                            name={`arbeidstid_${dag.isoDate}`}
                            className={bem.element('dag', erUtilgjengeligDato ? 'utilgjengelig' : undefined)}>
                            <LabelInputInfoLayout
                                narrowBreakpoint={860}
                                label={
                                    <div role="presentation" aria-hidden="true" className={bem.element('dagnavn')}>
                                        {dayDateString}
                                    </div>
                                }
                                input={
                                    <FormikTimeInput
                                        aria-describedby="iPerioden"
                                        name={getFieldName(dag)}
                                        label={tekst.ariaLabelTidInput(dayDateString)}
                                        timeInputLayout={{
                                            direction: 'horizontal',
                                        }}
                                        data-testid={`${testId}__dag.isoDate`}
                                        validate={enkeltdagValidator ? enkeltdagValidator(dag.dato) : undefined}
                                    />
                                }
                                info={beregnFravær ? renderFraværInfo(fravær, value) : undefined}
                            />
                        </FormikInputGroup>
                    );
                })}
            </div>
            {1 + 1 === 3 && timerNormaltPerUke !== undefined && timerRegistrertIUke !== undefined && (
                <Block margin="s" padBottom="s">
                    <ArbeidOgFraværOppsummering
                        timerNormaltPerUke={timerNormaltPerUke}
                        timerRegistrertIUke={timerRegistrertIUke}
                    />
                </Block>
            )}
        </div>
    );
};

const inputDatoLabel = (date: Date): string => dateFormatter.dayDateShortMonth(date);

export const getUkeTittel = ({ ukenummer, år }: Ukeinfo): string => {
    return `Uke ${ukenummer}, ${år}`;
};

export default ArbeidstidUkeInput;
