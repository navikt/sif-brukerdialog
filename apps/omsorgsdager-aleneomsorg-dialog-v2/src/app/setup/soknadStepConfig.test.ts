import { describe, expect, it } from 'vitest';

import { SøknadStepId } from '../types/SoknadStepId';
import { normalizePublicPath } from './appEnv';
import { søknadStepOrder } from './soknadStepConfig';

describe('søknadsflyt', () => {
    it('har samme stegrekkefølge som brukerflyten', () => {
        expect(søknadStepOrder).toEqual([
            SøknadStepId.OM_OMSORGEN_FOR_BARN,
            SøknadStepId.TIDSPUNKT_FOR_ALENEOMSORG,
            SøknadStepId.OPPSUMMERING,
        ]);
    });

    it('normaliserer appens public path med avsluttende skråstrek', () => {
        expect(normalizePublicPath('/soknad')).toBe('/soknad/');
        expect(normalizePublicPath('/soknad/')).toBe('/soknad/');
    });
});
