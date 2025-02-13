import {
    ValidateDateError,
    ValidateDateRangeError,
    ValidateStringError,
    ValidateYesOrNoError,
} from '@navikt/sif-validation';
import { KursperiodeFormFields } from './KursperiodeForm';
import { KursperiodeMessageKeys } from './kursperiodeMessages';

export const KursperiodeFormErrors: Record<KursperiodeFormFields, { [key: string]: KursperiodeMessageKeys }> = {
    [KursperiodeFormFields.fom]: {
        [ValidateDateError.dateHasNoValue]: 'kursperiodeForm.fom.dateHasNoValue',
        [ValidateDateRangeError.fromDateIsAfterToDate]: 'kursperiodeForm.fom.fromDateIsAfterToDate',
        [ValidateDateError.dateHasInvalidFormat]: 'kursperiodeForm.fom.dateHasInvalidFormat',
        [ValidateDateError.dateIsBeforeMin]: 'kursperiodeForm.fom.dateIsBeforeMin',
        [ValidateDateError.dateIsAfterMax]: 'kursperiodeForm.fom.dateIsAfterMax',
    },
    [KursperiodeFormFields.tom]: {
        [ValidateDateError.dateHasNoValue]: 'kursperiodeForm.tom.dateHasNoValue',
        [ValidateDateRangeError.toDateIsBeforeFromDate]: 'kursperiodeForm.tom.toDateIsBeforeFromDate',
        [ValidateDateError.dateHasInvalidFormat]: 'kursperiodeForm.tom.dateHasInvalidFormat',
        [ValidateDateError.dateIsBeforeMin]: 'kursperiodeForm.tom.dateIsBeforeMin',
        [ValidateDateError.dateIsAfterMax]: 'kursperiodeForm.tom.dateIsAfterMax',
    },
    [KursperiodeFormFields.avreise]: {
        [ValidateDateError.dateHasNoValue]: 'kursperiodeForm.avreise.dateHasNoValue',
        [ValidateDateError.dateHasInvalidFormat]: 'kursperiodeForm.avreise.dateHasInvalidFormat',
        [ValidateDateError.dateIsBeforeMin]: 'kursperiodeForm.avreise.dateIsBeforeMin',
        [ValidateDateError.dateIsAfterMax]: 'kursperiodeForm.avreise.dateIsAfterMax',
    },
    [KursperiodeFormFields.hjemkomst]: {
        [ValidateDateError.dateHasNoValue]: 'kursperiodeForm.hjemkomst.dateHasNoValue',
        [ValidateDateError.dateHasInvalidFormat]: 'kursperiodeForm.hjemkomst.dateHasInvalidFormat',
        [ValidateDateError.dateIsBeforeMin]: 'kursperiodeForm.hjemkomst.dateIsBeforeMin',
        [ValidateDateError.dateIsAfterMax]: 'kursperiodeForm.hjemkomst.dateIsAfterMax',
    },
    [KursperiodeFormFields.avreiseSammeDag]: {
        [ValidateYesOrNoError.yesOrNoIsUnanswered]: 'kursperiodeForm.avreiseSammeDag.yesOrNoIsUnanswered',
    },
    [KursperiodeFormFields.hjemkomstSammeDag]: {
        [ValidateYesOrNoError.yesOrNoIsUnanswered]: 'kursperiodeForm.hjemkomstSammeDag.yesOrNoIsUnanswered',
    },
    [KursperiodeFormFields.beskrivelseReisetidHjem]: {
        [ValidateStringError.stringHasNoValue]: 'kursperiodeForm.begrunnelseReisetidFra.stringHasNoValue',
        [ValidateStringError.stringIsTooLong]: 'kursperiodeForm.begrunnelseReisetidFra.stringIsTooLong',
        [ValidateStringError.stringIsTooShort]: 'kursperiodeForm.begrunnelseReisetidFra.stringIsTooShort',
        [ValidateStringError.stringContainsUnicodeChacters]:
            'kursperiodeForm.begrunnelseReisetidFra.stringContainsUnicodeChacters',
    },
    [KursperiodeFormFields.beskrivelseReisetidTil]: {
        [ValidateStringError.stringHasNoValue]: 'kursperiodeForm.beskrivelseReisetidTil.stringHasNoValue',
        [ValidateStringError.stringIsTooLong]: 'kursperiodeForm.beskrivelseReisetidTil.stringIsTooLong',
        [ValidateStringError.stringIsTooShort]: 'kursperiodeForm.beskrivelseReisetidTil.stringIsTooShort',
        [ValidateStringError.stringContainsUnicodeChacters]:
            'kursperiodeForm.beskrivelseReisetidTil.stringContainsUnicodeChacters',
    },
};
