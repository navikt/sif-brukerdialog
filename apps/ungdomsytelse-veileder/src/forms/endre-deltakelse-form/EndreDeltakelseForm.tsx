import { Box, Button, Heading, HStack, VStack } from '@navikt/ds-react';
import { TypedFormikForm, TypedFormikWrapper } from '@navikt/sif-common-formik-ds';

import { dateToISODate, ISODateToDate } from '@navikt/sif-common-utils';
import { Deltakelse } from '../../api/types';
import PeriodeFormPart from '../periode-form-part/PeriodeFormPart';
import { useEndreDeltakelse } from '../../depr/hooks/useEndreDeltakelse';

export type DeltakelseFormValues = {
    id: string;
    fnr: string;
    fom: string;
    tom?: string;
};

interface Props {
    deltakelse: Deltakelse;
    deltakelser: Deltakelse[];
    onChange: () => void;
}

const EndreDeltakelseForm = ({ deltakelse, deltakelser, onChange }: Props) => {
    const { pending: endreDeltakelsePending, endreDeltakelse } = useEndreDeltakelse(onChange || (() => {}));

    const getInitialValues = (d: Deltakelse): DeltakelseFormValues => {
        return {
            fnr: d.deltakerIdent,
            id: d.id,
            fom: dateToISODate(d.fraOgMed),
            tom: d.tilOgMed ? dateToISODate(d.tilOgMed) : '',
        };
    };

    return (
        <Box maxWidth={'40rem'}>
            <TypedFormikWrapper<DeltakelseFormValues>
                initialValues={deltakelse ? getInitialValues(deltakelse) : {}}
                onSubmit={(values) => endreDeltakelse(deltakelse, values)}
                renderForm={({ values }) => {
                    const fomDate = values.fom ? ISODateToDate(values.fom) : undefined;
                    const tomDate = values.tom ? ISODateToDate(values.tom) : undefined;
                    return (
                        <VStack gap="4" maxWidth={'30rem'} width={'100%'}>
                            <Heading level="2" size="small">
                                Endre deltakerperiode
                            </Heading>
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
                                    <HStack gap="2">
                                        <Button type="submit" loading={endreDeltakelsePending} variant="primary">
                                            Lagre endring
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

export default EndreDeltakelseForm;
