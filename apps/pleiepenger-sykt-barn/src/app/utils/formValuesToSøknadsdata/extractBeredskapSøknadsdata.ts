import { YesOrNo } from '@navikt/sif-common-core-ds/lib/types/YesOrNo';
import { BeredskapSøknadsdata } from '../../types/søknadsdata/_BeredskapSøknadsdata';
import { SøknadFormValues } from '../../types/_SøknadFormValues';
import { YesOrNoOrDoNotKnow } from '../../types/_YesOrNoOrDoNotKnow';

export const extractBeredskapSøknadsdata = ({
    harBeredskap,
    harBeredskap_ekstrainfo,
    omsorgstilbud,
}: Partial<SøknadFormValues>): BeredskapSøknadsdata | undefined => {
    if (
        omsorgstilbud !== undefined &&
        (omsorgstilbud.erIOmsorgstilbudFortid === YesOrNoOrDoNotKnow.YES ||
            omsorgstilbud?.erIOmsorgstilbudFremtid === YesOrNoOrDoNotKnow.YES)
    ) {
        if (harBeredskap === YesOrNo.YES) {
            return {
                type: 'harBeredskap',
                harBeredskap: true,
                harBeredskap_ekstrainfo: harBeredskap_ekstrainfo,
            };
        } else {
            return {
                type: 'harIkkeBeredskap',
                harBeredskap: false,
            };
        }
    }

    return undefined;
};
