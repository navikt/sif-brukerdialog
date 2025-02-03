import { getFødselsnummerValidator } from '@navikt/sif-common-formik-ds/src/validation';
import { TextfieldFormatter } from '../hooks/useTextFieldFormatter';

const fnrValidator = getFødselsnummerValidator({ required: true, allowHnr: true });

const formatFnr = (value?: string): string => {
    const fnr = value ? value.replace(/[^0-9]/g, '') : '';
    const err = fnrValidator(fnr);
    if (!err) {
        return `${fnr.slice(0, 6)} ${fnr.slice(6)}`;
    }
    return value || '';
};
const clearFnrFormat = (value?: string): string => {
    const fnr = value ? value.replace(/[^0-9]/g, '') : '';
    const err = fnrValidator(fnr);
    if (!err) {
        return (value || '').replace(' ', '');
    }
    return value || '';
};

export const fnrFormatter: TextfieldFormatter = {
    applyFormat: formatFnr,
    clearFormat: clearFnrFormat,
};
