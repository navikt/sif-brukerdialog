import { Duration, ISODateRange, ISODateRangeToDateRange } from '@navikt/sif-common-utils/lib';
import { Arbeidsuke } from '../../types/K9Sak';
import { arbeidsukerErHeleArbeidsuker, arbeidsukerHarLikNormaltid, sorterArbeidsuker } from '../arbeidsukeUtils';

const getMockArbeidsuke = (
    isoDateRange: ISODateRange,
    normalt: Duration = { hours: '7', minutes: '30' }
): Arbeidsuke => ({
    dagerMap: {},
    faktisk: { hours: '2', minutes: '0' },
    isoDateRange,
    normalt,
    periode: ISODateRangeToDateRange(isoDateRange),
});
const delvisUker: ISODateRange[] = ['2022-11-03/2022-11-04', '2022-11-28/2022-11-30'];
const heleUker: ISODateRange[] = ['2022-11-14/2022-11-18', '2022-11-07/2022-11-11', '2022-11-21/2022-11-25'];

const arbeidsukerHele: Arbeidsuke[] = heleUker.map((uke) => getMockArbeidsuke(uke));
const arbeidsukerDelvis: Arbeidsuke[] = delvisUker.map((uke) => getMockArbeidsuke(uke));
const arbeidsukerHeleOgDelvis = [...arbeidsukerHele, ...arbeidsukerDelvis].sort(sorterArbeidsuker);

describe('arbeidsukerHarLikNormaltid', () => {
    const ukerMedLikNormaltid = arbeidsukerHeleOgDelvis.map(
        (a): Arbeidsuke => ({ ...a, normalt: { hours: '1', minutes: '0' } })
    );
    it('returnerer true når alle uker har lik normalarbeidstid', () => {
        expect(arbeidsukerHarLikNormaltid(ukerMedLikNormaltid)).toBeTruthy();
    });
    it('returnerer true når det kun er én uke', () => {
        const uke = arbeidsukerHele[0];
        expect(arbeidsukerHarLikNormaltid([uke])).toBeTruthy();
    });
    it('returnerer true når antall uker er 0', () => {
        expect(arbeidsukerHarLikNormaltid([])).toBeTruthy();
    });
    it('returnerer false når alle uker har lik normalarbeidstid', () => {
        const uker = [...ukerMedLikNormaltid];
        uker[0].normalt = {
            hours: '10',
            minutes: '0',
        };
        expect(arbeidsukerHarLikNormaltid(uker)).toBeFalsy();
    });
});

describe('arbeidsukerErHeleArbeidsuker', () => {
    it('returnerer true når alle uker er hele', () => {
        expect(arbeidsukerErHeleArbeidsuker(arbeidsukerHele)).toBeTruthy();
    });
    it('returnerer false når noen uker er delvis', () => {
        expect(arbeidsukerErHeleArbeidsuker(arbeidsukerDelvis)).toBeFalsy();
    });
    it('returnerer false når alle uker er delvis', () => {
        expect(arbeidsukerErHeleArbeidsuker(arbeidsukerHeleOgDelvis)).toBeFalsy();
    });
});
