import { describe, expect, it } from 'vitest';

import { getRefusjonFørFørsteEndring } from '../inntektsmeldingUtils';

describe('inntektsmeldingUtils', () => {
    describe('getRefusjonFørFørsteEndring', () => {
        it('returnerer undefined når førsteEndring.fom er lik startDatoPermisjon', () => {
            const startDato = new Date('2024-01-01');
            const førsteEndring = {
                fom: new Date('2024-01-01'),
                refusjonBeløpPerMnd: 30000,
            };

            const result = getRefusjonFørFørsteEndring(25000, startDato, førsteEndring);

            expect(result).toBeUndefined();
        });

        it('returnerer undefined når førsteEndring.fom er før startDatoPermisjon', () => {
            const startDato = new Date('2024-01-15');
            const førsteEndring = {
                fom: new Date('2024-01-01'),
                refusjonBeløpPerMnd: 30000,
            };

            const result = getRefusjonFørFørsteEndring(25000, startDato, førsteEndring);

            expect(result).toBeUndefined();
        });

        it('returnerer EndringRefusjon når førsteEndring.fom er etter startDatoPermisjon', () => {
            const startDato = new Date('2024-01-01');
            const førsteEndring = {
                fom: new Date('2024-02-01'),
                refusjonBeløpPerMnd: 30000,
            };

            const result = getRefusjonFørFørsteEndring(25000, startDato, førsteEndring);

            expect(result).toEqual({
                fom: startDato,
                refusjonBeløpPerMnd: 25000,
            });
        });

        it('returnerer undefined når førsteEndring er undefined', () => {
            const startDato = new Date('2024-01-01');

            const result = getRefusjonFørFørsteEndring(25000, startDato, undefined as any);

            expect(result).toBeUndefined();
        });
    });
});
