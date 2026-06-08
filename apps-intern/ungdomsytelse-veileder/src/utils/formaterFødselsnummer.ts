import { getFødselsnummerValidator } from '@navikt/sif-validation';
import { TextfieldFormatter } from '../hooks/useTextFieldFormatter';

const fnrValidator = getFødselsnummerValidator({ required: true, allowHnr: true });

const formaterFødselsnummer = (value?: string): string => {
    const fnr = value ? value.replace(/[^0-9]/g, '') : '';
    const err = fnrValidator(fnr);
    if (!err) {
        return `${fnr.slice(0, 6)} ${fnr.slice(6)}`;
    }
    return value || '';
};
const clearFødselsnummerFormat = (value?: string): string => {
    const fnr = value ? value.replace(/[^0-9]/g, '') : '';
    const err = fnrValidator(fnr);
    if (!err) {
        return (value || '').replace(' ', '');
    }
    return value || '';
};

export const fødselsnummerFormatter: TextfieldFormatter = {
    applyFormat: formaterFødselsnummer,
    clearFormat: clearFødselsnummerFormat,
};
