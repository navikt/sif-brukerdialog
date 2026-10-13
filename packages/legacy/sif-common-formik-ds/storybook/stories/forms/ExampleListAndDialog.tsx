import { Fieldset } from '@navikt/ds-react';
import * as React from 'react';
import { FormikModalFormAndList, TypedFormInputValidationProps } from '../../../src';
import { ModalFormAndListLabels } from '../../../src/components/formik-modal-form/types';

interface Props<FieldName> extends TypedFormInputValidationProps<FieldName, string> {
    name: FieldName;
    labels: ModalFormAndListLabels;
}

function ExampleListAndDialog<FieldName>({ name, labels, validate }: Props<FieldName>) {
    return (
        <FormikModalFormAndList<FieldName, any, string>
            name={name}
            dialogWidth="wide"
            labels={labels}
            validate={validate ? (value) => validate(value, name) : undefined}
            maxItems={3}
            formRenderer={() => <>This is the form</>}
            listRenderer={() => <Fieldset legend={'Add some items'}>This is the list</Fieldset>}
        />
    );
}

export default ExampleListAndDialog;
