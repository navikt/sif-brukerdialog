import { YesOrNo } from '@navikt/sif-common-core-ds/src/types/YesOrNo';
import { BeredskapSøknadsdata } from '../../types/søknadsdata/BeredskapSøknadsdata';
import { SøknadFormValues } from '../../types/søknad-form-values/SøknadFormValues';
import { YesOrNoOrDoNotKnow } from '../../types/YesOrNoOrDoNotKnow';

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
