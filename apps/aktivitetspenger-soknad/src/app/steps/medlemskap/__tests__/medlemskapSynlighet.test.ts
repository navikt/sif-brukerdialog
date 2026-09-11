import { YesOrNo } from '@sif/rhf';

import { getMedlemskapSynlighet, yesOrNoToBoolean } from '../medlemskapSynlighet';

describe('yesOrNoToBoolean', () => {
    it('skal returnere true for YesOrNo.YES', () => {
        expect(yesOrNoToBoolean(YesOrNo.YES)).toBe(true);
    });

    it('skal returnere false for YesOrNo.NO', () => {
        expect(yesOrNoToBoolean(YesOrNo.NO)).toBe(false);
    });

    it('skal returnere undefined når spørsmålet ikke er besvart', () => {
        expect(yesOrNoToBoolean(undefined)).toBeUndefined();
    });
});

describe('getMedlemskapSynlighet', () => {
    it('skal ikke vise noen oppfølgingsspørsmål når ingenting er besvart', () => {
        expect(getMedlemskapSynlighet({})).toEqual({
            harJobbetINorge: false,
            harJobbetUtenforNorge: false,
            bostederUtenforNorge: false,
            arbeidsstederUtenforNorge: false,
        });
    });

    it('skal spørre om arbeid i utlandet, men ikke arbeid i Norge, når søkeren har bodd i Norge', () => {
        const result = getMedlemskapSynlighet({ harBoddINorge: true });

        expect(result.harJobbetINorge).toBe(false);
        expect(result.harJobbetUtenforNorge).toBe(true);
        expect(result.bostederUtenforNorge).toBe(false);
    });

    it('skal spørre om søkeren har jobbet i Norge når søkeren ikke har bodd i Norge', () => {
        const result = getMedlemskapSynlighet({ harBoddINorge: false });

        expect(result.harJobbetINorge).toBe(true);
        expect(result.harJobbetUtenforNorge).toBe(false);
    });

    it('skal vise bosteder i utlandet når søkeren verken har bodd eller jobbet i Norge', () => {
        const result = getMedlemskapSynlighet({
            harBoddINorge: false,
            harJobbetINorge: false,
        });

        expect(result.bostederUtenforNorge).toBe(true);
        expect(result.harJobbetUtenforNorge).toBe(false);
    });

    it('skal spørre om arbeid i utlandet når søkeren ikke har bodd, men har jobbet, i Norge', () => {
        const result = getMedlemskapSynlighet({
            harBoddINorge: false,
            harJobbetINorge: true,
        });

        expect(result.harJobbetUtenforNorge).toBe(true);
        expect(result.bostederUtenforNorge).toBe(false);
    });

    it('skal ikke vise bosteder i utlandet når søkeren ikke har bodd i Norge, har jobbet i Norge, men ikke jobbet i utlandet', () => {
        const result = getMedlemskapSynlighet({
            harBoddINorge: false,
            harJobbetINorge: true,
            harJobbetUtenforNorge: false,
        });

        expect(result.bostederUtenforNorge).toBe(false);
    });

    it('skal ikke vise bosteder i utlandet når søkeren ikke har bodd i Norge, har jobbet i Norge, og har jobbet i utlandet', () => {
        const result = getMedlemskapSynlighet({
            harBoddINorge: false,
            harJobbetINorge: true,
            harJobbetUtenforNorge: true,
        });

        expect(result.bostederUtenforNorge).toBe(false);
    });

    it('skal bare vise arbeidssteder i utlandet når søkeren har jobbet i utlandet', () => {
        expect(getMedlemskapSynlighet({ harJobbetUtenforNorge: true }).arbeidsstederUtenforNorge).toBe(true);
        expect(getMedlemskapSynlighet({ harJobbetUtenforNorge: false }).arbeidsstederUtenforNorge).toBe(false);
    });
});
