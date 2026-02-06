import AriaAlternative from '@navikt/sif-common-core-ds/src/atoms/aria-alternative/AriaAlternative';
import { DateRange, InputTime } from '@navikt/sif-common-formik-ds';
import { DateDurationMap, dateToISODate, Duration, ensureDuration } from '@navikt/sif-common-utils';
import dayjs from 'dayjs';
import React from 'react';

import CalendarGrid from '../calendar-grid/CalendarGrid';
import TidsbrukKalenderDag, { TidsbrukKalenderDagFooterRenderer } from './TidsbrukKalenderDag';

export type TidRenderer = (tid: { tid: InputTime; dato: Date; prosent?: number }) => React.ReactNode;

type KalenderDag = {
    tid?: Partial<InputTime>;
    prosent?: number;
    tidOpprinnelig?: Duration;
};

type Kalenderdager = {
    [dato: string]: KalenderDag;
};
interface Props {
    måned: DateRange;
    dagerMedTid: DateDurationMap;
    dagerMedTidOpprinnelig?: DateDurationMap;
    utilgjengeligeDatoer?: Date[];
    utilgjengeligDagInfo?: string;
    skjulTommeDagerIListe?: boolean;
    visOpprinneligTid?: boolean;
    skjulUkerMedKunUtilgjengeligeDager?: boolean;
    onDateClick?: (date: Date) => void;
    tomUkeContentRenderer?: () => React.ReactNode;
    tidRenderer?: TidRenderer;
    opprinneligTidRenderer?: TidRenderer;
    footerRenderer?: TidsbrukKalenderDagFooterRenderer;
}

const TidsbrukKalender = ({
    måned,
    dagerMedTid,
    dagerMedTidOpprinnelig = {},
    utilgjengeligeDatoer,
    utilgjengeligDagInfo,
    skjulTommeDagerIListe,
    visOpprinneligTid,
    skjulUkerMedKunUtilgjengeligeDager,
    onDateClick,
    tidRenderer,
    opprinneligTidRenderer,
    tomUkeContentRenderer,
    footerRenderer,
}: Props) => {
    const kalenderdager: Kalenderdager = {};
    Object.keys(dagerMedTid).forEach((key) => {
        const dag = dagerMedTid[key];
        kalenderdager[key] = {
            ...kalenderdager[key],
            tid: {
                hours: dag.hours,
                minutes: dag.minutes,
            },
            prosent: dag.percentage,
        };
    });

    Object.keys(dagerMedTidOpprinnelig).forEach((key) => {
        kalenderdager[key] = {
            ...kalenderdager[key],
            // tidOpprinnelig: ensureDuration(dagerMedTidOpprinnelig[key]),
            tidOpprinnelig: dagerMedTidOpprinnelig[key],
            prosent: (dagerMedTidOpprinnelig as any)[key].prosent,
        };
    });

    return (
        <CalendarGrid
            month={måned}
            disabledDates={utilgjengeligeDatoer}
            disabledDateInfo={utilgjengeligDagInfo}
            hideEmptyContentInListMode={skjulTommeDagerIListe}
            hideWeeksWithOnlyDisabledContent={skjulUkerMedKunUtilgjengeligeDager}
            onDateClick={onDateClick}
            allDaysInWeekDisabledContentRenderer={tomUkeContentRenderer}
            dateRendererShort={(date: Date) => (
                <AriaAlternative
                    visibleText={dayjs(date).format('D.')}
                    ariaText={dayjs(date).format('dddd DD. MMM YYYY')}
                />
            )}
            dateContentRenderer={(dato: any) => {
                const dag = kalenderdager[dateToISODate(dato)];
                console.log(dag);
                return dag ? (
                    <TidsbrukKalenderDag
                        dato={dato}
                        tid={dag.tid ? ensureDuration(dag.tid) : undefined}
                        prosent={dag.prosent}
                        tidRenderer={tidRenderer}
                        opprinneligTidRenderer={opprinneligTidRenderer}
                        tidOpprinnelig={dag.tidOpprinnelig}
                        visOpprinneligTid={visOpprinneligTid}
                        footerRenderer={footerRenderer}
                    />
                ) : (
                    <span />
                );
            }}
        />
    );
};

export default TidsbrukKalender;
