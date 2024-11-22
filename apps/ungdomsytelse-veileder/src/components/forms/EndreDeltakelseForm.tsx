import { Button, HStack, VStack } from '@navikt/ds-react';
import { TypedFormikForm, TypedFormikWrapper } from '@navikt/sif-common-formik-ds';
import { useState } from 'react';
import { Deltakelse } from '../../api/types';
import { dateToISODate, ISODateToDate } from '@navikt/sif-common-utils';
import ConfirmationDialog from '@navikt/sif-common-formik-ds/src/components/helpers/confirmation-dialog/ConfirmationDialog';
import { useSlettDeltakelse } from '../../hooks/useSlettDeltakelse';
import { useEndreDeltakelse } from '../../hooks/useEndreDeltakelse';
import PeriodeFormPart from './PeriodeFormPart';

export type DeltakelseFormValues = {
    id: string;
    fnr: string;
    fom: string;
    tom?: string;
};

interface Props {
    deltakelse: Deltakelse;
    deltakelser: Deltakelse[];
    onDeltakelseSlettet?: (deltakelse: Deltakelse) => void;
    onDeltakelseEndret?: (deltakelse: Deltakelse) => void;
}

const EndreDeltakelseForm = ({ deltakelse, deltakelser, onDeltakelseEndret, onDeltakelseSlettet }: Props) => {
    const [confirmationDialogVisible, setConfirmationDialogVisible] = useState(false);

    const { pending: slettDeltakelsePending, slettDeltakelse } = useSlettDeltakelse(onDeltakelseSlettet || (() => {}));
    const { pending: endreDeltakelsePending, endreDeltakelse } = useEndreDeltakelse(onDeltakelseEndret || (() => {}));

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
                renderForm={({ values }) => {
                    const fomDate = values.fom ? ISODateToDate(values.fom) : undefined;
                    const tomDate = values.tom ? ISODateToDate(values.tom) : undefined;
                    return (
                        <VStack gap="6">
                            <TypedFormikForm
                                submitPending={endreDeltakelsePending}
                                showSubmitButton={false}
                                submitButtonLabel="Endre"
                                showButtonArrows={false}>
                                <VStack gap="6">
                                    <PeriodeFormPart
                                        fomDate={fomDate}
                                        tomDate={tomDate}
                                        deltakelser={deltakelser}
                                        deltakelseId={deltakelse.id}
                                    />
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
                okLabel="Ja, slett"
                onCancel={() => {
                    setConfirmationDialogVisible(false);
                }}
                onConfirm={() => {
                    slettDeltakelse(deltakelse);
                }}
                open={confirmationDialogVisible}
                title="Bekreft slett periode">
                Bekreft at du ønsker å slette deltakelsesperioden
            </ConfirmationDialog>
        </>
    );
};

export default EndreDeltakelseForm;
