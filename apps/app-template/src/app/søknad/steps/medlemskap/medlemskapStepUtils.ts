import { DateRange, YesOrNo } from '@navikt/sif-common-formik-ds/lib';
import dayjs from 'dayjs';
import { MedlemskapSøknadsdata } from '../../../types/søknadsdata/MedlemskapSøknadsdata';
import { Søknadsdata } from '../../../types/søknadsdata/Søknadsdata';
import { MedlemskapFormValues } from './MedlemskapForm';

interface MedlemsskapDateRanges {
    siste12Måneder: DateRange;
    neste12Måneder: DateRange;
}

const medlemskapInitialFormValues: MedlemskapFormValues = {
    harBoddUtenforNorgeSiste12Mnd: YesOrNo.UNANSWERED,
    skalBoUtenforNorgeNeste12Mnd: YesOrNo.UNANSWERED,
    utenlandsoppholdNeste12Mnd: [],
    utenlandsoppholdSiste12Mnd: [],
};

export const getMedlemskapStepInitialValues = (
    søknadsdata: Søknadsdata,
    formValues?: MedlemskapFormValues
): MedlemskapFormValues => {
    if (formValues) {
        return formValues;
    }

    if (søknadsdata.medlemskap === undefined) {
        return medlemskapInitialFormValues;
    }

    const { medlemskap } = søknadsdata;

    const { type } = medlemskap;
    switch (type) {
        case 'harBodd':
            return {
                harBoddUtenforNorgeSiste12Mnd: YesOrNo.YES,
                utenlandsoppholdSiste12Mnd: medlemskap.utenlandsoppholdSiste12Mnd,
                skalBoUtenforNorgeNeste12Mnd: YesOrNo.NO,
                utenlandsoppholdNeste12Mnd: [],
            };
        case 'skalBo':
            return {
                harBoddUtenforNorgeSiste12Mnd: YesOrNo.NO,
                utenlandsoppholdSiste12Mnd: [],
                skalBoUtenforNorgeNeste12Mnd: YesOrNo.YES,
                utenlandsoppholdNeste12Mnd: medlemskap.utenlandsoppholdNeste12Mnd,
            };
        case 'harBoddSkalBo':
            return {
                harBoddUtenforNorgeSiste12Mnd: YesOrNo.YES,
                utenlandsoppholdSiste12Mnd: medlemskap.utenlandsoppholdSiste12Mnd,
                skalBoUtenforNorgeNeste12Mnd: YesOrNo.YES,
                utenlandsoppholdNeste12Mnd: medlemskap.utenlandsoppholdNeste12Mnd,
            };
        case 'harIkkeBoddSkalIkkeBo':
            return {
                harBoddUtenforNorgeSiste12Mnd: YesOrNo.NO,
                utenlandsoppholdSiste12Mnd: [],
                skalBoUtenforNorgeNeste12Mnd: YesOrNo.NO,
                utenlandsoppholdNeste12Mnd: [],
            };
    }
};

export const getMedlemskapSøknadsdataFromFormValues = ({
    harBoddUtenforNorgeSiste12Mnd,
    utenlandsoppholdSiste12Mnd,
    skalBoUtenforNorgeNeste12Mnd,
    utenlandsoppholdNeste12Mnd,
}: MedlemskapFormValues): MedlemskapSøknadsdata | undefined => {
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

export const getMedlemsskapDateRanges = (søknadsdato: Date): MedlemsskapDateRanges => {
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
