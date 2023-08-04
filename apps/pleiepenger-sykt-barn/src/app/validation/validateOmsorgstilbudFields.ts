import { ValidationError, ValidationResult } from '@navikt/sif-common-formik-ds/lib/validation/types';
import { durationToDecimalDuration, summarizeDurationInDurationWeekdays } from '@navikt/sif-common-utils';
import { OmsorgstilbudFormValues } from '../types/_SøknadFormValues';
import { AppFieldValidationErrors } from './fieldValidations';
import { YesOrNoOrDoNotKnow } from '../types/_YesOrNoOrDoNotKnow';

export const validateOmsorgstilbud = (omsorgstilbud: OmsorgstilbudFormValues): ValidationResult<ValidationError> => {
    if (
        omsorgstilbud.erIOmsorgstilbudFortid === YesOrNoOrDoNotKnow.YES ||
        omsorgstilbud.erIOmsorgstilbudFremtid === YesOrNoOrDoNotKnow.YES
    ) {
        const { fasteDager } = omsorgstilbud;

        const hoursInTotal = fasteDager
            ? durationToDecimalDuration(summarizeDurationInDurationWeekdays(fasteDager))
            : 0;
        if (hoursInTotal === 0) {
            return AppFieldValidationErrors.omsorgstilbud_gruppe_ingenInfo;
        }
        if (hoursInTotal > 37.5) {
            return AppFieldValidationErrors.omsorgstilbud_gruppe_forMangeTimerTotalt;
        }
    }
    return undefined;
};
