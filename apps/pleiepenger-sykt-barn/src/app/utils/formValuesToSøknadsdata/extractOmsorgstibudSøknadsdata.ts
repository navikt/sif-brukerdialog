import { YesOrNo } from '@navikt/sif-common-core-ds/lib/types/YesOrNo';
import { OmsorgstilbudFormValues } from '../../types/_SøknadFormValues';
import { OmsorgstilbudSøknadsdata } from '../../types/søknadsdata/_Søknadsdata';
import { YesOrNoOrDoNotKnow } from '../../types/_YesOrNoOrDoNotKnow';

export const extractOmsorgstibudSøknadsdata = (
    omsorgstilbud?: OmsorgstilbudFormValues
): OmsorgstilbudSøknadsdata | undefined => {
    if (
        !omsorgstilbud ||
        (omsorgstilbud.erIOmsorgstilbudFortid !== YesOrNoOrDoNotKnow.YES &&
            (omsorgstilbud.erIOmsorgstilbudFremtid === YesOrNoOrDoNotKnow.NO ||
                omsorgstilbud.erIOmsorgstilbudFremtid === undefined))
    ) {
        return undefined;
    }

    const { erLiktHverUke, fasteDager, enkeltdager, erIOmsorgstilbudFortid, erIOmsorgstilbudFremtid } = omsorgstilbud;

    if (erLiktHverUke === YesOrNo.YES && fasteDager) {
        return {
            type: 'erIOmsorgstilbudFasteDager',
            erIOmsorgstilbudFortid: erIOmsorgstilbudFortid,
            erIOmsorgstilbudFremtid: erIOmsorgstilbudFremtid,
            fasteDager: fasteDager,
        };
    }
    if (erLiktHverUke !== YesOrNo.YES && enkeltdager) {
        return {
            type: 'erIOmsorgstilbudEnkeltDager',
            erIOmsorgstilbudFortid: erIOmsorgstilbudFortid,
            erIOmsorgstilbudFremtid: erIOmsorgstilbudFremtid,
            enkeltdager: enkeltdager,
        };
    }

    if (
        erIOmsorgstilbudFremtid === YesOrNoOrDoNotKnow.DO_NOT_KNOW &&
        (erIOmsorgstilbudFortid === undefined || erIOmsorgstilbudFortid === YesOrNoOrDoNotKnow.NO)
    ) {
        return {
            type: 'erIOmsorgstilbudFremtidUsikker',
            erIOmsorgstilbudFortid: erIOmsorgstilbudFortid,
        };
    }

    return undefined;
};
