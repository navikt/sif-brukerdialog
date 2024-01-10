import { YesOrNo } from '@navikt/sif-common-core-ds/src/types/YesOrNo';
import { MedlemskapFormValues } from '../../types/søknad-form-values/SøknadFormValues';
import { MedlemskapSøknadsdata } from '../../types/søknadsdata/Søknadsdata';

export const extractMedlemskapSøknadsdata = ({
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
