/// <reference types="react" />
import { SelectProps } from '@navikt/ds-react';
import { TestProps, TypedFormInputValidationProps } from '../../types';
interface OwnProps<FieldName> extends Omit<SelectProps, 'name' | 'children'> {
    name: FieldName;
    showOnlyEuAndEftaCountries?: boolean;
    useAlpha3Code?: boolean;
}
export declare type FormikCountrySelectProps<FieldName, ErrorType> = OwnProps<FieldName> & TypedFormInputValidationProps<FieldName, ErrorType> & TestProps;
declare function FormikCountrySelect<FieldName, ErrorType>({ name, error, validate, useAlpha3Code, showOnlyEuAndEftaCountries, ...restProps }: FormikCountrySelectProps<FieldName, ErrorType>): JSX.Element;
export default FormikCountrySelect;
//# sourceMappingURL=FormikCountrySelect.d.ts.map