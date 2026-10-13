import { TextFieldProps } from '@navikt/ds-react';
import { FieldValues, Path } from 'react-hook-form';
import { useIntl } from 'react-intl';

import { getNumberInputFormatter } from '../utils/numberInputUtils';
import { SifTextField } from './SifTextField';

type Props<T extends FieldValues> = Omit<TextFieldProps, 'name'> & {
    name: Path<T>;
    validate?: (value: string) => string | undefined;
    integerValue?: boolean;
    useFormatting?: boolean;
    useIntlFormatting?: boolean;
};

export function SifNumberInput<T extends FieldValues>({
    integerValue = false,
    useFormatting = true,
    useIntlFormatting = true,
    ...rest
}: Props<T>) {
    const intl = useIntl();

    return (
        <SifTextField<T>
            {...rest}
            type="text"
            inputMode={integerValue ? 'numeric' : 'decimal'}
            pattern={integerValue ? '[0-9]*' : undefined}
            formatter={
                useFormatting ? getNumberInputFormatter(integerValue, useIntlFormatting ? intl : undefined) : undefined
            }
        />
    );
}
