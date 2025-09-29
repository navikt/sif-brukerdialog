import { YesOrNo } from '@navikt/sif-common-core-ds/src/types/YesOrNo';
import { vi } from 'vitest';

import { FosterhjemsgodtgjørelseFormValues } from '../../../../types/søknad-form-values/FosterhjemsgodtgjørelseFormValues';
import { cleanupFosterhjemsgodtgjørelse } from '../cleanupFosterhjemsgodtgjørelse';

const ISOStartdato = '2021-01-01';
const ISOSluttdato = '2022-01-01';

const formValues: FosterhjemsgodtgjørelseFormValues = {
    mottarFosterhjemsgodtgjørelse: YesOrNo.YES,
    mottarFosterhjemsgodtgjørelseIHelePerioden: YesOrNo.NO,
    erFrikjøptFraJobb: YesOrNo.YES,
    frikjøptBeskrivelse: 'Info',
    startdato: ISOStartdato,
    sluttdato: ISOSluttdato,
    slutterUnderveis: YesOrNo.YES,
    starterUndeveis: YesOrNo.YES,
};

vi.mock('@navikt/sif-common-env', () => {
    return { getRequiredEnv: () => '', getCommonEnv: () => ({}), getMaybeEnv: () => '' };
});

describe('cleanupFosterhjemsgodtgjørelse', () => {
    it('mottar ikke Fosterhjemsgodtgjørelse', () => {
        const { mottarFosterhjemsgodtgjørelse, ...rest } = cleanupFosterhjemsgodtgjørelse({
            ...formValues,
            mottarFosterhjemsgodtgjørelse: YesOrNo.NO,
        });
        expect(mottarFosterhjemsgodtgjørelse).toEqual(YesOrNo.NO);
        expect(rest).toEqual({});
    });
    it('mottar Fosterhjemsgodtgjørelse - frikjøpt', () => {
        const { mottarFosterhjemsgodtgjørelse, erFrikjøptFraJobb, frikjøptBeskrivelse, ...rest } =
            cleanupFosterhjemsgodtgjørelse({
                ...formValues,
                mottarFosterhjemsgodtgjørelse: YesOrNo.YES,
                erFrikjøptFraJobb: YesOrNo.YES,
            });
        expect(mottarFosterhjemsgodtgjørelse).toEqual(YesOrNo.YES);
        expect(erFrikjøptFraJobb).toEqual(YesOrNo.YES);
        expect(frikjøptBeskrivelse).toEqual('Info');
        expect(rest).toEqual({});
    });
    describe('mottar Fosterhjemsgodtgjørelse', () => {
        it('mottar hele perioden', () => {
            const {
                mottarFosterhjemsgodtgjørelse,
                frikjøptBeskrivelse,
                erFrikjøptFraJobb,
                mottarFosterhjemsgodtgjørelseIHelePerioden,
                ...rest
            } = cleanupFosterhjemsgodtgjørelse({
                ...formValues,
                mottarFosterhjemsgodtgjørelseIHelePerioden: YesOrNo.YES,
                erFrikjøptFraJobb: YesOrNo.NO,
            });
            expect(mottarFosterhjemsgodtgjørelse).toEqual(YesOrNo.YES);
            expect(erFrikjøptFraJobb).toEqual(YesOrNo.NO);
            expect(frikjøptBeskrivelse).toBeUndefined();
            expect(mottarFosterhjemsgodtgjørelseIHelePerioden).toEqual(YesOrNo.YES);
            expect(rest).toEqual({});
        });
        it('starter og slutter i perioden', () => {
            const {
                mottarFosterhjemsgodtgjørelse,
                mottarFosterhjemsgodtgjørelseIHelePerioden,
                starterUndeveis,
                slutterUnderveis,
                startdato,
                sluttdato,
                erFrikjøptFraJobb,
                frikjøptBeskrivelse,
                ...rest
            } = cleanupFosterhjemsgodtgjørelse({
                ...formValues,
                mottarFosterhjemsgodtgjørelseIHelePerioden: YesOrNo.NO,
                starterUndeveis: YesOrNo.YES,
                slutterUnderveis: YesOrNo.YES,
                erFrikjøptFraJobb: YesOrNo.NO,
            });
            expect(mottarFosterhjemsgodtgjørelse).toEqual(YesOrNo.YES);
            expect(mottarFosterhjemsgodtgjørelseIHelePerioden).toEqual(YesOrNo.NO);
            expect(starterUndeveis).toEqual(YesOrNo.YES);
            expect(slutterUnderveis).toEqual(YesOrNo.YES);
            expect(startdato).toEqual(ISOStartdato);
            expect(sluttdato).toEqual(ISOSluttdato);
            expect(erFrikjøptFraJobb).toEqual(YesOrNo.NO);
            expect(frikjøptBeskrivelse).toBeUndefined();
            expect(rest).toEqual({});
        });
    });
});
