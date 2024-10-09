import { Button, HStack, VStack } from '@navikt/ds-react';
import { FormikDatepicker, TypedFormikForm, TypedFormikWrapper } from '@navikt/sif-common-formik-ds';
import { useState } from 'react';
import { Deltakelse } from '../../api/types';
import { getDateValidator } from '@navikt/sif-common-formik-ds/src/validation';
import { dateToISODate } from '@navikt/sif-common-utils';
import ConfirmationDialog from '@navikt/sif-common-formik-ds/src/components/helpers/confirmation-dialog/ConfirmationDialog';
import { useSlettDeltakelse } from '../../hooks/useSlettDeltakelse';
import { useEndreDeltakelse } from '../../hooks/useEndreDeltakelse';

export type DeltakelseFormValues = {
    id: string;
    fnr: string;
    fom: string;
    tom?: string;
};

interface Props {
    deltakelse: Deltakelse;
    onDeltakelseSlettet: (deltakelse: Deltakelse) => void;
    onDeltakelseEndret: (deltakelse: Deltakelse) => void;
}

const EndreDeltakelseForm = ({ deltakelse, onDeltakelseEndret, onDeltakelseSlettet }: Props) => {
    const [confirmationDialogVisible, setConfirmationDialogVisible] = useState(false);

    const { pending: slettDeltakelsePending, slettDeltakelse } = useSlettDeltakelse(onDeltakelseSlettet);
    const { pending: endreDeltakelsePending, endreDeltakelse } = useEndreDeltakelse(onDeltakelseEndret);

    const getInitialValues = (d: Deltakelse): DeltakelseFormValues => {
        return {
            fnr: d.deltakerIdent,
            id: d.id,
            fom: dateToISODate(d.fraOgMed),
            tom: d.tilOgMed ? dateToISODate(d.tilOgMed) : '',
        };
    };

    return (
        <>
            <TypedFormikWrapper<DeltakelseFormValues>
                initialValues={deltakelse ? getInitialValues(deltakelse) : {}}
                onSubmit={(values) => endreDeltakelse(deltakelse, values)}
                renderForm={() => {
                    return (
                        <VStack gap="6">
                            <TypedFormikForm
                                submitPending={endreDeltakelsePending}
                                showSubmitButton={false}
                                submitButtonLabel="Endre"
                                showButtonArrows={false}>
                                <VStack gap="6">
                                    <HStack gap="6">
                                        <FormikDatepicker
                                            name="fom"
                                            label="Fra og med"
                                            validate={getDateValidator({ required: true })}
                                        />
                                        <FormikDatepicker name="tom" label="Til og med" />
                                    </HStack>
                                    <HStack gap="8">
                                        <Button type="submit" loading={endreDeltakelsePending} variant="primary">
                                            Oppdater
                                        </Button>
                                        <Button
                                            type="button"
                                            loading={slettDeltakelsePending}
                                            variant="tertiary"
                                            onClick={(evt) => {
                                                evt.stopPropagation();
                                                evt.preventDefault();
                                                setConfirmationDialogVisible(true);
                                            }}>
                                            Slett
                                        </Button>
                                    </HStack>
                                </VStack>
                            </TypedFormikForm>
                        </VStack>
                    );
                }}
            />
            <ConfirmationDialog
                onCancel={() => {
                    setConfirmationDialogVisible(false);
                }}
                onConfirm={() => {
                    slettDeltakelse(deltakelse);
                }}
                open={confirmationDialogVisible}
                title="Bekreft slett periode">
                Bekreft
            </ConfirmationDialog>
        </>
    );
};

export default EndreDeltakelseForm;
