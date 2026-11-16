import { ISODateRangeToDateRange, ISODateToDate } from '@navikt/sif-common-utils';
import { vi } from 'vitest';

import { GjentagelseType } from '../TidEnkeltdagForm';
import { getDagerMedNyTid, getGjentagendeDager } from '../utils/tidEnkeltdagUtils';

vi.mock('@sif/env', () => {
    return {
        getRequiredEnv: () => '',
        getCommonEnv: () => ({}),
        getMaybeEnv: () => '',
        getSifInnsynBrowserEnv: () => ({}),
        getK9SakInnsynEnv: () => ({}),
    };
});

describe('tidEnkeltdagUtils', () => {
    describe('getGjentagendeDager', () => {
        const søknadsperiode = ISODateRangeToDateRange('2022-01-01/2022-02-28');
        const endringsperiodeIMåned = ISODateRangeToDateRange('2022-01-10/2022-01-31');
        const dato = ISODateToDate('2022-01-13'); // torsdag

        it('returnerer kun valgt dato når ingen gjentagelse', () => {
            const result = getGjentagendeDager(søknadsperiode, endringsperiodeIMåned, dato, undefined);
            expect(result).toEqual(['2022-01-13']);
        });

        it('sammeDagUtMånedFom - gjentar samme ukedag fra dato til endringsperiode.to', () => {
            const result = getGjentagendeDager(søknadsperiode, endringsperiodeIMåned, dato, {
                gjentagelsetype: GjentagelseType.sammeDagUtMånedFom,
            });
            expect(result).toEqual(['2022-01-13', '2022-01-20', '2022-01-27']);
        });

        it('sammeDagUtSøknadsperiodenFom - gjentar samme ukedag fra dato til søknadsperiode.to', () => {
            const result = getGjentagendeDager(søknadsperiode, endringsperiodeIMåned, dato, {
                gjentagelsetype: GjentagelseType.sammeDagUtSøknadsperiodenFom,
            });
            expect(result).toEqual([
                '2022-01-13',
                '2022-01-20',
                '2022-01-27',
                '2022-02-03',
                '2022-02-10',
                '2022-02-17',
                '2022-02-24',
            ]);
        });

        it('heleUken - returnerer alle ukedager i uken til valgt dato', () => {
            const result = getGjentagendeDager(søknadsperiode, endringsperiodeIMåned, dato, {
                gjentagelsetype: GjentagelseType.heleUken,
            });
            expect(result).toEqual(['2022-01-10', '2022-01-11', '2022-01-12', '2022-01-13', '2022-01-14']);
        });

        it('heleUken - inkluderer dager i neste måned når uken går over to måneder', () => {
            const result = getGjentagendeDager(søknadsperiode, endringsperiodeIMåned, ISODateToDate('2022-01-31'), {
                gjentagelsetype: GjentagelseType.heleUken,
            });
            expect(result).toEqual(['2022-01-31', '2022-02-01', '2022-02-02', '2022-02-03', '2022-02-04']);
        });

        it('heleUken - inkluderer dager i forrige måned når uken går over to måneder', () => {
            const result = getGjentagendeDager(
                søknadsperiode,
                ISODateRangeToDateRange('2022-02-01/2022-02-28'),
                ISODateToDate('2022-02-02'),
                { gjentagelsetype: GjentagelseType.heleUken },
            );
            expect(result).toEqual(['2022-01-31', '2022-02-01', '2022-02-02', '2022-02-03', '2022-02-04']);
        });

        it('heleUken - avgrenses til søknadsperioden', () => {
            const result = getGjentagendeDager(
                ISODateRangeToDateRange('2022-01-12/2022-02-01'),
                ISODateRangeToDateRange('2022-01-12/2022-01-31'),
                ISODateToDate('2022-01-13'),
                { gjentagelsetype: GjentagelseType.heleUken },
            );
            expect(result).toEqual(['2022-01-12', '2022-01-13', '2022-01-14']);

            const resultSlutt = getGjentagendeDager(
                ISODateRangeToDateRange('2022-01-12/2022-02-01'),
                ISODateRangeToDateRange('2022-01-12/2022-01-31'),
                ISODateToDate('2022-01-31'),
                { gjentagelsetype: GjentagelseType.heleUken },
            );
            expect(resultSlutt).toEqual(['2022-01-31', '2022-02-01']);
        });

        it('heleMåneden - returnerer alle ukedager i endringsperioden', () => {
            const result = getGjentagendeDager(søknadsperiode, endringsperiodeIMåned, dato, {
                gjentagelsetype: GjentagelseType.heleMåneden,
            });
            expect(result).toEqual([
                '2022-01-10',
                '2022-01-11',
                '2022-01-12',
                '2022-01-13',
                '2022-01-14',
                '2022-01-17',
                '2022-01-18',
                '2022-01-19',
                '2022-01-20',
                '2022-01-21',
                '2022-01-24',
                '2022-01-25',
                '2022-01-26',
                '2022-01-27',
                '2022-01-28',
                '2022-01-31',
            ]);
        });

        it('alleDagerUtSøknadsperioden - returnerer alle ukedager fra dato til søknadsperiode.to', () => {
            const result = getGjentagendeDager(søknadsperiode, endringsperiodeIMåned, dato, {
                gjentagelsetype: GjentagelseType.alleDagerUtSøknadsperioden,
            });
            expect(result[0]).toEqual('2022-01-13');
            expect(result[result.length - 1]).toEqual('2022-02-28');
            expect(result.every((d) => [1, 2, 3, 4, 5].includes(new Date(d).getDay()))).toBe(true);
        });
    });

    describe('getDagerMedNyTid', () => {
        it('setter varighet på alle returnerte dager', () => {
            const result = getDagerMedNyTid(
                ISODateRangeToDateRange('2022-01-13/2022-01-20'),
                ISODateRangeToDateRange('2022-01-13/2022-01-20'),
                ISODateToDate('2022-01-13'),
                { hours: '5', minutes: '0' },
                { gjentagelsetype: GjentagelseType.sammeDagUtMånedFom },
            );
            expect(Object.keys(result)).toEqual(['2022-01-13', '2022-01-20']);
            expect(result['2022-01-13']).toEqual({ hours: '5', minutes: '0' });
            expect(result['2022-01-20']).toEqual({ hours: '5', minutes: '0' });
        });

        it('inkluderer alltid valgt dato selv uten gjentagelse', () => {
            const result = getDagerMedNyTid(
                ISODateRangeToDateRange('2022-01-01/2022-01-31'),
                ISODateRangeToDateRange('2022-01-10/2022-01-20'),
                ISODateToDate('2022-01-13'),
                { hours: '3', minutes: '30' },
            );
            expect(Object.keys(result)).toEqual(['2022-01-13']);
            expect(result['2022-01-13']).toEqual({ hours: '3', minutes: '30' });
        });
    });
});
