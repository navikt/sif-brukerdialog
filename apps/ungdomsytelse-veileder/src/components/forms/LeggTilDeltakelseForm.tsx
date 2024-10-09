import { Alert, BodyShort, Box, Button, Heading, HStack, VStack } from '@navikt/ds-react';
import { FormikDatepicker, TypedFormikForm, TypedFormikWrapper } from '@navikt/sif-common-formik-ds';
import { getDateValidator } from '@navikt/sif-common-formik-ds/src/validation';
import { veilederService } from '../../api/services/veilederService';
import { useState } from 'react';
import { Deltakelse } from '../../api/types';

type DeltakelseFormValues = {
    fnr: string;
    fom: string;
    tom?: string;
};

interface Props {
    deltakerFnr: string;
}

const LeggTilDeltakelseForm = ({ deltakerFnr }: Props) => {
    const [pending, setIsPending] = useState(false);
    const [initialValues] = useState<Partial<DeltakelseFormValues>>({
        fnr: deltakerFnr,
    });
    const [deltakelse, setDeltakelse] = useState<Deltakelse | undefined>();
    const [error, setError] = useState<string>();

    const leggTilDeltakelse = async (values: DeltakelseFormValues) => {
        setError(undefined);
        setDeltakelse(undefined);
        setIsPending(true);
        await veilederService
            .createDeltakelse({
                deltakerIdent: deltakerFnr,
                fraOgMed: values.fom,
                tilOgMed: values.tom,
            })
            .catch((e) => {
                setError(e.message);
            })
            .then((deltakelseResponse) => {
                setIsPending(false);
                if (deltakelseResponse) {
                    setDeltakelse(deltakelseResponse);
                }
            });
    };

    return (
        <Box borderRadius="medium" background="bg-subtle" padding="8">
            <TypedFormikWrapper<DeltakelseFormValues>
                initialValues={initialValues}
                onSubmit={leggTilDeltakelse}
                renderForm={({ setValues }) => {
                    return (
                        <VStack gap="6">
                            <TypedFormikForm
                                submitPending={pending}
                                submitButtonLabel="Legg til"
                                showButtonArrows={false}>
                                <Heading level="2" size="small" spacing={true}>
                                    Legg til deltakelse
                                </Heading>
                                <HStack gap="6">
                                    <FormikDatepicker
                                        name="fom"
                                        label="Fra og med"
                                        validate={getDateValidator({ required: true })}
                                    />
                                    <FormikDatepicker name="tom" label="Til og med" />
                                </HStack>
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
                                            setError(undefined);
                                            setDeltakelse(undefined);
                                        }}>
                                        Reset
                                    </Button>
                                </Alert>
                            )}
                            {error && <Alert variant="error">{error}</Alert>}
                        </VStack>
                    );
                }}
            />
        </Box>
    );
};

export default LeggTilDeltakelseForm;
