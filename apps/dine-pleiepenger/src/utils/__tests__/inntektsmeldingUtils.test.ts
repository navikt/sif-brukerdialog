import dayjs from 'dayjs';
import { describe, expect, it } from 'vitest';

import { getRefusjonEndringListe } from '../inntektsmeldingUtils';

describe('inntektsmeldingUtils', () => {
    describe('getRefusjonEndringListe', () => {
        it('returnerer tom liste når endringerRefusjon er tom og ingen opphørsdato', () => {
            const result = getRefusjonEndringListe({
                refusjonBeløpPerMnd: 25000,
                startDatoPermisjon: new Date('2024-01-01'),
                endringerRefusjon: [],
            });

            expect(result).toEqual([]);
        });

        it('returnerer kun opphørsendring når endringerRefusjon er tom men har opphørsdato', () => {
            const refusjonOpphører = new Date('2024-03-31');
            const result = getRefusjonEndringListe({
                refusjonBeløpPerMnd: 25000,
                refusjonOpphører,
                startDatoPermisjon: new Date('2024-01-01'),
                endringerRefusjon: [],
            });

            expect(result).toHaveLength(1);
            expect(dayjs(result[0].fom).format('YYYY-MM-DD')).toBe('2024-04-01');
            expect(result[0].refusjonBeløpPerMnd).toBe(0);
        });

        it('legger ikke til refusjon før første endring når førsteEndring.fom er lik startDatoPermisjon', () => {
            const startDato = new Date('2024-01-01');
            const førsteEndring = { fom: new Date('2024-01-01'), refusjonBeløpPerMnd: 30000 };

            const result = getRefusjonEndringListe({
                refusjonBeløpPerMnd: 25000,
                startDatoPermisjon: startDato,
                endringerRefusjon: [førsteEndring],
            });

            expect(result).toHaveLength(1);
            expect(result[0]).toEqual(førsteEndring);
        });

        it('legger til refusjon før første endring når førsteEndring.fom er etter startDatoPermisjon', () => {
            const startDato = new Date('2024-01-01');
            const førsteEndring = { fom: new Date('2024-02-01'), refusjonBeløpPerMnd: 30000 };

            const result = getRefusjonEndringListe({
                refusjonBeløpPerMnd: 25000,
                startDatoPermisjon: startDato,
                endringerRefusjon: [førsteEndring],
            });

            expect(result).toHaveLength(2);
            expect(result[0]).toEqual({ fom: startDato, refusjonBeløpPerMnd: 25000 });
            expect(result[1]).toEqual(førsteEndring);
        });

        it('legger til opphørsendring når refusjonOpphører er satt', () => {
            const startDato = new Date('2024-01-01');
            const førsteEndring = { fom: new Date('2024-01-01'), refusjonBeløpPerMnd: 30000 };
            const refusjonOpphører = new Date('2024-03-31');

            const result = getRefusjonEndringListe({
                refusjonBeløpPerMnd: 25000,
                refusjonOpphører,
                startDatoPermisjon: startDato,
                endringerRefusjon: [førsteEndring],
            });

            expect(result).toHaveLength(2);
            expect(result[0]).toEqual(førsteEndring);
            expect(dayjs(result[1].fom).format('YYYY-MM-DD')).toBe('2024-04-01');
            expect(result[1].refusjonBeløpPerMnd).toBe(0);
        });

        it('håndterer komplett scenario med refusjon før første endring, flere endringer og opphør', () => {
            const startDato = new Date('2024-01-01');
            const endringer = [
                { fom: new Date('2024-02-01'), refusjonBeløpPerMnd: 30000 },
                { fom: new Date('2024-03-01'), refusjonBeløpPerMnd: 20000 },
            ];
            const refusjonOpphører = new Date('2024-03-31');

            const result = getRefusjonEndringListe({
                refusjonBeløpPerMnd: 25000,
                refusjonOpphører,
                startDatoPermisjon: startDato,
                endringerRefusjon: endringer,
            });

            expect(result).toHaveLength(4);
            expect(result[0]).toEqual({ fom: startDato, refusjonBeløpPerMnd: 25000 });
            expect(result[1]).toEqual(endringer[0]);
            expect(result[2]).toEqual(endringer[1]);
            expect(dayjs(result[3].fom).format('YYYY-MM-DD')).toBe('2024-04-01');
            expect(result[3].refusjonBeløpPerMnd).toBe(0);
        });

        it('realistisk scenario: arbeidsgiver endrer refusjon underveis og opphører til slutt', () => {
            /**
             * Scenario:
             * - Permisjon starter 1. januar
             * - Arbeidsgiver refunderer 50000 kr/mnd fra start
             * - Fra 1. mars endres refusjonen til 40000 kr/mnd (endring 1)
             * - Fra 1. mai endres refusjonen til 30000 kr/mnd (endring 2)
             * - Refusjonen opphører 30. juni (da blir det 0 kr fra 1. juli)
             *
             * Forventet resultat (4 elementer):
             * 1. Fra 1. jan: 50000 (før første endring)
             * 2. Fra 1. mars: 40000 (endring 1)
             * 3. Fra 1. mai: 30000 (endring 2)
             * 4. Fra 1. juli: 0 (opphør)
             */
            const result = getRefusjonEndringListe({
                refusjonBeløpPerMnd: 50000,
                refusjonOpphører: new Date('2024-06-30'),
                startDatoPermisjon: new Date('2024-01-01'),
                endringerRefusjon: [
                    { fom: new Date('2024-03-01'), refusjonBeløpPerMnd: 40000 },
                    { fom: new Date('2024-05-01'), refusjonBeløpPerMnd: 30000 },
                ],
            });

            expect(result).toHaveLength(4);

            // Fra startdato: opprinnelig refusjonsbeløp
            expect(dayjs(result[0].fom).format('YYYY-MM-DD')).toBe('2024-01-01');
            expect(result[0].refusjonBeløpPerMnd).toBe(50000);

            // Endring 1: redusert refusjon
            expect(dayjs(result[1].fom).format('YYYY-MM-DD')).toBe('2024-03-01');
            expect(result[1].refusjonBeløpPerMnd).toBe(40000);

            // Endring 2: ytterligere redusert refusjon
            expect(dayjs(result[2].fom).format('YYYY-MM-DD')).toBe('2024-05-01');
            expect(result[2].refusjonBeløpPerMnd).toBe(30000);

            // Opphør: dagen etter opphørsdato, beløp = 0 (Nav betaler direkte)
            expect(dayjs(result[3].fom).format('YYYY-MM-DD')).toBe('2024-07-01');
            expect(result[3].refusjonBeløpPerMnd).toBe(0);
        });

        it('realistisk scenario: første endring er på startdato, kun opphør legges til', () => {
            /**
             * Scenario:
             * - Permisjon starter 1. januar
             * - Første endring er allerede på startdato (30000 kr/mnd)
             * - Refusjonen opphører 31. mars
             *
             * Forventet resultat (2 elementer):
             * 1. Fra 1. jan: 30000 (endringen på startdato)
             * 2. Fra 1. april: 0 (opphør)
             *
             * IKKE forventet: et ekstra element før første endring
             */
            const result = getRefusjonEndringListe({
                refusjonBeløpPerMnd: 25000,
                refusjonOpphører: new Date('2024-03-31'),
                startDatoPermisjon: new Date('2024-01-01'),
                endringerRefusjon: [{ fom: new Date('2024-01-01'), refusjonBeløpPerMnd: 30000 }],
            });

            expect(result).toHaveLength(2);

            // Endringen på startdato
            expect(dayjs(result[0].fom).format('YYYY-MM-DD')).toBe('2024-01-01');
            expect(result[0].refusjonBeløpPerMnd).toBe(30000);

            // Opphør
            expect(dayjs(result[1].fom).format('YYYY-MM-DD')).toBe('2024-04-01');
            expect(result[1].refusjonBeløpPerMnd).toBe(0);
        });
    });
});
