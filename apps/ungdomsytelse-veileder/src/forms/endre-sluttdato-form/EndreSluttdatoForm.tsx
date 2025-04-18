import { Alert, Box, VStack } from '@navikt/ds-react';
import { TypedFormikForm, TypedFormikWrapper } from '@navikt/sif-common-formik-ds';
import { ISODateToDate } from '@navikt/sif-common-utils';
import { Deltakelse, Deltaker, formaterNavn } from '@navikt/ung-common';
import PeriodeFormPart from '../periode-form-part/PeriodeFormPart';
import { useEndreSluttdatoForDeltakelse } from '../../hooks/useEndreSluttdatoForDeltakelse';

export type EndreSluttdatoFormValues = {
    id: string;
    fnr: string;
    fom: string;
    tom?: string;
};

interface Props {
    deltaker: Deltaker;
    deltakelse: Deltakelse;
    onCancel?: () => void;
    onDeltakelseChanged: (deltakelse: Deltakelse) => void;
}

const EndreSluttdatoForm = ({ deltakelse, deltaker, onCancel, onDeltakelseChanged }: Props) => {
    const { mutate, isPending, error } = useEndreSluttdatoForDeltakelse({
        deltakerId: deltaker.id,
        deltakelseId: deltakelse.id,
    });
    const deltakernavn = formaterNavn(deltaker.navn);
    return (
        <Box>
            <TypedFormikWrapper<EndreSluttdatoFormValues>
                initialValues={{}}
                onSubmit={(values: EndreSluttdatoFormValues) => {
                    mutate(
                        {
                            dato: values.tom!,
                        },
                        {
                            onSuccess: (deltakelse) => {
                                onDeltakelseChanged(deltakelse);
                            },
                        },
                    );
                }}
                renderForm={({ values }) => {
                    const tomDate = values.tom ? ISODateToDate(values.tom) : undefined;
                    return (
                        <VStack gap="6">
                            <TypedFormikForm
                                submitPending={isPending}
                                showSubmitButton={false}
                                submitButtonLabel="Endre"
                                showButtonArrows={false}>
                                <VStack gap="6">
                                    <PeriodeFormPart
                                        deltakernavn={deltakernavn}
                                        visSluttdato={true}
                                        visStartdato={false}
                                        tomDate={tomDate}
                                        pending={isPending}
                                        onCancel={onCancel}
                                    />
                                    {error ? <Alert variant="error">{error.error.message}</Alert> : null}
                                </VStack>
                            </TypedFormikForm>
                        </VStack>
                    );
                }}
            />
        </Box>
    );
};

export default EndreSluttdatoForm;
