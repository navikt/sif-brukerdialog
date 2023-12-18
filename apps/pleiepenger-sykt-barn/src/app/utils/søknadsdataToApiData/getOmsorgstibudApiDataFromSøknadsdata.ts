import { DateRange } from '@navikt/sif-common-formik-ds/src';
import { OmsorgstilbudSvarApi, SøknadApiData } from '../../types/søknad-api-data/SøknadApiData';
import { OmsorgstilbudSøknadsdata } from '../../types/søknadsdata/Søknadsdata';
import { YesOrNoOrDoNotKnow } from '../../types/YesOrNoOrDoNotKnow';
import { getEnkeltdagerIPeriodeApiData, getFasteDagerApiData } from './tidsbrukApiUtils';

export type OmsorgstilbudApiData = Pick<SøknadApiData, 'omsorgstilbud'>;

export const getOmsorgstilbudApiDataFromSøknadsdata = (
    søknadsperiode: DateRange,
    omsorgstilbud?: OmsorgstilbudSøknadsdata,
): OmsorgstilbudApiData | undefined => {
    const getOmsorgstilbudSvarApi = (erIOmsorgstilbud?: YesOrNoOrDoNotKnow): OmsorgstilbudSvarApi | undefined => {
        switch (erIOmsorgstilbud) {
            case YesOrNoOrDoNotKnow.YES:
                return OmsorgstilbudSvarApi.JA;
            case YesOrNoOrDoNotKnow.NO:
                return OmsorgstilbudSvarApi.NEI;
            case YesOrNoOrDoNotKnow.DO_NOT_KNOW:
                return OmsorgstilbudSvarApi.USIKKER;
            default:
                return undefined;
        }
    };

    if (omsorgstilbud?.type === 'erIOmsorgstilbudFasteDager') {
        return {
            omsorgstilbud: {
                erLiktHverUke: true,
                svarFortid: getOmsorgstilbudSvarApi(omsorgstilbud.erIOmsorgstilbudFortid),
                svarFremtid: getOmsorgstilbudSvarApi(omsorgstilbud.erIOmsorgstilbudFremtid),
                ukedager: getFasteDagerApiData(omsorgstilbud.fasteDager),
            },
        };
    }

    if (omsorgstilbud?.type === 'erIOmsorgstilbudEnkeltDager') {
        return {
            omsorgstilbud: {
                erLiktHverUke: false,
                svarFortid: getOmsorgstilbudSvarApi(omsorgstilbud.erIOmsorgstilbudFortid),
                svarFremtid: getOmsorgstilbudSvarApi(omsorgstilbud.erIOmsorgstilbudFremtid),
                enkeltdager: getEnkeltdagerIPeriodeApiData(omsorgstilbud.enkeltdager, søknadsperiode),
            },
        };
    }

    if (omsorgstilbud?.type === 'erIOmsorgstilbudFremtidUsikker') {
        return {
            omsorgstilbud: {
                svarFortid:
                    omsorgstilbud.erIOmsorgstilbudFortid === YesOrNoOrDoNotKnow.NO
                        ? OmsorgstilbudSvarApi.NEI
                        : undefined,
                svarFremtid: OmsorgstilbudSvarApi.USIKKER,
            },
        };
    }

    return undefined;
};
