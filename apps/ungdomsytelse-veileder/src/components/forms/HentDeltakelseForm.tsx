import { Box, Button, Heading, HStack, Table, VStack } from '@navikt/ds-react';
import { FormikTextField, TypedFormikForm, TypedFormikWrapper } from '@navikt/sif-common-formik-ds';
import { useState } from 'react';
import { Deltakelse } from '../../api/types';
import { getFødselsnummerValidator } from '@navikt/sif-common-formik-ds/src/validation';
import { veilederService } from '../../api/services/veilederService';
import { dateFormatter } from '@navikt/sif-common-utils';

type DeltakerFormValues = {
    fnr: string;
};

const HentDeltakelserForm = () => {
    const [pending, setIsPending] = useState(false);
    const [deltakelser, setDeltakelser] = useState<Deltakelse[] | undefined>();

    const [initialValues] = useState<Partial<DeltakerFormValues>>({
        fnr: '56857102105',
    });

    const hentDeltakelser = async (values) => {
        setIsPending(true);
        setDeltakelser(undefined);
        const d = await veilederService.getDeltakelser(values.fnr);
        setDeltakelser(d);
        setIsPending(false);
    };

    return (
        <TypedFormikWrapper<DeltakerFormValues>
            initialValues={initialValues}
            onSubmit={hentDeltakelser}
            renderForm={({ values }) => {
                return (
                    <VStack gap="6">
                        <TypedFormikForm showSubmitButton={false} submitPending={pending} submitButtonLabel="Hent">
                            <Heading level="2" size="small" spacing={true}>
                                Hent deltakelser
                            </Heading>
                            <VStack gap="6" justify={'start'} flexBasis={'1'}>
                                <HStack gap="2" align={'end'}>
                                    <FormikTextField
                                        name="fnr"
                                        label="Fødselsnummer"
                                        type="text"
                                        width="m"
                                        validate={getFødselsnummerValidator({ required: true })}
                                    />
                                </HStack>
                                <Box>
                                    <Button type="submit" variant="secondary">
                                        Hent deltakelser
                                    </Button>
                                </Box>
                            </VStack>
                        </TypedFormikForm>

                        {deltakelser && (
                            <>
                                <Heading level="2" size="small">
                                    Deltakelser for {values.fnr}
                                </Heading>
                                <Table>
                                    <Table.Header>
                                        <Table.Row>
                                            <Table.HeaderCell>ID</Table.HeaderCell>
                                            <Table.HeaderCell>Fra og med</Table.HeaderCell>
                                            <Table.HeaderCell>Til og med</Table.HeaderCell>
                                        </Table.Row>
                                    </Table.Header>
                                    <Table.Body>
                                        {deltakelser.map((d) => (
                                            <Table.Row key={d.id}>
                                                <Table.DataCell>{d.id}</Table.DataCell>
                                                <Table.DataCell>{dateFormatter.compact(d.fraOgMed)}</Table.DataCell>
                                                <Table.DataCell>
                                                    {d.tilOgMed ? dateFormatter.compact(d.tilOgMed) : null}
                                                </Table.DataCell>
                                            </Table.Row>
                                        ))}
                                    </Table.Body>
                                </Table>
                            </>
                        )}
                    </VStack>
                );
            }}
        />
    );
};

export default HentDeltakelserForm;
