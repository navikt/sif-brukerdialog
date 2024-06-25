import { YesOrNo } from '@navikt/sif-common-formik-ds';
import { Utenlandsopphold, UtenlandsoppholdFormValues, UtenlandsoppholdUtvidet, UtenlandsoppholdÅrsak } from '../types';
import { mapFormValuesToUtenlandsopphold } from '../utenlandsoppholdUtils';
import { ISODateToDate } from '@navikt/sif-common-utils';

const landkoder = {
    belgia: 'BEL',
    algerie: 'DZA',
};

describe('utenlandsoppholdUtils', () => {
    describe('variant===ENKEL', () => {
        it('mapFormValuesToUtenlandsopphold', () => {
            const values: UtenlandsoppholdFormValues = {
                fom: '2021-01-01',
                tom: '2021-01-02',
                landkode: landkoder.belgia,
            };
            const result = mapFormValuesToUtenlandsopphold(values, 'enkel', undefined);
            expect(result).toEqual({
                type: 'enkel',
                id: expect.any(String),
                fom: new Date('2021-01-01'),
                tom: new Date('2021-01-02'),
                landkode: landkoder.belgia,
            });
        });
    });
    describe('variant===UTVIDET', () => {
        describe('reise innenfor eøs', () => {
            const innenforEøsValues: UtenlandsoppholdFormValues = {
                fom: '2021-01-01',
                tom: '2021-01-02',
                landkode: landkoder.belgia,
                erSammenMedBarnet: YesOrNo.NO,
            };
            it('er ikke sammen med barnet', () => {
                const result = mapFormValuesToUtenlandsopphold({ ...innenforEøsValues }, 'utvidet', undefined);
                const expectedResult: UtenlandsoppholdUtvidet = {
                    type: 'innenfor_eøs',
                    erUtenforEØS: false,
                    id: expect.any(String),
                    fom: new Date('2021-01-01'),
                    tom: new Date('2021-01-02'),
                    landkode: landkoder.belgia,
                    erSammenMedBarnet: false,
                };
                expect(result).toEqual(expectedResult);
            });
            it('er sammen med barnet innenfor EØS', () => {
                const result = mapFormValuesToUtenlandsopphold(
                    { ...innenforEøsValues, erSammenMedBarnet: YesOrNo.YES },
                    'utvidet',
                    undefined,
                );
                const expectedResult: Utenlandsopphold = {
                    type: 'innenfor_eøs',
                    erUtenforEØS: false,
                    id: expect.any(String),
                    fom: new Date('2021-01-01'),
                    tom: new Date('2021-01-02'),
                    landkode: landkoder.belgia,
                    erSammenMedBarnet: true,
                };
                expect(result).toEqual(expectedResult);
            });
        });

        describe('reise utenfor eøs', () => {
            const utenforEøsValues: UtenlandsoppholdFormValues = {
                fom: '2021-01-01',
                tom: '2021-01-02',
                landkode: landkoder.algerie,
                erSammenMedBarnet: YesOrNo.YES,
                erBarnetInnlagt: YesOrNo.YES,
                barnInnlagtPerioder: [{ fom: ISODateToDate('2021-01-01'), tom: ISODateToDate('2021-01-02') }],
                årsak: UtenlandsoppholdÅrsak.INNLAGT_DEKKET_NORGE,
            };
            it('barnet er innlagt', () => {
                const result = mapFormValuesToUtenlandsopphold(utenforEøsValues, 'utvidet', undefined);

                const expectedResult: Utenlandsopphold = {
                    type: 'utenfor_eøs',
                    erUtenforEØS: true,
                    id: expect.any(String),
                    fom: new Date('2021-01-01'),
                    tom: new Date('2021-01-02'),
                    landkode: landkoder.algerie,
                    erSammenMedBarnet: true,
                    erBarnetInnlagt: true,
                    barnInnlagtPerioder: [
                        {
                            fom: new Date('2021-01-01'),
                            tom: new Date('2021-01-02'),
                        },
                    ],
                    årsak: UtenlandsoppholdÅrsak.INNLAGT_DEKKET_NORGE,
                };
                expect(result).toEqual(expectedResult);
            });
            it('barnet er ikke innlagt - er sammen med barnet', () => {
                const result = mapFormValuesToUtenlandsopphold(
                    { ...utenforEøsValues, erSammenMedBarnet: YesOrNo.YES, erBarnetInnlagt: YesOrNo.NO },
                    'utvidet',
                    undefined,
                );
                const expectedResult: Utenlandsopphold = {
                    type: 'utenfor_eøs',
                    erUtenforEØS: true,
                    id: expect.any(String),
                    fom: new Date('2021-01-01'),
                    tom: new Date('2021-01-02'),
                    landkode: landkoder.algerie,
                    erBarnetInnlagt: false,
                    erSammenMedBarnet: true,
                };
                expect(result).toEqual(expectedResult);
            });
            it('barnet er ikke innlagt - er ikke sammen med barnet', () => {
                const result = mapFormValuesToUtenlandsopphold(
                    { ...utenforEøsValues, erBarnetInnlagt: YesOrNo.NO, erSammenMedBarnet: YesOrNo.NO },
                    'utvidet',
                    undefined,
                );
                const expectedResult: Utenlandsopphold = {
                    type: 'utenfor_eøs',
                    erUtenforEØS: true,
                    id: expect.any(String),
                    fom: new Date('2021-01-01'),
                    tom: new Date('2021-01-02'),
                    landkode: landkoder.algerie,
                    erSammenMedBarnet: false,
                };
                expect(result).toEqual(expectedResult);
            });
        });
    });
});
