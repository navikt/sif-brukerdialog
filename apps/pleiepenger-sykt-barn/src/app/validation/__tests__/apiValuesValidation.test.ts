import { OmsorgstilbudApiData, OmsorgstilbudSvarApi } from '../../types/søknad-api-data/SøknadApiData';
import { isOmsorgstilbudApiDataValid } from '../apiValuesValidation';

describe('OmsorgstilbudApiDataValid', () => {
    const omsorgstilbud: OmsorgstilbudApiData = {
        erLiktHverUke: true,
        svarFortid: OmsorgstilbudSvarApi.JA,
        svarFremtid: OmsorgstilbudSvarApi.JA,
        ukedager: {
            fredag: 'PT5H0M',
            mandag: 'PT5H0M',
            tirsdag: 'PT5H0M',
            onsdag: 'PT5H0M',
            torsdag: 'PT0H0M',
        },
    };

    it('should return true if omsorgstilbud erLiktHverUke and ukedager', () => {
        expect(isOmsorgstilbudApiDataValid(omsorgstilbud)).toBeTruthy();
    });

    it('should return false if omsorgstilbud erLiktHverUke and ukedager is empty', () => {
        omsorgstilbud.ukedager = {};
        expect(isOmsorgstilbudApiDataValid(omsorgstilbud)).toBeFalsy();
    });

    it('should return false if omsorgstilbud erLiktHverUke and summ hours in ukedager is 0', () => {
        omsorgstilbud.ukedager = { fredag: 'PT0H0M', mandag: 'PT0H0M' };
        expect(isOmsorgstilbudApiDataValid(omsorgstilbud)).toBeFalsy();
    });

    it('should return false if omsorgstilbud erLiktHverUke and summ hours i ukedager is more 37,5', () => {
        omsorgstilbud.ukedager = { fredag: 'PT20H0M', mandag: 'PT20H0M' };
        expect(isOmsorgstilbudApiDataValid(omsorgstilbud)).toBeFalsy();
    });
    it('should return false if omsorgstilbud erLiktHverUke is false and enkeltdager is undefined', () => {
        omsorgstilbud.erLiktHverUke = false;
        expect(isOmsorgstilbudApiDataValid(omsorgstilbud)).toBeFalsy();
    });

    it('should return false if omsorgstilbud erLiktHverUke is false and enkeltdager is empty Array', () => {
        omsorgstilbud.erLiktHverUke = false;
        omsorgstilbud.enkeltdager = [];
        expect(isOmsorgstilbudApiDataValid(omsorgstilbud)).toBeFalsy();
    });

    it('should return true if omsorgstilbud erLiktHverUke is false and enkeltdager is not empty Array', () => {
        omsorgstilbud.erLiktHverUke = false;
        omsorgstilbud.enkeltdager = [
            { dato: '2022-09-07', tid: 'PT5H0M' },
            { dato: '2022-09-08', tid: 'PT5H0M' },
        ];
        expect(isOmsorgstilbudApiDataValid(omsorgstilbud)).toBeTruthy();
    });
});
