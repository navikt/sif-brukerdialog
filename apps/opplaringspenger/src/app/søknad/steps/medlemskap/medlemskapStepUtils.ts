import { YesOrNo } from '@navikt/sif-common-formik-ds/lib';
import { BostedUtland } from '@navikt/sif-common-forms-ds/lib';
import { MedlemskapSøknadsdata } from '../../../types/MedlemskapSøknadsdata';
import { Søknadsdata } from '../../../types/Søknadsdata';
import { MedlemskapFormValues } from './MedlemskapStep';

export const getMedlemskapStepInitialValues = (søknadsdata: Søknadsdata): MedlemskapFormValues => {
    const { medlemskap } = søknadsdata;

    let harBoddUtenforNorgeSiste12Mnd: YesOrNo = YesOrNo.UNANSWERED;
    let skalBoUtenforNorgeNeste12Mnd: YesOrNo = YesOrNo.UNANSWERED;
    let utenlandsoppholdNeste12Mnd: BostedUtland[] = [];
    let utenlandsoppholdSiste12Mnd: BostedUtland[] = [];

    if (medlemskap) {
        const { type } = medlemskap;
        if (type === 'harBodd' || type === 'harBoddSkalBo') {
            harBoddUtenforNorgeSiste12Mnd = YesOrNo.YES;
            utenlandsoppholdSiste12Mnd = medlemskap.utenlandsoppholdSiste12Mnd;
        }
        if (type === 'skalBo' || type === 'harBoddSkalBo') {
            skalBoUtenforNorgeNeste12Mnd = YesOrNo.YES;
            utenlandsoppholdNeste12Mnd = medlemskap.utenlandsoppholdNeste12Mnd;
        }
    }

    return {
        harBoddUtenforNorgeSiste12Mnd,
        skalBoUtenforNorgeNeste12Mnd,
        utenlandsoppholdNeste12Mnd,
        utenlandsoppholdSiste12Mnd,
    };
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
