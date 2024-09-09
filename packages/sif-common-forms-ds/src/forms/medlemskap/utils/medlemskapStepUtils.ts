import { YesOrNo } from '@navikt/sif-common-core-ds/src/types/YesOrNo';
import { MedlemskapSøknadsdata } from '../types/MedlemskapSøknadsdata';
import { MedlemskapFormValues } from '../types';

export const getMedlemskapFormInitialValues = (
    medlemskapSøknadsdata?: MedlemskapSøknadsdata,
    formValues?: MedlemskapFormValues,
): MedlemskapFormValues => {
    if (formValues) {
        return formValues;
    }

    const defaultValues: MedlemskapFormValues = {
        harBoddUtenforNorgeSiste12Mnd: YesOrNo.UNANSWERED,
        utenlandsoppholdSiste12Mnd: [],
        skalBoUtenforNorgeNeste12Mnd: YesOrNo.UNANSWERED,
        utenlandsoppholdNeste12Mnd: [],
    };

    if (medlemskapSøknadsdata) {
        switch (medlemskapSøknadsdata.type) {
            case 'harIkkeBoddSkalIkkeBo':
                return {
                    ...defaultValues,
                    harBoddUtenforNorgeSiste12Mnd: YesOrNo.NO,
                    skalBoUtenforNorgeNeste12Mnd: YesOrNo.NO,
                };
            case 'harBodd':
                return {
                    ...defaultValues,
                    harBoddUtenforNorgeSiste12Mnd: YesOrNo.YES,
                    utenlandsoppholdSiste12Mnd: medlemskapSøknadsdata.utenlandsoppholdSiste12Mnd,
                    skalBoUtenforNorgeNeste12Mnd: YesOrNo.NO,
                };
            case 'skalBo':
                return {
                    ...defaultValues,
                    harBoddUtenforNorgeSiste12Mnd: YesOrNo.NO,
                    skalBoUtenforNorgeNeste12Mnd: YesOrNo.YES,
                    utenlandsoppholdNeste12Mnd: medlemskapSøknadsdata.utenlandsoppholdNeste12Mnd,
                };
            case 'harBoddSkalBo':
                return {
                    ...defaultValues,
                    harBoddUtenforNorgeSiste12Mnd: YesOrNo.YES,
                    skalBoUtenforNorgeNeste12Mnd: YesOrNo.YES,
                    utenlandsoppholdSiste12Mnd: medlemskapSøknadsdata.utenlandsoppholdSiste12Mnd,
                    utenlandsoppholdNeste12Mnd: medlemskapSøknadsdata.utenlandsoppholdNeste12Mnd,
                };
        }
    }
    return defaultValues;
};

export const getMedlemskapSøknadsdataFromFormValues = (
    values: MedlemskapFormValues,
): MedlemskapSøknadsdata | undefined => {
    const {
        harBoddUtenforNorgeSiste12Mnd,
        utenlandsoppholdSiste12Mnd,
        skalBoUtenforNorgeNeste12Mnd,
        utenlandsoppholdNeste12Mnd,
    } = values;

    if (harBoddUtenforNorgeSiste12Mnd === YesOrNo.NO && skalBoUtenforNorgeNeste12Mnd === YesOrNo.NO) {
        return {
            type: 'harIkkeBoddSkalIkkeBo',
            harBoddUtenforNorgeSiste12Mnd: false,
            skalBoUtenforNorgeNeste12Mnd: false,
        };
    }

    if (harBoddUtenforNorgeSiste12Mnd === YesOrNo.YES && skalBoUtenforNorgeNeste12Mnd === YesOrNo.NO) {
        return {
            type: 'harBodd',
            harBoddUtenforNorgeSiste12Mnd: true,
            utenlandsoppholdSiste12Mnd,
            skalBoUtenforNorgeNeste12Mnd: false,
        };
    }
    if (harBoddUtenforNorgeSiste12Mnd === YesOrNo.NO && skalBoUtenforNorgeNeste12Mnd === YesOrNo.YES) {
        return {
            type: 'skalBo',
            harBoddUtenforNorgeSiste12Mnd: false,
            skalBoUtenforNorgeNeste12Mnd: true,
            utenlandsoppholdNeste12Mnd,
        };
    }

    if (harBoddUtenforNorgeSiste12Mnd === YesOrNo.YES && skalBoUtenforNorgeNeste12Mnd === YesOrNo.YES) {
        return {
            type: 'harBoddSkalBo',
            harBoddUtenforNorgeSiste12Mnd: true,
            utenlandsoppholdSiste12Mnd,
            skalBoUtenforNorgeNeste12Mnd: true,
            utenlandsoppholdNeste12Mnd,
        };
    }

    return undefined;
};
