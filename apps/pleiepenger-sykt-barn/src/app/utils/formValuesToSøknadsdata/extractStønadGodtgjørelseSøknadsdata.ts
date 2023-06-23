import { YesOrNo } from '@navikt/sif-common-core-ds/lib/types/YesOrNo';
import { StønadGodtgjørelseSøknadsdata } from '../../types/søknadsdata/StønadGodtgjørelseSøknadsdata';
import { StønadGodtgjørelseFormData } from '../../types/StønadGodtgjørelseFormData';

export const extractStønadGodtgjørelseSøknadsdata = (
    stønadGodtgjørelse: StønadGodtgjørelseFormData
): StønadGodtgjørelseSøknadsdata | undefined => {
    const {
        mottarStønadGodtgjørelse,
        mottarStønadGodtgjørelseIHelePeroden,
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
        if (mottarStønadGodtgjørelseIHelePeroden === YesOrNo.YES) {
            return {
                type: 'mottarIHelePeroden',
                mottarStønadGodtgjørelse: YesOrNo.YES,
                mottarStønadGodtgjørelseIHelePeroden: YesOrNo.YES,
            };
        }
        if (mottarStønadGodtgjørelseIHelePeroden === YesOrNo.NO && starterUndeveis && slutterUnderveis) {
            return {
                type: 'mottarIDelerAvPeroden',
                mottarStønadGodtgjørelse: YesOrNo.YES,
                mottarStønadGodtgjørelseIHelePeroden: YesOrNo.NO,
                starterUndeveis,
                startdato: starterUndeveis === YesOrNo.YES ? startdato : undefined,
                slutterUnderveis,
                sluttdato: slutterUnderveis === YesOrNo.YES ? sluttdato : undefined,
            };
        }
    }

    return undefined;
};
