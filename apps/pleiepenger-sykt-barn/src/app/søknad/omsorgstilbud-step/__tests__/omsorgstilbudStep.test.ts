import { YesOrNo } from '@navikt/sif-common-core-ds/src/types/YesOrNo';
import { DateRange } from '@navikt/sif-common-formik-ds/src';
import { DateDurationMap, ISODateToDate } from '@navikt/sif-common-utils';
import { SøknadFormValues } from '../../../types/søknad-form-values/SøknadFormValues';
import { cleanupOmsorgstilbudStep } from '../omsorgstilbudStepUtils';
import { YesOrNoOrDoNotKnow } from '../../../types/YesOrNoOrDoNotKnow';
import { vi } from 'vitest';

vi.mock('@navikt/sif-common-env', () => {
    return { getRequiredEnv: () => '', getCommonEnv: () => {}, getSifInnsynBrowserEnv: () => {}, getEnv: () => '' };
});

const søknadsperiode: DateRange = {
    from: ISODateToDate('2021-06-02'),
    to: ISODateToDate('2021-06-04'),
};

const enkeldagerFormValues: DateDurationMap = {
    '2021-06-01': { hours: '2', minutes: '30' } /** Outside range */,
    '2021-06-02': { hours: '2', minutes: '30' } /** Within range */,
    '2021-06-03': { hours: '2', minutes: '30' } /** Within range */,
    '2021-06-04': { hours: '2', minutes: '30' } /** Within range */,
    '2021-06-05': { hours: '2', minutes: '30' } /** Outside range */,
};

const formValuesTemplate: Partial<SøknadFormValues> = {
    omsorgstilbud: {
        erIOmsorgstilbudFortid: YesOrNoOrDoNotKnow.YES,
        erLiktHverUke: YesOrNo.NO,
        enkeltdager: enkeldagerFormValues,
    },
};

const formValues = formValuesTemplate as SøknadFormValues;

describe('cleanupOmsorgstilbudStep', () => {
    it('removes days outside søknadsperiode', () => {
        const result = cleanupOmsorgstilbudStep(formValues, søknadsperiode);
        const enkeltdager = result.omsorgstilbud?.enkeltdager;
        expect(enkeltdager).toBeDefined();
        if (enkeltdager) {
            expect(Object.keys(enkeltdager).length).toBe(3);
            expect(enkeltdager['2021-06-01']).toBeUndefined();
            expect(enkeltdager['2021-06-02']).toBeDefined();
            expect(enkeltdager['2021-06-03']).toBeDefined();
            expect(enkeltdager['2021-06-04']).toBeDefined();
            expect(enkeltdager['2021-06-05']).toBeUndefined();
        }
    });
    it('removes omsorgstilbud if erIOmsorgstilbud !== YesOrNo.YES', () => {
        const result = cleanupOmsorgstilbudStep({ ...formValues, omsorgstilbud: undefined }, søknadsperiode);
        expect(result.omsorgstilbud?.enkeltdager).toBeUndefined();
        expect(result.omsorgstilbud?.fasteDager).toBeUndefined();
        expect(result.omsorgstilbud?.erLiktHverUke).toBeUndefined();
    });
});
