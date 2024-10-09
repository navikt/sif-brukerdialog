import { Heading, VStack } from '@navikt/ds-react';
import { TypedFormikForm, TypedFormikWrapper } from '@navikt/sif-common-formik-ds';
import { useState } from 'react';

type DeltakelseFormValues = {
    fnr: string;
    fom: string;
    tom?: string;
};

const EndreDeltakelseForm = () => {
    const [pending, setIsPending] = useState(false);
    const [initialValues] = useState<Partial<DeltakelseFormValues>>({
        fnr: '56857102105',
        fom: '2025-07-01',
    });

    const endreDeltakelse = async () => {
        setIsPending(true);
        setIsPending(false);
    };

    return (
        <TypedFormikWrapper<DeltakelseFormValues>
            initialValues={initialValues}
            onSubmit={endreDeltakelse}
            renderForm={() => {
                return (
                    <VStack gap="6">
                        <TypedFormikForm submitPending={pending} submitButtonLabel="Legg til" showButtonArrows={false}>
                            <Heading level="2" size="small" spacing={true}>
                                Endre deltakelse
                            </Heading>
                        </TypedFormikForm>
                    </VStack>
                );
            }}
        />
    );
};

export default EndreDeltakelseForm;
