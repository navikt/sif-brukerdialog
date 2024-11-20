import { YesOrNo } from '@navikt/sif-common-core-ds/src/types/YesOrNo';
import { vi } from 'vitest';
import {
    MottarStønadGodtgjørelseVariant,
    StønadGodtgjørelseFormValues,
} from '../../../../types/søknad-form-values/StønadGodtgjørelseFormValues';
import { cleanupStønadGodtgjørelse } from '../cleanupArbeidssituasjonStep';

const ISOStartdato = '2021-01-01';
const ISOSluttdato = '2022-01-01';

const formValues: StønadGodtgjørelseFormValues = {
    mottarStønadGodtgjørelse: YesOrNo.YES,
    mottarStønadGodtgjørelseVariant: MottarStønadGodtgjørelseVariant.somVanlig,
    startdato: ISOStartdato,
    sluttdato: ISOSluttdato,
};

vi.mock('@navikt/sif-common-env', () => {
    return { getRequiredEnv: () => '', getCommonEnv: () => ({}), getMaybeEnv: () => '' };
});

describe('cleanupStønadGodtgjørelse', () => {
    it('mottar ikke omsorgsstønad eller fosterhjemsgodgjørelse', () => {
        const { mottarStønadGodtgjørelse, ...rest } = cleanupStønadGodtgjørelse({
            ...formValues,
            mottarStønadGodtgjørelse: YesOrNo.NO,
        });
        expect(mottarStønadGodtgjørelse).toEqual(YesOrNo.NO);
        expect(rest).toEqual({});
    });
    describe('mottar omsorgsstønad eller fosterhjemsgodgjørelse', () => {
        it('mottar hele perioden', () => {
            const { mottarStønadGodtgjørelse, mottarStønadGodtgjørelseVariant, ...rest } = cleanupStønadGodtgjørelse({
                ...formValues,
                mottarStønadGodtgjørelseVariant: MottarStønadGodtgjørelseVariant.somVanlig,
            });
            expect(mottarStønadGodtgjørelse).toEqual(YesOrNo.YES);
            expect(mottarStønadGodtgjørelseVariant).toEqual(YesOrNo.YES);
            expect(rest).toEqual({});
        });
        it('starter i perioden', () => {
            const { mottarStønadGodtgjørelse, mottarStønadGodtgjørelseVariant, startdato, ...rest } =
                cleanupStønadGodtgjørelse({
                    ...formValues,
                    mottarStønadGodtgjørelseVariant: MottarStønadGodtgjørelseVariant.starterIPerioden,
                });
            expect(mottarStønadGodtgjørelse).toEqual(YesOrNo.YES);
            expect(mottarStønadGodtgjørelseVariant).toEqual(MottarStønadGodtgjørelseVariant.starterIPerioden);
            expect(startdato).toEqual(ISOStartdato);
            expect(rest).toEqual({});
        });
        it('slutter i perioden', () => {
            const { mottarStønadGodtgjørelse, mottarStønadGodtgjørelseVariant, sluttdato, ...rest } =
                cleanupStønadGodtgjørelse({
                    ...formValues,
                    mottarStønadGodtgjørelseVariant: MottarStønadGodtgjørelseVariant.slutterIPerioden,
                });
            expect(mottarStønadGodtgjørelse).toEqual(YesOrNo.YES);
            expect(mottarStønadGodtgjørelseVariant).toEqual(MottarStønadGodtgjørelseVariant.slutterIPerioden);
            expect(sluttdato).toEqual(ISOSluttdato);
            expect(rest).toEqual({});
        });
        it('starter og slutter i perioden', () => {
            const { mottarStønadGodtgjørelse, mottarStønadGodtgjørelseVariant, sluttdato, startdato, ...rest } =
                cleanupStønadGodtgjørelse({
                    ...formValues,
                    mottarStønadGodtgjørelseVariant: MottarStønadGodtgjørelseVariant.starterOgSlutterIPerioden,
                });
            expect(mottarStønadGodtgjørelse).toEqual(YesOrNo.YES);
            expect(mottarStønadGodtgjørelseVariant).toEqual(MottarStønadGodtgjørelseVariant.starterOgSlutterIPerioden);
            expect(startdato).toEqual(ISOStartdato);
            expect(sluttdato).toEqual(ISOSluttdato);
            expect(rest).toEqual({});
        });
    });
});
