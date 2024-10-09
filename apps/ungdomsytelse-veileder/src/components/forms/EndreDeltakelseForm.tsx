import { Alert, BodyShort, Box, Button, Heading, VStack } from '@navikt/ds-react';
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
    onDeltakelseSlettet: () => void;
}

const EndreDeltakelseForm = ({ deltakelse, onDeltakelseSlettet }: Props) => {
    const [pending, setIsPending] = useState(false);
    const [deletePending, setDeletePending] = useState(false);
    const [error, setError] = useState<string>();

    const [endretDeltakelse, setEndretDeltakelse] = useState<Deltakelse>();

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
                .then((r) => {
                    if (r) {
                        setEndretDeltakelse(r);
                    }
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

    const slettDeltakelse = async (id: string) => {
        setDeletePending(true);
        veilederService
            .deleteDeltakelse(id)
            .then(() => {
                onDeltakelseSlettet();
            })
            .catch((e) => {
                console.log(e);
            })
            .finally(() => {
                setDeletePending(false);
            });
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
                        {deltakelse && (
                            <Box>
                                <Button
                                    type="button"
                                    loading={deletePending}
                                    variant="secondary"
                                    size="small"
                                    onClick={(evt) => {
                                        evt.stopPropagation();
                                        evt.preventDefault();
                                        slettDeltakelse(deltakelse.id);
                                    }}>
                                    Slett
                                </Button>
                            </Box>
                        )}
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
                        {endretDeltakelse && (
                            <Alert variant="info">
                                <BodyShort>Respons</BodyShort>
                                <pre style={{ fontSize: '.8rem' }}>{JSON.stringify(deltakelse, null, 2)}</pre>
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
