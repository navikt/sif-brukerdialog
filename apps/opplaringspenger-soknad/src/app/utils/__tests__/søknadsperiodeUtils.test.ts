import { getTillattSøknadsperiode } from '../søknadsperiodeUtils';
import { vi, expect } from 'vitest';
import { dateRangeToISODateRange, ISODateRange, ISODateToDate } from '@navikt/sif-common-utils';

vi.mock(import('@navikt/sif-common-utils'), async (importOriginal) => {
    const actual = await importOriginal();
    return {
        ...actual,
        getDateToday: () => new Date('2021-01-05'),
    };
});

describe('søknadsperiodeUtils', () => {
    describe('getTillattSøknadsperiode', () => {
        const defaultSøknadsperiode: ISODateRange = '2018-01-01/2022-01-31';
        it('returnerer default søknadsperiode når en ikke har informasjon om barnets fødselsdato', () => {
            const søknadsperiode = getTillattSøknadsperiode();
            expect(dateRangeToISODateRange(søknadsperiode)).toEqual(defaultSøknadsperiode);
        });
        it('avgrenser fra-dato til barnets fødselsdato når vi har det', () => {
            const søknadsperiode = getTillattSøknadsperiode(ISODateToDate('2020-05-15'));
            expect(dateRangeToISODateRange(søknadsperiode)).toEqual('2020-05-15/2022-01-31');
        });
        it('returnerer default søknadsperiode hvis barnet er født før default fra-dato', () => {
            const søknadsperiode = getTillattSøknadsperiode(ISODateToDate('2017-12-31'));
            expect(dateRangeToISODateRange(søknadsperiode)).toEqual(defaultSøknadsperiode);
        });
    });
});
