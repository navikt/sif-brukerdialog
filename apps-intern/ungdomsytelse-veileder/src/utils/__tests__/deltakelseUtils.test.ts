import { ISODateToDate, dateToISODate } from '@navikt/sif-common-utils';

vi.mock('../../types/Features', () => ({
    Features: {
        forlengePeriode: false,
        slettAktivDeltakelse: false,
        slettSluttdato: false,
        tillatTidligInnmelding: false,
    },
}));

vi.mock('@navikt/sif-common-env', () => ({
    getMaybeEnv: (key: string) => {
        if (key === 'SIF_PUBLIC_TILLAT_TIDLIG_INNMELDING') {
            return 'off';
        }
        return undefined;
    },
}));

import {
    getDeltakelseHandlinger,
    getGyldigStartdatoRange,
    kanEndreStartdato,
    kanSetteEllerEndreSluttdato,
    kanSletteSluttdato,
    deltakelseKanSlettes,
    periodeKanForlenges,
    deltakelseSluttdatoErIDagEllerFremover,
    addUkedagerToDate,
} from '../deltakelseUtils';
import { Deltakelse } from '../../types/Deltakelse';
import { Features } from '../../types/Features';

const lagDeltakelse = (overrides: Partial<Deltakelse> = {}): Deltakelse => ({
    id: 'test-id',
    deltaker: { deltakerIdent: '12345678901', id: 'deltaker-id' },
    fraOgMed: ISODateToDate('2026-01-01'),
    tilOgMed: undefined,
    periodeMaksDato: ISODateToDate('2027-01-15'),
    kvoteMaksDato: '2027-01-15',
    harForlengetPeriode: false,
    harUtvidetKvote: false,
    harOpphørsvedtak: false,
    erSlettet: false,
    søktTidspunkt: undefined,
    ...overrides,
});

const TODAY = ISODateToDate('2026-05-07');

describe('deltakelseUtils', () => {
    describe('kanEndreStartdato', () => {
        it('true når startdato er innenfor ±10 mnd, ikke utvidet, >2 mnd til periode', () => {
            const deltakelse = lagDeltakelse({ fraOgMed: ISODateToDate('2026-03-01') });
            expect(kanEndreStartdato(deltakelse, TODAY)).toBe(true);
        });

        it('false når harForlengetPeriode', () => {
            const deltakelse = lagDeltakelse({ fraOgMed: ISODateToDate('2026-03-01'), harForlengetPeriode: true });
            expect(kanEndreStartdato(deltakelse, TODAY)).toBe(false);
        });

        it('false når ≤2 mnd til periodeMaksDato', () => {
            const deltakelse = lagDeltakelse({
                fraOgMed: ISODateToDate('2026-03-01'),
                periodeMaksDato: ISODateToDate('2026-06-01'),
            });
            expect(kanEndreStartdato(deltakelse, TODAY)).toBe(false);
        });

        it('false når startdato er utenfor ±10 mnd vindu', () => {
            const deltakelse = lagDeltakelse({ fraOgMed: ISODateToDate('2025-01-01') });
            expect(kanEndreStartdato(deltakelse, TODAY)).toBe(false);
        });
    });

    describe('kanSetteEllerEndreSluttdato', () => {
        it('true når søkt og periode ikke utløpt', () => {
            const deltakelse = lagDeltakelse({ søktTidspunkt: new Date() });
            expect(kanSetteEllerEndreSluttdato(deltakelse, TODAY)).toBe(true);
        });

        it('false når ikke søkt', () => {
            const deltakelse = lagDeltakelse();
            expect(kanSetteEllerEndreSluttdato(deltakelse, TODAY)).toBe(false);
        });

        it('false når periode er utløpt', () => {
            const deltakelse = lagDeltakelse({
                søktTidspunkt: new Date(),
                periodeMaksDato: ISODateToDate('2026-01-01'),
            });
            expect(kanSetteEllerEndreSluttdato(deltakelse, TODAY)).toBe(false);
        });
    });

    describe('deltakelseKanSlettes', () => {
        it('true når søktTidspunkt er undefined', () => {
            const deltakelse = lagDeltakelse();
            expect(deltakelseKanSlettes(deltakelse)).toBe(true);
        });

        it('false når søktTidspunkt er satt', () => {
            const deltakelse = lagDeltakelse({ søktTidspunkt: new Date() });
            expect(deltakelseKanSlettes(deltakelse)).toBe(false);
        });
    });

    describe('kanSletteSluttdato', () => {
        it('false når feature slettSluttdato er av', () => {
            const deltakelse = lagDeltakelse({ søktTidspunkt: new Date(), tilOgMed: ISODateToDate('2026-10-01') });
            expect(kanSletteSluttdato(deltakelse, TODAY)).toBe(false);
        });

        describe('feature slettSluttdato på', () => {
            beforeEach(() => {
                Features.slettSluttdato = true;
            });
            afterEach(() => {
                Features.slettSluttdato = false;
            });

            it('true når sluttdato er satt og periode ikke er utløpt', () => {
                const deltakelse = lagDeltakelse({ søktTidspunkt: new Date(), tilOgMed: ISODateToDate('2026-10-01') });
                expect(kanSletteSluttdato(deltakelse, TODAY)).toBe(true);
            });

            it('false når sluttdato ikke er satt', () => {
                const deltakelse = lagDeltakelse({ søktTidspunkt: new Date() });
                expect(kanSletteSluttdato(deltakelse, TODAY)).toBe(false);
            });

            it('false når søktTidspunkt ikke er satt', () => {
                const deltakelse = lagDeltakelse({ tilOgMed: ISODateToDate('2026-10-01') });
                expect(kanSletteSluttdato(deltakelse, TODAY)).toBe(false);
            });

            it('false når periode er utløpt', () => {
                const deltakelse = lagDeltakelse({
                    søktTidspunkt: new Date(),
                    tilOgMed: ISODateToDate('2026-10-01'),
                    periodeMaksDato: ISODateToDate('2026-01-01'),
                });
                expect(kanSletteSluttdato(deltakelse, TODAY)).toBe(false);
            });
        });
    });

    describe('deltakelseKanUtvides', () => {
        it('true når søkt, ingen sluttdato, innenfor siste 2 måneder', () => {
            const deltakelse = lagDeltakelse({
                søktTidspunkt: new Date(),
                periodeMaksDato: ISODateToDate('2026-06-01'),
            });
            expect(periodeKanForlenges(deltakelse, TODAY)).toBe(true);
        });

        it('false når allerede utvidet', () => {
            const deltakelse = lagDeltakelse({ søktTidspunkt: new Date(), harForlengetPeriode: true });
            expect(periodeKanForlenges(deltakelse, TODAY)).toBe(false);
        });

        it('false når sluttdato er passert', () => {
            const deltakelse = lagDeltakelse({
                søktTidspunkt: new Date(),
                periodeMaksDato: ISODateToDate('2026-06-01'),
                tilOgMed: ISODateToDate('2026-04-01'),
            });
            expect(periodeKanForlenges(deltakelse, TODAY)).toBe(false);
        });

        it('true når periode nylig utløpt (innenfor 6-ukersvindu)', () => {
            const deltakelse = lagDeltakelse({
                søktTidspunkt: new Date(),
                periodeMaksDato: ISODateToDate('2026-04-01'), // utløpt, men TODAY < 2026-04-01 + 6 uker (2026-05-13)
            });
            expect(periodeKanForlenges(deltakelse, TODAY)).toBe(true);
        });

        it('true dagen etter periodeslutt (nedre grense for 6-ukersvindu)', () => {
            const maksDato = ISODateToDate('2026-05-06'); // TODAY er dagen etter
            const deltakelse = lagDeltakelse({ søktTidspunkt: new Date(), periodeMaksDato: maksDato });
            expect(periodeKanForlenges(deltakelse, TODAY)).toBe(true);
        });

        it('true siste dag innenfor 6-ukersvindu (6 uker - 1 dag etter periodeslutt)', () => {
            // periodeMaksDato + 6 uker = 2026-03-18 + 42 dager = 2026-04-29 → TODAY (2026-05-07) > 2026-04-29 → false
            // Setter maksDato slik at maksDato + 6 uker - 1 dag = TODAY
            // maksDato + 41 dager = 2026-05-07 → maksDato = 2026-03-27
            const deltakelse = lagDeltakelse({
                søktTidspunkt: new Date(),
                periodeMaksDato: ISODateToDate('2026-03-27'), // + 41 dager = 2026-05-07 (TODAY)
            });
            expect(periodeKanForlenges(deltakelse, TODAY)).toBe(true);
        });

        it('false nøyaktig 6 uker etter periodeslutt', () => {
            // periodeMaksDato + 42 dager = TODAY → maksDato = 2026-03-26
            const deltakelse = lagDeltakelse({
                søktTidspunkt: new Date(),
                periodeMaksDato: ISODateToDate('2026-03-26'), // + 42 dager = 2026-05-07 (TODAY) — utenfor vindu
            });
            expect(periodeKanForlenges(deltakelse, TODAY)).toBe(false);
        });

        it('false når periode utløpt og 6-ukersgrense er passert', () => {
            const deltakelse = lagDeltakelse({
                søktTidspunkt: new Date(),
                periodeMaksDato: ISODateToDate('2026-01-01'), // utløpt, TODAY (2026-05-07) > 2026-01-01 + 6 uker (2026-02-12)
            });
            expect(periodeKanForlenges(deltakelse, TODAY)).toBe(false);
        });

        it('false når ikke innenfor siste 2 måneder før periodeutløp', () => {
            const deltakelse = lagDeltakelse({
                søktTidspunkt: new Date(),
            });
            expect(periodeKanForlenges(deltakelse, TODAY)).toBe(false);
        });

        it('false når tilOgMed er satt', () => {
            const deltakelse = lagDeltakelse({
                søktTidspunkt: new Date(),
                periodeMaksDato: ISODateToDate('2026-06-01'),
                tilOgMed: ISODateToDate('2026-05-20'),
            });
            expect(periodeKanForlenges(deltakelse, TODAY)).toBe(false);
        });
    });

    describe('getDeltakelseHandlinger', () => {
        it('A1: Ny deltaker, startdato endrbar', () => {
            const deltakelse = lagDeltakelse({ fraOgMed: ISODateToDate('2026-03-01') });
            const h = getDeltakelseHandlinger(deltakelse, TODAY);
            expect(h.kanEndreStartdato).toBe(true);
            expect(h.kanMeldesUt).toBe(false);
            expect(h.kanEndreSluttdato).toBe(false);
            expect(h.kanForlengePeriode).toBe(false);
            expect(h.kanSletteDeltakelse).toBe(true);
        });

        it('A2: Ny deltaker, startdato låst (utvidet periode)', () => {
            const deltakelse = lagDeltakelse({ fraOgMed: ISODateToDate('2026-03-01'), harForlengetPeriode: true });
            const h = getDeltakelseHandlinger(deltakelse, TODAY);
            expect(h.kanEndreStartdato).toBe(false);
            expect(h.kanSletteDeltakelse).toBe(true);
        });

        it('B1: Aktiv deltaker, startdato endrbar', () => {
            const deltakelse = lagDeltakelse({ fraOgMed: ISODateToDate('2026-03-01'), søktTidspunkt: new Date() });
            const h = getDeltakelseHandlinger(deltakelse, TODAY);
            expect(h.kanEndreStartdato).toBe(true);
            expect(h.kanMeldesUt).toBe(true);
            expect(h.kanForlengePeriode).toBe(false);
            expect(h.kanSletteDeltakelse).toBe(false);
        });

        it('B4: Aktiv deltaker, utvidet periode', () => {
            const deltakelse = lagDeltakelse({
                fraOgMed: ISODateToDate('2026-03-01'),
                søktTidspunkt: new Date(),
                harForlengetPeriode: true,
            });
            const h = getDeltakelseHandlinger(deltakelse, TODAY);
            expect(h.kanEndreStartdato).toBe(false);
            expect(h.kanMeldesUt).toBe(true);
            expect(h.kanForlengePeriode).toBe(false);
        });

        it('B6: Aktiv deltaker, periode utløpt', () => {
            const deltakelse = lagDeltakelse({
                fraOgMed: ISODateToDate('2025-01-01'),
                søktTidspunkt: new Date(),
                periodeMaksDato: ISODateToDate('2026-01-01'),
            });
            const h = getDeltakelseHandlinger(deltakelse, TODAY);
            expect(h.kanEndreStartdato).toBe(false);
            expect(h.kanMeldesUt).toBe(false);
            expect(h.kanForlengePeriode).toBe(false);
        });

        it('C1: Utmeldt, startdato endrbar', () => {
            const deltakelse = lagDeltakelse({
                fraOgMed: ISODateToDate('2026-03-01'),
                søktTidspunkt: new Date(),
                tilOgMed: ISODateToDate('2026-10-01'),
            });
            const h = getDeltakelseHandlinger(deltakelse, TODAY);
            expect(h.kanEndreStartdato).toBe(true);
            expect(h.kanEndreSluttdato).toBe(true);
            expect(h.kanMeldesUt).toBe(false);
            expect(h.kanForlengePeriode).toBe(false);
        });

        it('D1: Slettet overstyrer alt', () => {
            const deltakelse = lagDeltakelse({
                fraOgMed: ISODateToDate('2026-03-01'),
                søktTidspunkt: new Date(),
                erSlettet: true,
            });
            const h = getDeltakelseHandlinger(deltakelse, TODAY);
            expect(h.kanEndreStartdato).toBe(false);
            expect(h.kanMeldesUt).toBe(false);
            expect(h.kanEndreSluttdato).toBe(false);
            expect(h.kanSletteSluttdato).toBe(false);
            expect(h.kanForlengePeriode).toBe(false);
            expect(h.kanSletteDeltakelse).toBe(false);
        });
    });

    describe('getGyldigStartdatoRange', () => {
        const deltaker = {
            førsteMuligeInnmeldingsdato: ISODateToDate('2025-08-11'),
            sisteMuligeInnmeldingsdato: ISODateToDate('2027-06-01'),
        };

        it('begrenser fra-dato til maks 10 mnd tilbake, begrenset av førsteMuligeInnmeldingsdato', () => {
            const result = getGyldigStartdatoRange(deltaker, TODAY);
            expect(result).not.toBe('fomFørTom');
            if (result !== 'fomFørTom') {
                expect(dateToISODate(result.from)).toBe('2025-08-11');
            }
        });

        it('begrenser til-dato til maks 10 mnd frem når det er før sisteMulige', () => {
            const result = getGyldigStartdatoRange(deltaker, TODAY);
            if (result !== 'fomFørTom') {
                expect(dateToISODate(result.to)).toBe('2027-03-07');
            }
        });

        it('returnerer fomFørTom når deltaker ikke kan meldes inn', () => {
            const ugyldigDeltaker = {
                førsteMuligeInnmeldingsdato: ISODateToDate('2028-01-01'),
                sisteMuligeInnmeldingsdato: ISODateToDate('2028-06-01'),
            };
            const result = getGyldigStartdatoRange(ugyldigDeltaker, TODAY);
            expect(result).toBe('fomFørTom');
        });

        it('TIDLIGSTE_STARTDATO er bindende nedre grense når førsteMulige er tidligere', () => {
            const result = getGyldigStartdatoRange(
                {
                    førsteMuligeInnmeldingsdato: ISODateToDate('2025-01-01'),
                    sisteMuligeInnmeldingsdato: ISODateToDate('2027-06-01'),
                },
                TODAY,
            );
            if (result !== 'fomFørTom') {
                expect(dateToISODate(result.from)).toBe('2025-08-01');
            }
        });

        it('sisteMuligeInnmeldingsdato er bindende øvre grense når den er tidligere enn 10 mnd frem', () => {
            const result = getGyldigStartdatoRange(
                {
                    førsteMuligeInnmeldingsdato: ISODateToDate('2025-08-11'),
                    sisteMuligeInnmeldingsdato: ISODateToDate('2026-08-01'),
                },
                TODAY,
            );
            if (result !== 'fomFørTom') {
                expect(dateToISODate(result.to)).toBe('2026-08-01');
            }
        });
    });

    describe('deltakelseSluttdatoErIDagEllerFremover', () => {
        it('true når tilOgMed er i dag', () => {
            const deltakelse = lagDeltakelse({ tilOgMed: ISODateToDate('2026-05-07') });
            expect(deltakelseSluttdatoErIDagEllerFremover(deltakelse, TODAY)).toBe(true);
        });

        it('true når tilOgMed er i fremtiden', () => {
            const deltakelse = lagDeltakelse({ tilOgMed: ISODateToDate('2026-12-01') });
            expect(deltakelseSluttdatoErIDagEllerFremover(deltakelse, TODAY)).toBe(true);
        });

        it('false når tilOgMed er i fortiden', () => {
            const deltakelse = lagDeltakelse({ tilOgMed: ISODateToDate('2026-04-01') });
            expect(deltakelseSluttdatoErIDagEllerFremover(deltakelse, TODAY)).toBe(false);
        });

        it('false når tilOgMed ikke er satt', () => {
            const deltakelse = lagDeltakelse();
            expect(deltakelseSluttdatoErIDagEllerFremover(deltakelse, TODAY)).toBe(false);
        });
    });

    describe('addUkedagerToDate', () => {
        it('legger til ukedager og hopper over helg', () => {
            const fredag = ISODateToDate('2026-05-08');
            const result = addUkedagerToDate(fredag, 1);
            expect(dateToISODate(result)).toBe('2026-05-11');
        });

        it('legger til flere ukedager korrekt', () => {
            const mandag = ISODateToDate('2026-05-04');
            const result = addUkedagerToDate(mandag, 5);
            expect(dateToISODate(result)).toBe('2026-05-11');
        });
    });
});
