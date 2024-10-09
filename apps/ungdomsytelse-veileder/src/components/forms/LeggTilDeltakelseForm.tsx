import { Alert, Box, Button, Heading, HStack, ReadMore, VStack } from '@navikt/ds-react';
import { FormikDatepicker, TypedFormikForm, TypedFormikWrapper } from '@navikt/sif-common-formik-ds';
import { getDateValidator } from '@navikt/sif-common-formik-ds/src/validation';
import { veilederService } from '../../api/services/veilederService';
import { useState } from 'react';
import { Deltakelse } from '../../api/types';
import { PlusCircleIcon } from '@navikt/aksel-icons';

type DeltakelseFormValues = {
    fnr: string;
    fom: string;
    tom?: string;
};

interface Props {
    deltakerFnr: string;
}

const LeggTilDeltakelseForm = ({ deltakerFnr }: Props) => {
    const [showForm, setShowForm] = useState(false);
    const [pending, setPending] = useState(false);
    const [initialValues] = useState<Partial<DeltakelseFormValues>>({
        fnr: deltakerFnr,
    });
    const [deltakelse, setDeltakelse] = useState<Deltakelse | undefined>();
    const [error, setError] = useState<string>();

    const leggTilDeltakelse = async (values: DeltakelseFormValues) => {
        setError(undefined);
        setDeltakelse(undefined);
        setPending(true);
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
                setPending(false);

                if (deltakelseResponse) {
                    setDeltakelse(deltakelseResponse);
                }
            });
    };

    if (showForm === false) {
        return (
            <Box>
                <Button
                    type="button"
                    variant="tertiary"
                    icon={<PlusCircleIcon />}
                    onClick={() => {
                        setShowForm(true);
                    }}>
                    Legg til ny
                </Button>
            </Box>
        );
    }
    return (
        <Box borderRadius="large" background="bg-subtle" padding="6">
            <TypedFormikWrapper<DeltakelseFormValues>
                initialValues={initialValues}
                onSubmit={leggTilDeltakelse}
                renderForm={({ setValues }) => {
                    return (
                        <VStack gap="6">
                            <TypedFormikForm
                                submitPending={pending}
                                submitButtonLabel="Legg til"
                                showSubmitButton={false}>
                                <Heading level="2" size="small" spacing={true}>
                                    Legg til deltakelse
                                </Heading>

                                {deltakelse ? (
                                    <VStack gap="6">
                                        <Alert variant="info">
                                            <Heading level="3" size="small">
                                                Deltakelse er lagt til
                                            </Heading>
                                            <ReadMore header="Vis respons">
                                                <pre style={{ fontSize: '.8rem' }}>
                                                    {JSON.stringify(deltakelse, null, 2)}
                                                </pre>
                                            </ReadMore>
                                        </Alert>
                                        <Box>
                                            <Button
                                                type="button"
                                                variant="primary"
                                                onClick={(evt) => {
                                                    evt.stopPropagation();
                                                    evt.preventDefault();
                                                    setValues({});
                                                    setError(undefined);
                                                    setShowForm(false);
                                                    setDeltakelse(undefined);
                                                }}>
                                                Ok, lukk melding
                                            </Button>
                                        </Box>
                                    </VStack>
                                ) : (
                                    <VStack gap="6">
                                        <HStack gap="6">
                                            <FormikDatepicker
                                                name="fom"
                                                label="Fra og med"
                                                validate={getDateValidator({ required: true })}
                                            />
                                            <FormikDatepicker name="tom" label="Til og med" />
                                        </HStack>
                                        <HStack gap="6">
                                            <Button type="submit" loading={pending} icon={<PlusCircleIcon />}>
                                                Legg til
                                            </Button>
                                            <Button
                                                type="button"
                                                variant="secondary"
                                                onClick={(evt) => {
                                                    evt.stopPropagation();
                                                    evt.preventDefault();
                                                    setValues({});
                                                    setDeltakelse(undefined);
                                                    setShowForm(false);
                                                }}>
                                                Avbryt
                                            </Button>
                                        </HStack>
                                    </VStack>
                                )}
                            </TypedFormikForm>

                            {error && <Alert variant="error">{error}</Alert>}
                        </VStack>
                    );
                }}
            />
        </Box>
    );
};

export default LeggTilDeltakelseForm;
