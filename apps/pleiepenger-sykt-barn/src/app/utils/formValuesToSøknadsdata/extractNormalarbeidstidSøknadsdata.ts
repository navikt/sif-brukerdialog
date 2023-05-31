import { getNumberFromNumberInputValue, YesOrNo } from '@navikt/sif-common-formik-ds/lib';
import { ArbeidsforholdType } from '../../local-sif-common-pleiepenger';
import { NormalarbeidstidFormValues } from '../../types/ArbeidsforholdFormValues';
import { NormalarbeidstidSøknadsdata } from '../../types/søknadsdata/Søknadsdata';

export const ExtractNormalarbeidstidFailed = 'ExtractNormalarbeidstid failed';

export const extractNormalarbeidstid = (
    normalarbeidstid: NormalarbeidstidFormValues | undefined,
    arbeidsforholdType: ArbeidsforholdType
): NormalarbeidstidSøknadsdata | undefined => {
    if (!normalarbeidstid) {
        return undefined;
    }
    if (arbeidsforholdType === ArbeidsforholdType.ANSATT && normalarbeidstid.erLiktSomForrigeSøknad === YesOrNo.YES) {
        const timerPerUkeISnitt = getNumberFromNumberInputValue(normalarbeidstid.timerPerUke);
        if (timerPerUkeISnitt === undefined) {
            return undefined;
        }

        return {
            timerPerUkeISnitt,
        };
    }

    const timerPerUkeISnitt = getNumberFromNumberInputValue(normalarbeidstid.timerPerUke);
    return timerPerUkeISnitt !== undefined
        ? {
              timerPerUkeISnitt,
          }
        : undefined;
};
