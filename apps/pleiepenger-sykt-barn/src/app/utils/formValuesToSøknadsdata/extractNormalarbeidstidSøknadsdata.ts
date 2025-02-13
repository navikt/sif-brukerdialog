import { getNumberFromNumberInputValue } from '@navikt/sif-common-formik-ds';
import { NormalarbeidstidFormValues } from '../../types/søknad-form-values/ArbeidsforholdFormValues';
import { NormalarbeidstidSøknadsdata } from '../../types/søknadsdata/Søknadsdata';

export const ExtractNormalarbeidstidFailed = 'ExtractNormalarbeidstid failed';

export const extractNormalarbeidstid = (
    normalarbeidstid: NormalarbeidstidFormValues | undefined,
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
