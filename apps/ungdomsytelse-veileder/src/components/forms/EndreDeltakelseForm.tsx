import { Alert, BodyShort, Button, Heading, VStack } from '@navikt/ds-react';
import { FormikDatepicker, FormikTextField, TypedFormikForm, TypedFormikWrapper } from '@navikt/sif-common-formik-ds';
import {
    getDateValidator,
    getFødselsnummerValidator,
    getRequiredFieldValidator,
} from '@navikt/sif-common-formik-ds/src/validation';
import { veilederService } from '../../api/services/veilederService';
import { useState } from 'react';
import { Deltakelse } from '../../api/types';

type DeltakelseFormValues = {
    id: string;
    fnr: string;
    fom: string;
    tom?: string;
};

interface Props {
    deltakerFnr: string;
}

const EndreDeltakelseForm = ({ deltakerFnr }: Props) => {
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
                deltakerIdent: values.fnr,
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
        <TypedFormikWrapper<DeltakelseFormValues>
            initialValues={initialValues}
            onSubmit={leggTilDeltakelse}
            renderForm={({ setValues }) => {
                return (
                    <VStack gap="6">
                        <TypedFormikForm submitPending={pending} submitButtonLabel="Endre" showButtonArrows={false}>
                            <Heading level="2" size="small" spacing={true}>
                                Endre deltakelse
                            </Heading>
                            <VStack gap="6">
                                <FormikTextField
                                    width="m"
                                    name="fnr"
                                    disabled={true}
                                    label="Fødselsnummer"
                                    validate={getFødselsnummerValidator({ required: true })}
                                />
                                <FormikTextField
                                    width="m"
                                    name="id"
                                    label="Deltakelse ID"
                                    validate={getRequiredFieldValidator()}
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
    );
};

export default EndreDeltakelseForm;
