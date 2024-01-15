import { YesOrNo } from '@navikt/sif-common-core-ds/src/types/YesOrNo';
import { MedlemskapFormValues } from '../../../types/søknad-form-values/SøknadFormValues';
import { Utenlandsopphold } from '@navikt/sif-common-forms-ds/src';
import { extractMedlemskapSøknadsdata } from '../extractMedlemskapSøknadsdata';

const mockUtenlandsopphold: Utenlandsopphold = {
    fom: new Date(),
    tom: new Date(),
    landkode: 'ARG',
    id: '12334',
};

const formValues: MedlemskapFormValues = {
    harBoddUtenforNorgeSiste12Mnd: YesOrNo.YES,
    utenlandsoppholdSiste12Mnd: [mockUtenlandsopphold],
    skalBoUtenforNorgeNeste12Mnd: YesOrNo.YES,
    utenlandsoppholdNeste12Mnd: [mockUtenlandsopphold],
};

describe('extractMedlemskapSøknadsdata', () => {
    describe('Har bodd og skal bo i utlandet', () => {
        it('returnerer harBoddSkalBo dersom bruker har bodd og skal bo i utlandet', () => {
            const result = extractMedlemskapSøknadsdata(formValues);
            expect(result).toBeDefined();
            expect(result?.type).toEqual('harBoddSkalBo');
        });
    });

    describe('Har bodd i utlandet', () => {
        it('returnerer harBodd dersom bruker har bodd i utlandet', () => {
            const result = extractMedlemskapSøknadsdata({
                ...formValues,
                skalBoUtenforNorgeNeste12Mnd: YesOrNo.NO,
                utenlandsoppholdNeste12Mnd: [],
            });
            expect(result).toBeDefined();
            expect(result?.type).toEqual('harBodd');
        });
    });

    describe('Skal bo i utlandet', () => {
        it('returnerer skalBo dersom bruker skal bo i utlandet', () => {
            const result = extractMedlemskapSøknadsdata({
                ...formValues,
                harBoddUtenforNorgeSiste12Mnd: YesOrNo.NO,
                utenlandsoppholdSiste12Mnd: [],
            });
            expect(result).toBeDefined();
            expect(result?.type).toEqual('skalBo');
        });
    });

    describe('Har ikke bodd og skal ikke bo i utlandet', () => {
        it('returnerer harIkkeBoddSkalIkkeBo dersom bruker har ikke bodd og skal ikke bo i utlandet', () => {
            const result = extractMedlemskapSøknadsdata({
                ...formValues,
                harBoddUtenforNorgeSiste12Mnd: YesOrNo.NO,
                utenlandsoppholdSiste12Mnd: [],
                skalBoUtenforNorgeNeste12Mnd: YesOrNo.NO,
                utenlandsoppholdNeste12Mnd: [],
            });
            expect(result).toBeDefined();
            expect(result?.type).toEqual('harIkkeBoddSkalIkkeBo');
        });
    });
});
