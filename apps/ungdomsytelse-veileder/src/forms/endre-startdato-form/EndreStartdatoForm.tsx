import { Alert, Box, VStack } from '@navikt/ds-react';
import { TypedFormikForm, TypedFormikWrapper } from '@navikt/sif-common-formik-ds';
import { dateToISODate, ISODateToDate } from '@navikt/sif-common-utils';
import { Deltakelse, Deltaker, formaterNavn } from '@navikt/ung-common';
import { useEndreDeltakelse } from '../../hooks/useEndreDeltakelse';
import PeriodeFormPart from '../periode-form-part/PeriodeFormPart';

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
    const { endreStartdato, pending, error } = useEndreDeltakelse(onDeltakelseChanged);

    const deltakernavn = formaterNavn(deltaker.navn);

    return (
        <Box>
            <TypedFormikWrapper<EndreStartdatoFormValues>
                initialValues={{
                    fom: dateToISODate(deltakelse.fraOgMed),
                }}
                onSubmit={(values: EndreStartdatoFormValues) => {
                    endreStartdato(deltakelse, ISODateToDate(values.fom));
                }}
                renderForm={() => {
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
                                        visSluttdato={false}
                                        visStartdato={true}
                                        tomDate={deltakelse.tilOgMed}
                                        pending={pending}
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
