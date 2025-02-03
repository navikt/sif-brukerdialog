import { Box, Button, Heading, HStack, VStack } from '@navikt/ds-react';
import { TypedFormikForm, TypedFormikWrapper } from '@navikt/sif-common-formik-ds';
import { ISODateToDate } from '@navikt/sif-common-utils';
import { Deltakelse, Deltaker } from '../../api/types';
import { useNyDeltakelse } from '../../depr/hooks/useNyDeltakelse';
import PeriodeFormPart from '../periode-form-part/PeriodeFormPart';

export type DeltakelseFormValues = {
    fnr: string;
    fom: string;
    tom?: string;
};

interface Props {
    deltaker: Deltaker;
    deltakelser: Deltakelse[];
    onOpprettet: () => void;
}

const NyDeltakelseForm = ({ deltaker, deltakelser, onOpprettet }: Props) => {
    const { pending, opprettDeltakelse } = useNyDeltakelse(deltaker, onOpprettet || (() => {}));

    return (
        <Box maxWidth={'40rem'}>
            <TypedFormikWrapper<DeltakelseFormValues>
                initialValues={{
                    fnr: deltaker.deltakerIdent,
                }}
                onSubmit={(values) => opprettDeltakelse(values)}
                renderForm={({ values }) => {
                    const fomDate = values.fom ? ISODateToDate(values.fom) : undefined;
                    const tomDate = values.tom ? ISODateToDate(values.tom) : undefined;
                    return (
                        <VStack gap="4" maxWidth={'30rem'} width={'100%'}>
                            <Heading level="2" size="small">
                                Legg til ny deltakelseperiode
                            </Heading>
                            <TypedFormikForm
                                submitPending={pending}
                                showSubmitButton={false}
                                submitButtonLabel="Endre"
                                showButtonArrows={false}>
                                <VStack gap="6">
                                    <PeriodeFormPart fomDate={fomDate} tomDate={tomDate} deltakelser={deltakelser} />
                                    <HStack gap="2">
                                        <Button type="submit" loading={pending} variant="primary">
                                            Legg til deltakelse
                                        </Button>
                                    </HStack>
                                </VStack>
                            </TypedFormikForm>
                        </VStack>
                    );
                }}
            />
        </Box>
    );
};

export default NyDeltakelseForm;
