import { vi } from 'vitest';

import { alleArbeidstidEndringerErInnenforGyldigePerioder } from '../arbeidstidPeriodeValidering';
import { ArbeidstidSøknadsdata, Sak, TimerEllerProsent } from '@app/types';

vi.mock('@navikt/sif-common-env', () => ({
    getRequiredEnv: () => '',
    getMaybeEnv: () => '',
    getCommonEnv: () => ({}),
    getSifInnsynBrowserEnv: () => ({}),
}));

const getArbeidstid = (perioder: string[]): ArbeidstidSøknadsdata => ({
    arbeidsaktivitet: {
        a_123456789: {
            endringer: Object.fromEntries(
                perioder.map((periode) => [periode, { type: TimerEllerProsent.PROSENT, prosent: 50 }]),
            ),
        },
    },
});

const getArbeidstidForArbeidsgiver = (arbeidsgiverKey: string, perioder: string[]): ArbeidstidSøknadsdata => ({
    arbeidsaktivitet: {
        [arbeidsgiverKey]: {
            endringer: Object.fromEntries(
                perioder.map((periode) => [periode, { type: TimerEllerProsent.PROSENT, prosent: 50 }]),
            ),
        },
    },
});

const getArbeidsgiverPeriode = (perioder: string[]) => ({
    from: new Date('2026-01-01'),
    to: new Date('2026-01-31'),
    arbeidsuker: Object.fromEntries(perioder.map((periode) => [periode, {}])),
});

const sak = {
    arbeidsaktiviteter: {
        arbeidstakerAktiviteter: [
            {
                key: 'a_123456789',
                arbeidsgiver: { organisasjonsnummer: '123456789' },
                perioderMedArbeidstid: [getArbeidsgiverPeriode(['2026-01-12/2026-01-16'])],
            },
        ],
    },
} as Pick<Sak, 'arbeidsaktiviteter'>;

describe('alleArbeidstidEndringerErInnenforGyldigePerioder', () => {
    it('returnerer ingen feil når endringen finnes blant arbeidsgivers arbeidsuker', () => {
        const resultat = alleArbeidstidEndringerErInnenforGyldigePerioder(
            getArbeidstid(['2026-01-12/2026-01-16']),
            sak,
        );

        expect(resultat).toEqual([]);
    });

    it('returnerer ugyldig periode når endringen ikke finnes blant arbeidsgivers arbeidsuker', () => {
        const resultat = alleArbeidstidEndringerErInnenforGyldigePerioder(
            getArbeidstid(['2026-01-02/2026-01-09']),
            sak,
        );

        expect(resultat).toEqual([{ org: '123456789', ugyldigPeriode: ['2026-01-02/2026-01-09'] }]);
    });

    it('returnerer alle ugyldige perioder for arbeidsgiveren', () => {
        const resultat = alleArbeidstidEndringerErInnenforGyldigePerioder(
            getArbeidstid(['2026-01-12/2026-01-16', '2026-02-02/2026-02-06']),
            sak,
        );

        expect(resultat).toEqual([{ org: '123456789', ugyldigPeriode: ['2026-02-02/2026-02-06'] }]);
    });

    it('returnerer alle endringer når arbeidsgiveren ikke lenger finnes i saken', () => {
        const resultat = alleArbeidstidEndringerErInnenforGyldigePerioder(
            getArbeidstidForArbeidsgiver('a_987654321', ['2026-01-12/2026-01-16', '2026-01-19/2026-01-23']),
            sak,
        );

        expect(resultat).toEqual([
            { org: '987654321', ugyldigPeriode: ['2026-01-12/2026-01-16', '2026-01-19/2026-01-23'] },
        ]);
    });
});
