import { YesOrNo } from '@navikt/sif-common-core-ds/lib/types/YesOrNo';
import { StønadGodtgjørelseSøknadsdata } from '../../types/søknadsdata/_StønadGodtgjørelseSøknadsdata';
import { StønadGodtgjørelseFormData } from '../../types/_StønadGodtgjørelseFormData';

export const extractStønadGodtgjørelseSøknadsdata = (
    stønadGodtgjørelse: StønadGodtgjørelseFormData
): StønadGodtgjørelseSøknadsdata | undefined => {
    const {
        mottarStønadGodtgjørelse,
        mottarStønadGodtgjørelseIHelePerioden,
        starterUndeveis,
        startdato,
        slutterUnderveis,
        sluttdato,
    } = stønadGodtgjørelse;
    if (mottarStønadGodtgjørelse === YesOrNo.NO) {
        return {
            type: 'mottarIkke',
            mottarStønadGodtgjørelse,
        };
    }

    if (mottarStønadGodtgjørelse === YesOrNo.YES) {
        if (mottarStønadGodtgjørelseIHelePerioden === YesOrNo.YES) {
            return {
                type: 'mottarIHelePeroden',
                mottarStønadGodtgjørelse: YesOrNo.YES,
                mottarStønadGodtgjørelseIHelePerioden: YesOrNo.YES,
            };
        }
        if (mottarStønadGodtgjørelseIHelePerioden === YesOrNo.NO && starterUndeveis && slutterUnderveis) {
            return {
                type: 'mottarIDelerAvPeroden',
                mottarStønadGodtgjørelse: YesOrNo.YES,
                mottarStønadGodtgjørelseIHelePerioden: YesOrNo.NO,
                starterUndeveis,
                startdato: starterUndeveis === YesOrNo.YES ? startdato : undefined,
                slutterUnderveis,
                sluttdato: slutterUnderveis === YesOrNo.YES ? sluttdato : undefined,
            };
        }
    }

    return undefined;
};
