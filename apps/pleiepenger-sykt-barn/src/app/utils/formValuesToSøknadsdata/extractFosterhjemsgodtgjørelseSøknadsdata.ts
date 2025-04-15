import { YesOrNo } from '@navikt/sif-common-core-ds/src/types/YesOrNo';
import { FosterhjemsgodtgjørelseFormValues } from '../../types/søknad-form-values/FosterhjemsgodtgjørelseFormValues';
import { FosterhjemsgodtgjørelseSøknadsdata } from '../../types/søknadsdata/FosterhjemsgodtgjørelseSøknadsdata';

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
            type: 'mottarIkke',
            mottarFosterhjemsgodtgjørelse,
        };
    }

    if (mottarFosterhjemsgodtgjørelse === YesOrNo.YES && erFrikjøptFraJobb === YesOrNo.YES) {
        if (frikjøptBeskrivelse === undefined) {
            throw new Error('frikjøptBeskrivelse undefined');
        }
        return {
            type: 'mottarFrikjøpt',
            mottarFosterhjemsgodtgjørelse,
            erFrikjøptFraJobb,
            frikjøptBeskrivelse,
        };
    }

    if (mottarFosterhjemsgodtgjørelse === YesOrNo.YES && erFrikjøptFraJobb === YesOrNo.NO) {
        if (mottarFosterhjemsgodtgjørelseIHelePerioden === YesOrNo.YES) {
            return {
                type: 'mottarIHelePeroden',
                erFrikjøptFraJobb,
                mottarFosterhjemsgodtgjørelse,
                mottarFosterhjemsgodtgjørelseIHelePerioden,
            };
        }
        if (mottarFosterhjemsgodtgjørelseIHelePerioden === YesOrNo.NO && starterUndeveis && slutterUnderveis) {
            return {
                type: 'mottarIDelerAvPeroden',
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
