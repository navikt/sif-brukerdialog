import { YesOrNo } from '@navikt/sif-common-core-ds/src/types/YesOrNo';
import { FosterhjemsgodtgjørelseFormValues } from '../../types/søknad-form-values/FosterhjemsgodtgjørelseFormValues';
import { FosterhjemsgodtgjørelseSøknadsdata } from '../../types/søknadsdata/FosterhjemsgodtgjørelseSøknadsdata';
import { getNumberFromNumberInputValue } from '@navikt/sif-common-formik-ds';

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
        frikjøptProsent,
        frikjøptTimer,
        frikjøptTimerEllerProsent,
        mottarFosterhjemsgodtgjørelseIHelePerioden,
    } = godtgjørelse;
    if (mottarFosterhjemsgodtgjørelse === YesOrNo.NO) {
        return {
            type: 'mottarIkke',
            mottarFosterhjemsgodtgjørelse,
        };
    }
    if (mottarFosterhjemsgodtgjørelse === YesOrNo.YES && erFrikjøptFraJobb === YesOrNo.NO) {
        return {
            type: 'mottarMenIkkeFrikjøpt',
            mottarFosterhjemsgodtgjørelse,
            erFrikjøptFraJobb,
        };
    }

    if (mottarFosterhjemsgodtgjørelse === YesOrNo.YES && erFrikjøptFraJobb === YesOrNo.YES) {
        if (frikjøptTimerEllerProsent === undefined) {
            return undefined;
        }
        if (mottarFosterhjemsgodtgjørelseIHelePerioden === YesOrNo.YES) {
            return {
                type: 'mottarIHelePeroden',
                mottarFosterhjemsgodtgjørelse,
                erFrikjøptFraJobb,
                frikjøptArbeidsgiverNavn: godtgjørelse.frikjøptArbeidsgiverNavn || [],
                mottarFosterhjemsgodtgjørelseIHelePerioden,
                frikjøptTimerEllerProsent,
                frikjøptTimer: getNumberFromNumberInputValue(frikjøptTimer),
                frikjøptProsent: getNumberFromNumberInputValue(frikjøptProsent),
            };
        }
        if (mottarFosterhjemsgodtgjørelseIHelePerioden === YesOrNo.NO && starterUndeveis && slutterUnderveis) {
            return {
                type: 'mottarIDelerAvPeroden',
                mottarFosterhjemsgodtgjørelse,
                erFrikjøptFraJobb,
                frikjøptArbeidsgiverNavn: godtgjørelse.frikjøptArbeidsgiverNavn || [],
                mottarFosterhjemsgodtgjørelseIHelePerioden,
                frikjøptTimerEllerProsent,
                frikjøptTimer: getNumberFromNumberInputValue(frikjøptTimer),
                frikjøptProsent: getNumberFromNumberInputValue(frikjøptProsent),
                starterUndeveis,
                startdato: starterUndeveis === YesOrNo.YES ? startdato : undefined,
                slutterUnderveis,
                sluttdato: slutterUnderveis === YesOrNo.YES ? sluttdato : undefined,
            };
        }
    }

    return undefined;
};
