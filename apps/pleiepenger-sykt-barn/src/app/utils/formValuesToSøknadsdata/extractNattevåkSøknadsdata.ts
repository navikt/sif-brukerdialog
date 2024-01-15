import { YesOrNo } from '@navikt/sif-common-core-ds/src/types/YesOrNo';
import { NattevåkSøknadsdata } from '../../types/søknadsdata/NattevåkSøknadsdata';
import { SøknadFormValues } from '../../types/søknad-form-values/SøknadFormValues';
import { YesOrNoOrDoNotKnow } from '../../types/YesOrNoOrDoNotKnow';

export const extractNattevåkSøknadsdata = ({
    harNattevåk,
    harNattevåk_ekstrainfo,
    omsorgstilbud,
}: Partial<SøknadFormValues>): NattevåkSøknadsdata | undefined => {
    if (
        omsorgstilbud !== undefined &&
        (omsorgstilbud.erIOmsorgstilbudFortid === YesOrNoOrDoNotKnow.YES ||
            omsorgstilbud?.erIOmsorgstilbudFremtid === YesOrNoOrDoNotKnow.YES)
    ) {
        if (harNattevåk === YesOrNo.YES) {
            return {
                type: 'harNattevåk',
                harNattevåk: true,
                harNattevåk_ekstrainfo: harNattevåk_ekstrainfo,
            };
        } else {
            return {
                type: 'harIkkeNattevåk',
                harNattevåk: false,
            };
        }
    }

    return undefined;
};
