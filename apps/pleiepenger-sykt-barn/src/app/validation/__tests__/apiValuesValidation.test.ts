import { Attachment } from '@navikt/sif-common-core-ds/src/types/Attachment';
import { vi } from 'vitest';
import { OmsorgstilbudApiData, OmsorgstilbudSvarApi } from '../../types/søknad-api-data/SøknadApiData';
import { apiVedleggIsInvalid, isOmsorgstilbudApiDataValid } from '../apiValuesValidation';

vi.mock('@navikt/sif-common-core-ds/src/utils/envUtils', () => {
    return {
        getEnvironmentVariable: () => 'http://localhost:8089',
    };
});

const files: Attachment[] = [
    {
        file: {
            isPersistedFile: true,
            name: 'Skjermbilde 2023-02-03 kl. 16.22.16.png',
            lastModified: 1675437742236,
            size: 130762,
            type: 'image/png',
        },
        pending: false,
        uploaded: true,
        url: 'http://localhost:8080/vedlegg/eyJraWQiOiIxIiwidHlwIjoiSldUIiwiYWxnIjoibm9uZSJ9.eyJqdG',
    },
];

describe('apiVedleggIsInvalid', () => {
    it('should return error if vedlegg[] contains nulls', () => {
        const nullString: any = null;
        expect(apiVedleggIsInvalid([nullString], [])).toBeTruthy();
    });
    it('should return error if vedlegg[] contains empty strings', () => {
        expect(apiVedleggIsInvalid([''], [])).toBeTruthy();
    });
    it('should return error if vedlegg[] contains undefined', () => {
        const undefinedString: any = undefined;
        expect(apiVedleggIsInvalid([undefinedString], [])).toBeTruthy();
    });
    it('should return error if vedlegg[] in apiData is empty but in formValues is not empty', () => {
        expect(apiVedleggIsInvalid([], files)).toBeTruthy();
    });
    it('should return error if vedlegg[] in apiData is not empty but in formValues is empty', () => {
        expect(
            apiVedleggIsInvalid(
                ['http://localhost:8080/vedlegg/eyJraWQiOiIxIiwidHlwIjoiSldUIiwiYWxnIjoibm9uZSJ9.eyJqdG'],
                [],
            ),
        ).toBeTruthy();
    });
    it('should return error if vedlegg[] in apiData is not the same as in formValues', () => {
        expect(
            apiVedleggIsInvalid(
                [
                    'http://localhost:8080/vedlegg/eyJraWQiOiIxIiwidHlwIjoiSldUIiwiYWxnIjoibm9uZSJ9.123456',
                    'http://localhost:8080/vedlegg/eyJraWQiOiIxIiwidHlwIjoiSldUIiwiYWxnIjoibm9uZSJ9.123ff456',
                ],
                files,
            ),
        ).toBeTruthy();
    });

    it('should not return error if vedlegg[] is empty', () => {
        expect(apiVedleggIsInvalid([], [])).toBeFalsy();
    });
    it('should not return error if vedlegg[] in apiData is the same as in formValues', () => {
        expect(
            apiVedleggIsInvalid(
                ['http://localhost:8080/vedlegg/eyJraWQiOiIxIiwidHlwIjoiSldUIiwiYWxnIjoibm9uZSJ9.eyJqdG'],
                files,
            ),
        ).toBeFalsy();
    });
});

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
