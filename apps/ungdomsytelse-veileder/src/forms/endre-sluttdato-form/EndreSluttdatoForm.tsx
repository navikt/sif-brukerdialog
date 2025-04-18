import { Alert, Box, VStack } from '@navikt/ds-react';
import { TypedFormikForm, TypedFormikWrapper } from '@navikt/sif-common-formik-ds';
import { ISODateToDate } from '@navikt/sif-common-utils';
import { Deltakelse, Deltaker, formaterNavn } from '@navikt/ung-common';
import { useEndreDeltakelse } from '../../hooks/useEndreDeltakelse';
import PeriodeFormPart from '../periode-form-part/PeriodeFormPart';

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
    const { endreSluttdato, pending, error } = useEndreDeltakelse(onDeltakelseChanged);

    const deltakernavn = formaterNavn(deltaker.navn);

    return (
        <Box>
            <TypedFormikWrapper<EndreSluttdatoFormValues>
                initialValues={{}}
                onSubmit={(values) => {
                    endreSluttdato(deltakelse, ISODateToDate(values.tom));
                }}
                renderForm={({ values }) => {
                    const tomDate = values.tom ? ISODateToDate(values.tom) : undefined;
                    return (
                        <VStack gap="6">
                            <TypedFormikForm
                                submitPending={pending}
                                showSubmitButton={false}
                                submitButtonLabel="Endre"
                                showButtonArrows={false}>
                                <VStack gap="6">
                                    <PeriodeFormPart
                                        deltakernavn={deltakernavn}
                                        visSluttdato={true}
                                        visStartdato={false}
                                        tomDate={tomDate}
                                        pending={pending}
                                        onCancel={onCancel}
                                    />
                                    {error ? (
                                        <Alert variant="error">
                                            <>
                                                {error.error.type}
                                                <br />
                                                {error.error.message}
                                            </>
                                        </Alert>
                                    ) : null}
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
