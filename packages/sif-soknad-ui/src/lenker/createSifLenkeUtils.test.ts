import { createSifLenkeUtils } from './createSifLenkeUtils';
import { getSifLenker } from './sifLenker';

describe('createSifLenkeUtils', () => {
    it('bruker nynorsk-lenker for nn', () => {
        const { getLenker } = createSifLenkeUtils({
            getEnvironment: () => 'prod',
        });

        expect(getLenker('nn')).toEqual(getSifLenker('nn', 'prod'));
    });

    it('bruker nynorsk-lenker for no-NN', () => {
        const { getLenker } = createSifLenkeUtils({
            getEnvironment: () => 'prod',
        });

        expect(getLenker('no-NN')).toEqual(getSifLenker('nn', 'prod'));
    });

    it('faller tilbake til bokmal for andre locale-verdier', () => {
        const { getLenker } = createSifLenkeUtils({
            getEnvironment: () => 'prod',
        });

        expect(getLenker('nb')).toEqual(getSifLenker('nb', 'prod'));
        expect(getLenker('no-NB')).toEqual(getSifLenker('nb', 'prod'));
        expect(getLenker(undefined)).toEqual(getSifLenker('nb', 'prod'));
    });
});
