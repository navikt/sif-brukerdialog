import { ISODateRange } from '@navikt/sif-common-utils';
import { arbeidsukerMockData } from '../../../mocks/data/app/arbeidsukerMockData';
import { Arbeidsuke } from '../../types/Sak';
import { arbeidsukerHarLikNormaltidPerDag, sorterArbeidsuker } from '../arbeidsukeUtils';
import { getTimerPerDagOgUkeFraUke } from '../beregnUtils';

const { getMockArbeidsuke } = arbeidsukerMockData;

const delvisUker: ISODateRange[] = ['2022-11-03/2022-11-04', '2022-11-28/2022-11-30'];
const heleUker: ISODateRange[] = ['2022-11-14/2022-11-18', '2022-11-07/2022-11-11', '2022-11-21/2022-11-25'];

const arbeidsukerHele: Arbeidsuke[] = heleUker.map((uke) => getMockArbeidsuke(uke));
const arbeidsukerDelvis: Arbeidsuke[] = delvisUker.map((uke) => getMockArbeidsuke(uke));
const arbeidsukerHeleOgDelvis = [...arbeidsukerHele, ...arbeidsukerDelvis].sort(sorterArbeidsuker);

describe('arbeidsukerHarLikNormaltidPerDag', () => {
    it('returnerer true når alle uker har lik normalarbeidstid', () => {
        expect(arbeidsukerHarLikNormaltidPerDag(arbeidsukerHeleOgDelvis)).toBeTruthy();
    });
    it('returnerer true når antall uker er 0', () => {
        expect(arbeidsukerHarLikNormaltidPerDag([])).toBeTruthy();
    });
    it('returnerer true når det kun er én uke', () => {
        const uke = arbeidsukerHele[0];
        expect(arbeidsukerHarLikNormaltidPerDag([uke])).toBeTruthy();
    });
    it('returnerer false hvis noen uker har ulik normalarbeidstid - for hele uker', () => {
        const uker = [...arbeidsukerHele];
        uker[0].normalt = getTimerPerDagOgUkeFraUke(
            {
                hours: '10',
                minutes: '30',
            },
            5
        );
        expect(arbeidsukerHarLikNormaltidPerDag(uker)).toBeFalsy();
    });
});
