import React from 'react';
import { FormikConfig, FormikProps } from 'formik';
export interface TypedFormikWrapperProps<FormValues> extends Omit<Partial<FormikProps<FormValues>>, 'initialValues'> {
    initialValues: Partial<FormValues>;
    renderForm: (formik: FormikProps<FormValues>) => React.ReactNode;
    onSubmit: (values: Partial<FormValues>) => void;
}
declare type Props<FormValues> = TypedFormikWrapperProps<FormValues> & FormikConfig<Partial<FormValues>>;
declare function TypedFormikWrapper<FormValues>(props: Props<FormValues>): JSX.Element;
export default TypedFormikWrapper;
//# sourceMappingURL=TypedFormikWrapper.d.ts.map