import React from 'react';
import { DateRange, dateToISOString } from '@navikt/sif-common-formik-ds';
import { Weekday } from '@navikt/sif-common-utils';
import dayjs from 'dayjs';
import { groupBy } from 'lodash';
import { Daginfo, Ukeinfo } from '../../types';

const getEmptyElements = (num: number): JSX.Element[] | undefined => {
    return num === 0
        ? undefined
        : Array.from({ length: num }).map((_, index) => React.createElement('span', { key: index }));
};

const getWeekdayFromISOWeekday = (isoWeekday: number) => {
    switch (isoWeekday) {
        case 1:
            return Weekday.monday;
        case 2:
            return Weekday.tuesday;
        case 3:
            return Weekday.wednesday;
        case 4:
            return Weekday.thursday;
        case 5:
            return Weekday.friday;
        default:
            return undefined;
    }
};

const getDagInfo = (date: Date): Daginfo => {
    const dayjsDato = dayjs(date);
    return {
        isoDate: dateToISOString(dayjsDato.toDate()),
        dato: dayjsDato.toDate(),
        ukedag: dayjsDato.isoWeekday(),
        ukenummer: dayjsDato.isoWeek(),
        år: dayjsDato.year(),
        årOgUke: `${dayjsDato.year()}.${dayjsDato.isoWeek()}`,
        labelDag: `${dayjsDato.format('dddd')}`,
        labelDato: `${dayjsDato.format('DD.MM.YYYY')}`,
        labelFull: `${dayjsDato.format('dddd')} ${dayjsDato.format('D. MMMM')}`,
        weekday: getWeekdayFromISOWeekday(dayjsDato.isoWeekday()),
    };
};

const getDagInfoForPeriode = ({ from, to }: DateRange): Daginfo[] => {
    const dager: Daginfo[] = [];
    let dayjsDato = dayjs(from);
    while (dayjsDato.isSameOrBefore(to, 'day')) {
        const ukedag = dayjsDato.isoWeekday();
        if (ukedag <= 5) {
            dager.push(getDagInfo(dayjsDato.toDate()));
        }
        dayjsDato = dayjsDato.add(1, 'day');
    }
    return dager;
};

const getUkerFraDager = (dager: Daginfo[]): Ukeinfo[] => {
    const ukerOgDager = groupBy(dager, (dag) => dag.årOgUke);
    const uker = Object.keys(ukerOgDager).map((key): Ukeinfo => {
        const dagerIUke = ukerOgDager[key];
        return { år: dagerIUke[0].år, ukenummer: dagerIUke[0].ukenummer, dager: dagerIUke };
    });
    return uker;
};

const getTidKalenderFieldName = (fieldName: string, dag: Daginfo): string => `${fieldName}.${dag.isoDate}`;

const getForegåendeDagerIUke = (dag: Daginfo): Daginfo[] => {
    const dager = getEmptyElements(dag.ukedag - 1);
    if (dager && dager.length > 0) {
        const firstDayOfWeek = dayjs(dag.dato).subtract(dag.ukedag - 1, 'days');
        return dager.map((_c, idx) => {
            const date = firstDayOfWeek.add(idx, 'days').toDate();
            return getDagInfo(date);
        });
    }
    return [];
};

export const tidUkerInputUtils = {
    getDagInfo,
    getDagInfoForPeriode,
    getTidKalenderFieldName,
    getForegåendeDagerIUke,
    getUkerFraDager,
};
