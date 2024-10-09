import { Alert, BodyShort, Button, Heading, VStack } from '@navikt/ds-react';
import { FormikDatepicker, FormikTextField, TypedFormikForm, TypedFormikWrapper } from '@navikt/sif-common-formik-ds';
import { getDateValidator, getFødselsnummerValidator } from '@navikt/sif-common-formik-ds/src/validation';
import { veilederService } from '../../api/services/veilederService';
import { useState } from 'react';
import { Deltakelse } from '../../api/types';

type DeltakelseFormValues = {
    fnr: string;
    fom: string;
    tom?: string;
};

const LeggTilDeltakelseForm = () => {
    const [pending, setIsPending] = useState(false);
    const [initialValues] = useState<Partial<DeltakelseFormValues>>({
        fnr: '56857102105',
        fom: '2025-07-01',
    });
    const [deltakelse, setDeltakelse] = useState<Deltakelse | undefined>();

    const leggTilDeltakelse = async (values: DeltakelseFormValues) => {
        setIsPending(true);
        const deltakelseResponse = await veilederService.createDeltakelse({
            deltakerIdent: values.fnr,
            fraOgMed: values.fom,
            tilOgMed: values.tom,
        });
        setIsPending(false);
        setDeltakelse(deltakelseResponse);
    };

    return (
        <TypedFormikWrapper<DeltakelseFormValues>
            initialValues={initialValues}
            onSubmit={leggTilDeltakelse}
            renderForm={({ setValues }) => {
                return (
                    <VStack gap="6">
                        <TypedFormikForm
                            includeButtons={true}
                            submitPending={pending}
                            submitButtonLabel="Legg til"
                            showButtonArrows={false}>
                            <Heading level="2" size="small" spacing={true}>
                                Legg til deltakelse
                            </Heading>
                            <VStack gap="6">
                                <FormikTextField
                                    width="m"
                                    name="fnr"
                                    label="Fødselsnummer"
                                    validate={getFødselsnummerValidator({ required: true })}
                                />
                                <FormikDatepicker
                                    name="fom"
                                    label="Fra og med"
                                    validate={getDateValidator({ required: true })}
                                />
                                <FormikDatepicker name="tom" label="Til og med" />
                            </VStack>
                        </TypedFormikForm>

                        {deltakelse && (
                            <Alert variant="info">
                                <BodyShort>Respons</BodyShort>
                                <pre style={{ fontSize: '.8rem' }}>{JSON.stringify(deltakelse, null, 2)}</pre>
                                <Button
                                    type="button"
                                    onClick={(evt) => {
                                        evt.stopPropagation();
                                        evt.preventDefault();
                                        setValues({});
                                        setDeltakelse(undefined);
                                    }}>
                                    Reset
                                </Button>
                            </Alert>
                        )}
                    </VStack>
                );
            }}
        />
    );
};

export default LeggTilDeltakelseForm;
