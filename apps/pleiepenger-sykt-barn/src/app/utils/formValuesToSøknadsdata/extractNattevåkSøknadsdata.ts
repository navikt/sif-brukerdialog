import { YesOrNo } from '@navikt/sif-common-core-ds/lib/types/YesOrNo';
import { NattevåkSøknadsdata } from '../../types/søknadsdata/_NattevåkSøknadsdata';
import { SøknadFormValues } from '../../types/_SøknadFormValues';
import { YesOrNoOrDoNotKnow } from '../../types/_YesOrNoOrDoNotKnow';

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
