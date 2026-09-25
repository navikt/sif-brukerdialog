import { RegistrertBarn } from '@navikt/sif-common-api';
import { vi } from 'vitest';

import { InnvilgedeVedtak } from '../../../../hooks/useInnvilgedeVedtakForRegistrerteBarn';
import { getMinDatoForBarnetsFødselsdato, isBarnOver18år, utledVedtakInfoForBarn } from '../omBarnetStepUtils';

vi.mock('@navikt/sif-common-env', () => {
    return { getRequiredEnv: () => '', getCommonEnv: () => ({}), getMaybeEnv: () => '' };
});

describe('utledVedtakInfoForBarn', () => {
    const barn: RegistrertBarn = {
        aktørId: '123',
        etternavn: 'Barnesen',
        fornavn: 'Barn',
        fødselsdato: new Date('2020-01-01'),
    };

    it('returnerer undefined når barnet ikke har vedtak', () => {
        expect(utledVedtakInfoForBarn(barn, {})).toBeUndefined();
    });

    it('returnerer undefined når barnet ikke har innvilgede behandlinger', () => {
        const innvilgedeVedtak: InnvilgedeVedtak = {
            [barn.aktørId]: {
                harInnvilgedeBehandlinger: false,
                saksnummer: null,
                vedtaksdato: null,
                førsteMuligeSøknadsdato: null,
                vedtakTomDato: null,
            },
        };

        expect(utledVedtakInfoForBarn(barn, innvilgedeVedtak)).toBeUndefined();
    });

    it('returnerer tidsbegrenset vedtaksinfo når begge datofeltene finnes', () => {
        const innvilgedeVedtak: InnvilgedeVedtak = {
            [barn.aktørId]: {
                harInnvilgedeBehandlinger: true,
                saksnummer: 'ABC123',
                vedtaksdato: '2026-01-01',
                førsteMuligeSøknadsdato: '2026-02-01',
                vedtakTomDato: '2026-12-31',
            },
        };

        expect(utledVedtakInfoForBarn(barn, innvilgedeVedtak)).toEqual({
            erTidsbegrenset: true,
            førsteMuligeSøknadsdato: '2026-02-01',
            vedtakTomDato: '2026-12-31',
        });
    });

    it('returnerer ikke-tidsbegrenset vedtaksinfo når datofeltene mangler', () => {
        const innvilgedeVedtak: InnvilgedeVedtak = {
            [barn.aktørId]: {
                harInnvilgedeBehandlinger: true,
                saksnummer: 'ABC123',
                vedtaksdato: '2026-01-01',
                førsteMuligeSøknadsdato: null,
                vedtakTomDato: null,
            },
        };

        expect(utledVedtakInfoForBarn(barn, innvilgedeVedtak)).toEqual({
            erTidsbegrenset: false,
        });
    });
});

describe('isBarnOver18år', () => {
    it('should return false if the person is 18 years old and today is before April 1 of the following year', () => {
        vi.useFakeTimers().setSystemTime(new Date('2023-03-31'));
        const fødselsdato = new Date('2004-09-15');
        const result = isBarnOver18år(fødselsdato);
        expect(result).toBe(false);
    });

    it('should return true if the person is 18 years old and today is April 1 or later of the following year', () => {
        vi.useFakeTimers().setSystemTime(new Date('2023-04-01'));
        const fødselsdato = new Date('2004-09-15');
        const result = isBarnOver18år(fødselsdato);
        expect(result).toBe(true);
    });

    it('should return false if the person is not yet 18 years old Before 1 April', () => {
        vi.useFakeTimers().setSystemTime(new Date('2023-03-15'));
        const fødselsdato = new Date('2020-01-15');
        const result = isBarnOver18år(fødselsdato);
        expect(result).toBe(false);
    });

    it('should return false if the person is not yet 18 years old After 1 April', () => {
        vi.useFakeTimers().setSystemTime(new Date('2023-04-15'));
        const fødselsdato = new Date('2020-01-15');
        const result = isBarnOver18år(fødselsdato);
        expect(result).toBe(false);
    });

    it('should return false if the person is 18 years old and today is before April 1 (15 Februar) of the following year', () => {
        vi.useFakeTimers().setSystemTime(new Date('2024-02-15'));
        const fødselsdato = new Date('2005-01-01');
        const result = isBarnOver18år(fødselsdato);
        expect(result).toBe(false);
    });

    afterAll(() => vi.useRealTimers());
});

describe('getMinDatoForBarnetsFødselsdato', () => {
    test('should return a Date object', () => {
        const result = getMinDatoForBarnetsFødselsdato();
        expect(result).toBeInstanceOf(Date);
    });

    test('should return a date 19 years ago before April 1 of the current year', () => {
        vi.useFakeTimers().setSystemTime(new Date('2023-03-31'));
        const result = getMinDatoForBarnetsFødselsdato();
        expect(result.getFullYear()).toBe(2004); // 2023 - 19
    });

    afterAll(() => vi.useRealTimers());
});
