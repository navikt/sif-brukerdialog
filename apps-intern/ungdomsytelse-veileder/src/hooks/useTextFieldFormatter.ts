import { FocusEventHandler, useState } from 'react';

export interface TextfieldFormatter {
    applyFormat: (value?: string) => string;
    clearFormat: (value?: string) => string;
}

export const useTextFieldFormatter = ({ clearFormat, applyFormat }: TextfieldFormatter) => {
    const [hasFocus, setHasFocus] = useState(false);

    const onBlur: FocusEventHandler<HTMLInputElement> = (evt) => {
        setHasFocus(false);
        const target = evt.target as HTMLInputElement;
        target.value = applyFormat(target.value) || '';
    };
    const onFocus: FocusEventHandler<HTMLInputElement> = (evt) => {
        setHasFocus(true);
        const target = evt.target as HTMLInputElement;
        target.value = clearFormat(target.value) || '';
    };
    return {
        onBlur,
        onFocus,
        hasFocus,
    };
};
