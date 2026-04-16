import { ISODateRangeToDateRange, ISODateToDate } from '@navikt/sif-common-utils';
import { vi } from 'vitest';

import { GjentagelseType } from '../TidEnkeltdagForm';
import { getDagerMedNyTid } from '../utils/tidEnkeltdagUtils';

vi.mock('@navikt/sif-common-env', () => {
    return {
        getRequiredEnv: () => '',
        getCommonEnv: () => ({}),
        getMaybeEnv: () => '',
        getSifInnsynBrowserEnv: () => ({}),
    };
});

describe('tidEnkeltdagUtils', () => {
    describe('getDagerMedNyTid', () => {
        it('velger to dager når gjentagelse er to faste dager innenfor en periode på to uker', () => {
            const result = getDagerMedNyTid(
                ISODateRangeToDateRange('2022-01-13/2022-01-20'),
                ISODateRangeToDateRange('2022-01-13/2022-01-20'),
                ISODateToDate('2022-01-13'),
                { hours: '5', minutes: '0' },
                { gjentagelsetype: GjentagelseType.sammeDagUtMånedFom },
            );
            expect(Object.keys(result).length).toBe(2);
            expect(result['2022-01-13'].hours).toEqual('5');
            expect(result['2022-01-13'].minutes).toEqual('0');
            expect(result['2022-01-20'].hours).toEqual('5');
            expect(result['2022-01-20'].minutes).toEqual('0');
        });

        it('bruker valgt dato som start for gjentakelse i søknadsperioden', () => {
            const result = getDagerMedNyTid(
                ISODateRangeToDateRange('2022-01-01/2022-01-31'),
                ISODateRangeToDateRange('2022-01-10/2022-01-31'),
                ISODateToDate('2022-01-13'),
                { hours: '5', minutes: '0' },
                { gjentagelsetype: GjentagelseType.sammeDagUtMånedFom },
            );

            expect(Object.keys(result)).toEqual(['2022-01-13', '2022-01-20', '2022-01-27']);
        });

        it('bruker søknadsperioden som filter for lik dag i hele søknadsperioden', () => {
            const result = getDagerMedNyTid(
                ISODateRangeToDateRange('2022-01-13/2022-02-10'),
                ISODateRangeToDateRange('2022-01-13/2022-01-20'),
                ISODateToDate('2022-01-13'),
                { hours: '5', minutes: '0' },
                { gjentagelsetype: GjentagelseType.sammeDagUtSøknadsperiodenFom },
            );

            expect(Object.keys(result)).toEqual(['2022-01-13', '2022-01-20', '2022-01-27', '2022-02-03', '2022-02-10']);
        });

        it('bruker søknadsperioden som filter for alle dager ut søknadsperioden', () => {
            const result = getDagerMedNyTid(
                ISODateRangeToDateRange('2022-01-13/2022-01-19'),
                ISODateRangeToDateRange('2022-01-13/2022-01-14'),
                ISODateToDate('2022-01-13'),
                { hours: '5', minutes: '0' },
                { gjentagelsetype: GjentagelseType.alleDagerUtSøknadsperioden },
            );

            expect(Object.keys(result)).toEqual(['2022-01-13', '2022-01-14', '2022-01-17', '2022-01-18', '2022-01-19']);
        });

        it('bruker hele endringsperioden i måneden når hele måneden er valgt', () => {
            const result = getDagerMedNyTid(
                ISODateRangeToDateRange('2022-01-01/2022-02-28'),
                ISODateRangeToDateRange('2022-01-10/2022-01-20'),
                ISODateToDate('2022-01-13'),
                { hours: '5', minutes: '0' },
                { gjentagelsetype: GjentagelseType.heleMåneden },
            );

            expect(Object.keys(result)).toEqual([
                '2022-01-10',
                '2022-01-11',
                '2022-01-12',
                '2022-01-13',
                '2022-01-14',
                '2022-01-17',
                '2022-01-18',
                '2022-01-19',
                '2022-01-20',
            ]);
        });
    });
});
