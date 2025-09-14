import { YesOrNo } from '@navikt/sif-common-core-ds/src/types/YesOrNo';

import { FosterhjemsgodtgjørelseFormValues } from '../../types/søknad-form-values/FosterhjemsgodtgjørelseFormValues';
import {
    FosterhjemsgodtgjørelseSøknadsdata,
    FosterhjemsgodtgjørelseType,
} from '../../types/søknadsdata/FosterhjemsgodtgjørelseSøknadsdata';

export const extractFosterhjemsgodtgjørelseSøknadsdata = (
    godtgjørelse: FosterhjemsgodtgjørelseFormValues,
): FosterhjemsgodtgjørelseSøknadsdata | undefined => {
    const {
        starterUndeveis,
        startdato,
        slutterUnderveis,
        sluttdato,
        mottarFosterhjemsgodtgjørelse,
        erFrikjøptFraJobb,
        frikjøptBeskrivelse,
        mottarFosterhjemsgodtgjørelseIHelePerioden,
    } = godtgjørelse;
    if (mottarFosterhjemsgodtgjørelse === YesOrNo.NO) {
        return {
            type: FosterhjemsgodtgjørelseType.mottarIkke,
            mottarFosterhjemsgodtgjørelse,
        };
    }

    if (mottarFosterhjemsgodtgjørelse === YesOrNo.YES && erFrikjøptFraJobb === YesOrNo.YES) {
        if (frikjøptBeskrivelse === undefined) {
            throw new Error('frikjøptBeskrivelse undefined');
        }
        return {
            type: FosterhjemsgodtgjørelseType.mottarFrikjøpt,
            mottarFosterhjemsgodtgjørelse,
            erFrikjøptFraJobb,
            frikjøptBeskrivelse,
        };
    }

    if (mottarFosterhjemsgodtgjørelse === YesOrNo.YES && erFrikjøptFraJobb === YesOrNo.NO) {
        if (mottarFosterhjemsgodtgjørelseIHelePerioden === YesOrNo.YES) {
            return {
                type: FosterhjemsgodtgjørelseType.mottarIHelePerioden,
                erFrikjøptFraJobb,
                mottarFosterhjemsgodtgjørelse,
                mottarFosterhjemsgodtgjørelseIHelePerioden,
            };
        }
        if (mottarFosterhjemsgodtgjørelseIHelePerioden === YesOrNo.NO && starterUndeveis && slutterUnderveis) {
            return {
                type: FosterhjemsgodtgjørelseType.mottarIDelerAvPerioden,
                erFrikjøptFraJobb,
                mottarFosterhjemsgodtgjørelse,
                mottarFosterhjemsgodtgjørelseIHelePerioden,
                starterUndeveis,
                startdato: starterUndeveis === YesOrNo.YES ? startdato : undefined,
                slutterUnderveis,
                sluttdato: slutterUnderveis === YesOrNo.YES ? sluttdato : undefined,
            };
        }
    }

    return undefined;
};
