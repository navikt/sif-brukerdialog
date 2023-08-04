import { getNumberFromNumberInputValue } from '@navikt/sif-common-formik-ds/lib';
import { NormalarbeidstidFormValues } from '../../types/_ArbeidsforholdFormValues';
import { NormalarbeidstidSøknadsdata } from '../../types/søknadsdata/_Søknadsdata';

export const ExtractNormalarbeidstidFailed = 'ExtractNormalarbeidstid failed';

export const extractNormalarbeidstid = (
    normalarbeidstid: NormalarbeidstidFormValues | undefined
): NormalarbeidstidSøknadsdata | undefined => {
    if (!normalarbeidstid) {
        return undefined;
    }
    const timerPerUkeISnitt = getNumberFromNumberInputValue(normalarbeidstid.timerPerUke);
    return timerPerUkeISnitt !== undefined
        ? {
              timerPerUkeISnitt,
          }
        : undefined;
};
