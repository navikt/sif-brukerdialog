import { vi } from 'vitest';
import { dateRangeToISODateRange, ISODateRangeToDateRange } from '@navikt/sif-common-utils';
import { begrensPeriodeTilPeriodeEnSkalOppgiTimerFor } from '../arbeidstidStepUtils';

vi.mock('@navikt/sif-common-env', () => {
    return {
        getRequiredEnv: () => 'mockedApiUrl',
        getMaybeEnv: () => 'mockedApiUrl',
        getCommonEnv: () => ({}),
        getK9SakInnsynEnv: () => ({}),
    };
});

describe('arbeidstidStepUtils', () => {
    describe('begrensPeriodeTilPeriodEnSkalOppgiTimerFor', () => {
        const periodeFomLørdagInneIMåned = '2024-11-16/2024-12-10';
        const periodeFomMandagInneIMåned = '2024-11-18/2024-12-10';
        const periodeFomFredag = '2024-11-29/2024-12-10';
        const periodeFomLørdag = '2024-11-30/2024-12-10';
        const periodeFomSøndag = '2024-12-01/2024-12-10';
        const periodeFomMandag = '2024-12-02/2024-12-10';

        it('beholder hele periode hvis den starter på en fredag', () => {
            const resultat = begrensPeriodeTilPeriodeEnSkalOppgiTimerFor(ISODateRangeToDateRange(periodeFomFredag));
            expect(dateRangeToISODateRange(resultat)).toEqual(periodeFomFredag);
        });
        it('beholder hele periode hvis den starter på en fredag', () => {
            const resultat = begrensPeriodeTilPeriodeEnSkalOppgiTimerFor(
                ISODateRangeToDateRange(periodeFomLørdagInneIMåned),
            );
            expect(dateRangeToISODateRange(resultat)).toEqual(periodeFomMandagInneIMåned);
        });
        it('justerer periode til å starte på påfølgende mandag hvis den starter på en lørdag', () => {
            const resultat = begrensPeriodeTilPeriodeEnSkalOppgiTimerFor(ISODateRangeToDateRange(periodeFomLørdag));
            expect(dateRangeToISODateRange(resultat)).toEqual(periodeFomMandag);
        });
        it('justerer periode til å starte på påfølgende mandag hvis den starter på en søndag', () => {
            const resultat = begrensPeriodeTilPeriodeEnSkalOppgiTimerFor(ISODateRangeToDateRange(periodeFomSøndag));
            expect(dateRangeToISODateRange(resultat)).toEqual(periodeFomMandag);
        });
    });
});
