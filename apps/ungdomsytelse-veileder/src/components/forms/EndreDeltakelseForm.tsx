import { Alert, Heading, VStack } from '@navikt/ds-react';
import { FormikDatepicker, TypedFormikForm, TypedFormikWrapper } from '@navikt/sif-common-formik-ds';
import { useState } from 'react';
import { Deltakelse } from '../../api/types';
import { veilederService } from '../../api/services/veilederService';
import { getDateValidator } from '@navikt/sif-common-formik-ds/src/validation';
import { dateToISODate } from '@navikt/sif-common-utils';

type DeltakelseFormValues = {
    id: string;
    fnr: string;
    fom: string;
    tom?: string;
};

interface Props {
    deltakelse?: Deltakelse;
}

const EndreDeltakelseForm = ({ deltakelse }: Props) => {
    const [pending, setIsPending] = useState(false);
    const [error, setError] = useState<string>();

    const endreDeltakelse = async (values: DeltakelseFormValues) => {
        setError(undefined);
        setIsPending(true);
        if (deltakelse) {
            await veilederService
                .updateDeltakelse({
                    id: deltakelse.id,
                    deltakerIdent: deltakelse.deltakerIdent,
                    fraOgMed: values.fom,
                    tilOgMed: values.tom,
                })
                .catch((e) => {
                    setError(e.message);
                })
                .then(() => {
                    setIsPending(false);
                });
        }
    };

    const getInitialValues = (d: Deltakelse): DeltakelseFormValues => {
        return {
            fnr: d.deltakerIdent,
            id: d.id,
            fom: dateToISODate(d.fraOgMed),
            tom: d.tilOgMed ? dateToISODate(d.tilOgMed) : '',
        };
    };
    return (
        <TypedFormikWrapper<DeltakelseFormValues>
            initialValues={deltakelse ? getInitialValues(deltakelse) : {}}
            onSubmit={endreDeltakelse}
            renderForm={() => {
                return (
                    <VStack gap="6">
                        <Heading level="2" size="small" spacing={true}>
                            Endre deltakelse {deltakelse ? deltakelse.id : undefined}
                        </Heading>
                        {deltakelse === undefined ? (
                            <Alert variant="info">Hent deltakelse først</Alert>
                        ) : (
                            <TypedFormikForm submitPending={pending} submitButtonLabel="Endre" showButtonArrows={false}>
                                <VStack gap="6">
                                    <FormikDatepicker
                                        name="fom"
                                        label="Fra og med"
                                        validate={getDateValidator({ required: true })}
                                    />
                                    <FormikDatepicker name="tom" label="Til og med" />
                                </VStack>
                            </TypedFormikForm>
                        )}
                        {error && <Alert variant="error">{error}</Alert>}
                    </VStack>
                );
            }}
        />
    );
};

export default EndreDeltakelseForm;
