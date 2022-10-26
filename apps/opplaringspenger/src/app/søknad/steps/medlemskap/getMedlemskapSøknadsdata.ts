import { YesOrNo } from '@navikt/sif-common-formik-ds/lib';
import { MedlemskapSøknadsdata } from '../../../types/MedlemskapSøknadsdata';
import { MedlemskapFormValues } from './MedlemskapStep';

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
