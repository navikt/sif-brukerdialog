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
    header?: string;
    description?: React.ReactNode;
    variant: 'startdato' | 'sluttdato' | 'startOgSluttdato';
    deltakelse: Deltakelse;
    deltakelser: Deltakelse[];
    onChange: () => void;
}

const EndreDeltakelseForm = ({ deltakelse, deltakelser, header, description, variant, onChange }: Props) => {
    const {
        pending: endreDeltakelsePending,
        endreDeltakelse,
        endreSluttdato,
        endreStartdato,
    } = useEndreDeltakelse(onChange || (() => {}));

    const getInitialValues = (d: Deltakelse): DeltakelseFormValues => {
        return {
            fnr: d.deltaker.deltakerIdent,
            id: d.id,
            fom: dateToISODate(d.fraOgMed),
            tom: d.tilOgMed ? dateToISODate(d.tilOgMed) : '',
        };
    };

    return (
        <Box maxWidth={'40rem'}>
            <TypedFormikWrapper<DeltakelseFormValues>
                initialValues={deltakelse ? getInitialValues(deltakelse) : {}}
                onSubmit={(values) => {
                    switch (variant) {
                        case 'startdato':
                            endreStartdato(deltakelse, ISODateToDate(values.fom));
                            break;
                        case 'sluttdato':
                            endreSluttdato(deltakelse, ISODateToDate(values.tom));
                            break;
                        case 'startOgSluttdato':
                            endreDeltakelse(deltakelse, values);
                    }
                }}
                renderForm={({ values }) => {
                    const fomDate = values.fom ? ISODateToDate(values.fom) : undefined;
                    const tomDate = values.tom ? ISODateToDate(values.tom) : undefined;
                    return (
                        <VStack gap="4" width={'100%'}>
                            <Heading level="2" size="small">
                                {header || 'Endre deltakerperiode'}
                            </Heading>
                            {description}
                            <TypedFormikForm
                                submitPending={endreDeltakelsePending}
                                showSubmitButton={false}
                                submitButtonLabel="Endre"
                                showButtonArrows={false}>
                                <VStack gap="6">
                                    <PeriodeFormPart
                                        visSluttdato={variant === 'startOgSluttdato' || variant === 'sluttdato'}
                                        visStartdato={variant === 'startOgSluttdato' || variant === 'startdato'}
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
