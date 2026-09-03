import { DeltakelsePeriode } from '@shared/types/DeltakelsePeriode';
import { ISODate } from '@sif/utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { erDeltakelseAvsluttet } from './deltakelseUtils';

const getDeltakelsePeriode = (overrides: Partial<DeltakelsePeriode> = {}): DeltakelsePeriode =>
    ({
        status: 'IKKE_AKTIV',
        programPeriode: { from: '2026-01-01', to: '2026-06-30' },
        periodeMaksDato: '2026-12-31',
        ...overrides,
    }) as DeltakelsePeriode;

describe('erDeltakelseAvsluttet', () => {
    beforeEach(() => {
        vi.useFakeTimers();
        vi.setSystemTime(new Date('2026-07-01T12:00:00Z'));
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('returnerer true når en ikke-aktiv deltakelse er avsluttet etter programperioden', () => {
        expect(erDeltakelseAvsluttet(getDeltakelsePeriode())).toBe(true);
    });

    it('returnerer false på programmets sluttdato', () => {
        vi.setSystemTime(new Date('2026-06-30T12:00:00Z'));

        expect(erDeltakelseAvsluttet(getDeltakelsePeriode())).toBe(false);
    });

    it('bruker periodeMaksDato når programperioden ikke har sluttdato', () => {
        const deltakelsePeriode = getDeltakelsePeriode({
            programPeriode: { from: '2026-01-01' as ISODate },
            periodeMaksDato: '2026-06-30' as ISODate,
        });

        expect(erDeltakelseAvsluttet(deltakelsePeriode)).toBe(true);
    });

    it('returnerer false når deltakelsen ikke er inaktiv', () => {
        expect(erDeltakelseAvsluttet(getDeltakelsePeriode({ status: 'AKTIV' }))).toBe(false);
    });
});
