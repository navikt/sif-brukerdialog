import { ISODateToDate } from '@navikt/sif-common-utils';
import {
    getDeltakelseHandlinger,
    getGyldigStartdatoRange,
    kanEndreStartdato,
    kanSetteEllerEndreSluttdato,
    kanMeldesUt,
    kanEndreSluttdato,
    deltakelseKanSlettes,
    deltakelseKanUtvides,
} from '../deltakelseUtils';
import { Deltakelse } from '../../types/Deltakelse';

const lagDeltakelse = (overrides: Partial<Deltakelse> = {}): Deltakelse => ({
    id: 'test-id',
    deltaker: { deltakerIdent: '12345678901', id: 'deltaker-id' },
    fraOgMed: ISODateToDate('2026-01-01'),
    tilOgMed: undefined,
    kvoteMaksDato: ISODateToDate('2027-01-15'),
    harUtvidetKvote: false,
    harOpphørsvedtak: false,
    erSlettet: false,
    søktTidspunkt: undefined,
    ...overrides,
});

const TODAY = ISODateToDate('2026-05-07');

describe('deltakelseUtils', () => {
    describe('kanEndreStartdato', () => {
        it('true når startdato er innenfor ±6 mnd, ikke utvidet, >2 mnd til kvote', () => {
            const deltakelse = lagDeltakelse({ fraOgMed: ISODateToDate('2026-03-01') });
            expect(kanEndreStartdato(deltakelse, TODAY)).toBe(true);
        });

        it('false når harUtvidetKvote', () => {
            const deltakelse = lagDeltakelse({ fraOgMed: ISODateToDate('2026-03-01'), harUtvidetKvote: true });
            expect(kanEndreStartdato(deltakelse, TODAY)).toBe(false);
        });

        it('false når ≤2 mnd til kvoteMaksDato', () => {
            const deltakelse = lagDeltakelse({
                fraOgMed: ISODateToDate('2026-03-01'),
                kvoteMaksDato: ISODateToDate('2026-06-01'),
            });
            expect(kanEndreStartdato(deltakelse, TODAY)).toBe(false);
        });

        it('false når startdato er utenfor ±6 mnd vindu', () => {
            const deltakelse = lagDeltakelse({ fraOgMed: ISODateToDate('2025-01-01') });
            expect(kanEndreStartdato(deltakelse, TODAY)).toBe(false);
        });
    });

    describe('kanSetteEllerEndreSluttdato', () => {
        it('true når søkt og kvote ikke utløpt', () => {
            const deltakelse = lagDeltakelse({ søktTidspunkt: new Date() });
            expect(kanSetteEllerEndreSluttdato(deltakelse, TODAY)).toBe(true);
        });

        it('false når ikke søkt', () => {
            const deltakelse = lagDeltakelse();
            expect(kanSetteEllerEndreSluttdato(deltakelse, TODAY)).toBe(false);
        });

        it('false når kvote er utløpt', () => {
            const deltakelse = lagDeltakelse({
                søktTidspunkt: new Date(),
                kvoteMaksDato: ISODateToDate('2026-01-01'),
            });
            expect(kanSetteEllerEndreSluttdato(deltakelse, TODAY)).toBe(false);
        });
    });

    describe('kanMeldesUt', () => {
        it('true når søkt, ingen sluttdato, kvote gyldig', () => {
            const deltakelse = lagDeltakelse({ søktTidspunkt: new Date() });
            expect(kanMeldesUt(deltakelse, TODAY)).toBe(true);
        });

        it('false når tilOgMed er satt', () => {
            const deltakelse = lagDeltakelse({
                søktTidspunkt: new Date(),
                tilOgMed: ISODateToDate('2026-12-01'),
            });
            expect(kanMeldesUt(deltakelse, TODAY)).toBe(false);
        });
    });

    describe('kanEndreSluttdato', () => {
        it('true når søkt og tilOgMed satt og kvote gyldig', () => {
            const deltakelse = lagDeltakelse({
                søktTidspunkt: new Date(),
                tilOgMed: ISODateToDate('2026-12-01'),
            });
            expect(kanEndreSluttdato(deltakelse, TODAY)).toBe(true);
        });

        it('false når tilOgMed ikke er satt', () => {
            const deltakelse = lagDeltakelse({ søktTidspunkt: new Date() });
            expect(kanEndreSluttdato(deltakelse, TODAY)).toBe(false);
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

    describe('deltakelseKanUtvides', () => {
        it('true når søkt, ingen sluttdato, innenfor siste 2 måneder', () => {
            const deltakelse = lagDeltakelse({ søktTidspunkt: new Date(), kvoteMaksDato: ISODateToDate('2026-06-01') });
            expect(deltakelseKanUtvides(deltakelse, TODAY)).toBe(true);
        });

        it('false når allerede utvidet', () => {
            const deltakelse = lagDeltakelse({ søktTidspunkt: new Date(), harUtvidetKvote: true });
            expect(deltakelseKanUtvides(deltakelse, TODAY)).toBe(false);
        });

        it('false når sluttdato er passert', () => {
            const deltakelse = lagDeltakelse({
                søktTidspunkt: new Date(),
                kvoteMaksDato: ISODateToDate('2026-06-01'),
                tilOgMed: ISODateToDate('2026-04-01'),
            });
            expect(deltakelseKanUtvides(deltakelse, TODAY)).toBe(false);
        });

        it('false når kvote utløpt', () => {
            const deltakelse = lagDeltakelse({
                søktTidspunkt: new Date(),
                kvoteMaksDato: ISODateToDate('2026-01-01'),
            });
            expect(deltakelseKanUtvides(deltakelse, TODAY)).toBe(false);
        });

        it('false når ikke innenfor siste 2 måneder før kvoteutløp', () => {
            const deltakelse = lagDeltakelse({
                søktTidspunkt: new Date(),
            });
            expect(deltakelseKanUtvides(deltakelse, TODAY)).toBe(false);
        });
    });

    describe('getDeltakelseHandlinger', () => {
        it('A1: Ny deltaker, startdato endrbar', () => {
            const deltakelse = lagDeltakelse({ fraOgMed: ISODateToDate('2026-03-01') });
            const h = getDeltakelseHandlinger(deltakelse, TODAY);
            expect(h.kanEndreStartdato).toBe(true);
            expect(h.kanMeldesUt).toBe(false);
            expect(h.kanEndreSluttdato).toBe(false);
            expect(h.kanUtvideKvote).toBe(false);
            expect(h.kanSlettes).toBe(true);
        });

        it('A2: Ny deltaker, startdato låst (utvidet kvote)', () => {
            const deltakelse = lagDeltakelse({
                fraOgMed: ISODateToDate('2026-03-01'),
                harUtvidetKvote: true,
            });
            const h = getDeltakelseHandlinger(deltakelse, TODAY);
            expect(h.kanEndreStartdato).toBe(false);
            expect(h.kanSlettes).toBe(true);
        });

        it('B1: Aktiv deltaker, normal, startdato endrbar', () => {
            const deltakelse = lagDeltakelse({
                fraOgMed: ISODateToDate('2026-03-01'),
                søktTidspunkt: new Date(),
            });
            const h = getDeltakelseHandlinger(deltakelse, TODAY);
            expect(h.kanEndreStartdato).toBe(true);
            expect(h.kanMeldesUt).toBe(true);
            expect(h.kanUtvideKvote).toBe(false);
            expect(h.kanSlettes).toBe(false);
        });

        it('B4: Aktiv deltaker, utvidet kvote', () => {
            const deltakelse = lagDeltakelse({
                fraOgMed: ISODateToDate('2026-03-01'),
                søktTidspunkt: new Date(),
                harUtvidetKvote: true,
            });
            const h = getDeltakelseHandlinger(deltakelse, TODAY);
            expect(h.kanEndreStartdato).toBe(false);
            expect(h.kanMeldesUt).toBe(true);
            expect(h.kanUtvideKvote).toBe(false);
        });

        it('B6: Aktiv deltaker, kvote utløpt', () => {
            const deltakelse = lagDeltakelse({
                fraOgMed: ISODateToDate('2025-01-01'),
                søktTidspunkt: new Date(),
                kvoteMaksDato: ISODateToDate('2026-01-01'),
            });
            const h = getDeltakelseHandlinger(deltakelse, TODAY);
            expect(h.kanEndreStartdato).toBe(false);
            expect(h.kanMeldesUt).toBe(false);
            expect(h.kanUtvideKvote).toBe(false);
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
            expect(h.kanUtvideKvote).toBe(false);
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
            expect(h.kanUtvideKvote).toBe(false);
            expect(h.kanSlettes).toBe(false);
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
                expect(result.from.toISOString().substring(0, 10)).toBe('2025-08-11');
            }
        });

        it('begrenser til-dato til maks 10 mnd frem når det er før sisteMulige', () => {
            const result = getGyldigStartdatoRange(deltaker, TODAY);
            if (result !== 'fomFørTom') {
                expect(result.to.toISOString().substring(0, 10)).toBe('2027-03-07');
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
    });
});
