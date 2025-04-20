import { Alert, Box, VStack } from '@navikt/ds-react';
import { TypedFormikForm, TypedFormikWrapper } from '@navikt/sif-common-formik-ds';
import { dateToISODate } from '@navikt/sif-common-utils';
import { Deltakelse, Deltaker, formaterNavn } from '@navikt/ung-common';
import PeriodeFormPart from '../periode-form-part/PeriodeFormPart';
import { useEndreStartdatoForDeltakelse } from '../../hooks/useEndreStartdatoForDeltakelse';

export type EndreStartdatoFormValues = {
    id: string;
    fnr: string;
    fom: string;
};

interface Props {
    deltaker: Deltaker;
    deltakelse: Deltakelse;
    onCancel?: () => void;
    onDeltakelseChanged: (oppdatertDeltakelse: Deltakelse) => void;
}

const EndreStartdatoForm = ({ deltakelse, deltaker, onCancel, onDeltakelseChanged }: Props) => {
    const { mutate, isPending, error } = useEndreStartdatoForDeltakelse({
        deltakelseId: deltakelse.id,
        deltakerId: deltaker.id,
    });

    const deltakernavn = formaterNavn(deltaker.navn);

    return (
        <Box>
            <TypedFormikWrapper<EndreStartdatoFormValues>
                initialValues={{
                    fom: dateToISODate(deltakelse.fraOgMed),
                }}
                onSubmit={(values: EndreStartdatoFormValues) => {
                    if (!values.fom) {
                        return;
                    }
                    mutate(
                        {
                            dato: values.fom,
                        },
                        {
                            onSuccess: (deltakelse) => {
                                onDeltakelseChanged(deltakelse);
                            },
                        },
                    );
                }}
                renderForm={() => {
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
                                        visSluttdato={false}
                                        visStartdato={true}
                                        tomDate={deltakelse.tilOgMed}
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

export default EndreStartdatoForm;
