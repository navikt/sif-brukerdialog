import { vi } from 'vitest';
import { DateRange, ISODateRangeToDateRange } from '@navikt/sif-common-utils';
import { kanBrukerRapportereInntektForPeriode } from './apiPolyfillUtils';

vi.mock('@navikt/sif-common-env', () => {
    return {
        getRequiredEnv: () => '',
        getMaybeEnv: () => '',
        getCommonEnv: () => ({}),
        getSifInnsynBrowserEnv: () => ({}),
    };
});

describe('kanBrukerRapportereInntektForPeriode', () => {
    it('Kan ikke rapportere hvis periode er innenfor første måned en blir med i programmet', () => {
        const periode: DateRange = ISODateRangeToDateRange('2025-01-01/2025-01-31');
        const programStartdato = new Date('2025-01-01');
        expect(kanBrukerRapportereInntektForPeriode(periode, programStartdato)).toBeFalsy();
    });

    it('Kan rapportere hvis periode er etter første måned en blir med i programmet', () => {
        const periode: DateRange = ISODateRangeToDateRange('2025-02-01/2025-02-15');
        const programStartdato = new Date('2025-01-01');
        expect(kanBrukerRapportereInntektForPeriode(periode, programStartdato)).toBeTruthy();
    });
});
