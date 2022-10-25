import { getTypedFormComponents } from '@navikt/sif-common-formik-ds/lib/components/getTypedFormComponents';
import { getCheckedValidator } from '@navikt/sif-common-formik-ds/lib/validation';
import React, { useState } from 'react';
import { useSøknadContext } from '../../context/hooks/useSøknadContext';
import SøknadSteg from '../../SøknadSteg';
import { StegID } from '../../søknadStegConfig';
import { getOppsummeringStegInitialValues } from './oppsummeringUtils';

enum OppsummeringFormFields {
    harBekreftetOpplysninger = 'harBekreftetOpplysninger',
}

export interface OppsummeringFormValues {
    [OppsummeringFormFields.harBekreftetOpplysninger]: boolean;
}

const { FormikWrapper, Form, ConfirmationCheckbox } = getTypedFormComponents<
    OppsummeringFormFields,
    OppsummeringFormValues
>();

const OppsummeringSteg = () => {
    const { state } = useSøknadContext();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = () => {
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
        }, 2000);
    };

    return (
        <SøknadSteg stegID={StegID.OPPSUMMERING}>
            <FormikWrapper
                initialValues={getOppsummeringStegInitialValues(state.søknadsdata)}
                onSubmit={handleSubmit}
                renderForm={() => {
                    return (
                        <Form
                            submitDisabled={isSubmitting}
                            includeValidationSummary={true}
                            submitButtonLabel="Gå videre"
                            submitPending={isSubmitting}>
                            <ConfirmationCheckbox
                                label="Bekrefter opplysninger"
                                validate={getCheckedValidator()}
                                name={OppsummeringFormFields.harBekreftetOpplysninger}
                            />
                        </Form>
                    );
                }}></FormikWrapper>
        </SøknadSteg>
    );
};

export default OppsummeringSteg;
