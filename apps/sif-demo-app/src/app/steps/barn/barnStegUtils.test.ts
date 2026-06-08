import { describe, expect, it } from 'vitest';

import { toBarnFormValues, toBarnSøknadsdata } from './barnStegUtils';

describe('barnStegUtils', () => {
    it('mapper valgt barn til søknadsdata', () => {
        expect(toBarnSøknadsdata({ barnetSøknadenGjelder: 'barn-1' })).toEqual({
            barnetSøknadenGjelder: 'barn-1',
        });
    });

    it('returnerer undefined når barn ikke er valgt', () => {
        expect(toBarnSøknadsdata({})).toBeUndefined();
    });

    it('mapper søknadsdata tilbake til formverdier', () => {
        expect(toBarnFormValues({ barnetSøknadenGjelder: 'barn-2' })).toEqual({
            barnetSøknadenGjelder: 'barn-2',
        });
    });
});