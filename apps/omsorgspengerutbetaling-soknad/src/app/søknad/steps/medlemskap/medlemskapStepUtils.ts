import { DateRange } from '@navikt/sif-common-formik-ds/lib';
import dayjs from 'dayjs';
import { MedlemskapSøknadsdata, Søknadsdata } from '../../../types/søknadsdata/Søknadsdata';
import { MedlemskapFormValues } from './MedlemskapStep';
import { YesOrNo } from '@navikt/sif-common-core-ds/lib/types/YesOrNo';

interface MedlemskapDateRanges {
    siste12Måneder: DateRange;
    neste12Måneder: DateRange;
}
export const getMedlemskapDateRanges = (søknadsdato: Date): MedlemskapDateRanges => {
    return {
        siste12Måneder: {
            from: dayjs(søknadsdato).subtract(1, 'year').toDate(),
            to: dayjs(søknadsdato).subtract(1, 'day').toDate(),
        },
        neste12Måneder: {
            from: søknadsdato,
            to: dayjs(søknadsdato).add(1, 'year').toDate(),
        },
    };
};

export const getMedlemskapStepInitialValues = (
    søknadsdata: Søknadsdata,
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

    const { medlemskap } = søknadsdata;

    if (medlemskap) {
        switch (medlemskap.type) {
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
                    utenlandsoppholdSiste12Mnd: medlemskap.utenlandsoppholdSiste12Mnd,
                    skalBoUtenforNorgeNeste12Mnd: YesOrNo.NO,
                };
            case 'skalBo':
                return {
                    ...defaultValues,
                    harBoddUtenforNorgeSiste12Mnd: YesOrNo.NO,
                    skalBoUtenforNorgeNeste12Mnd: YesOrNo.YES,
                    utenlandsoppholdNeste12Mnd: medlemskap.utenlandsoppholdNeste12Mnd,
                };
            case 'harBoddSkalBo':
                return {
                    ...defaultValues,
                    harBoddUtenforNorgeSiste12Mnd: YesOrNo.YES,
                    skalBoUtenforNorgeNeste12Mnd: YesOrNo.YES,
                    utenlandsoppholdSiste12Mnd: medlemskap.utenlandsoppholdSiste12Mnd,
                    utenlandsoppholdNeste12Mnd: medlemskap.utenlandsoppholdNeste12Mnd,
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
