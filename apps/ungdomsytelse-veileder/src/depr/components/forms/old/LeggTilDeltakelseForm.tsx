import { Alert, BodyShort, Box, Button, Heading, HStack, VStack } from '@navikt/ds-react';
import { useState } from 'react';
import { PlusCircleIcon } from '@navikt/aksel-icons';
import { TypedFormikForm, TypedFormikWrapper } from '@navikt/sif-common-formik-ds';
import { ISODateToDate } from '@navikt/sif-common-utils';
import { AxiosError, isAxiosError } from 'axios';
import { Deltakelse } from '../../../../api/types';
import PeriodeFormPart from './PeriodeFormPart';

type DeltakelseFormValues = {
    fnr: string;
    fom: string;
    tom?: string;
};

interface Props {
    deltakerFnr: string;
    deltakelser: Deltakelse[];
    onDeltakelseLagtTil: () => void;
}

const LeggTilDeltakelseForm = ({ deltakerFnr, deltakelser }: Props) => {
    const [showForm, setShowForm] = useState(false);
    const [pending, setPending] = useState(false);
    const [initialValues] = useState<Partial<DeltakelseFormValues>>({
        fnr: deltakerFnr,
    });
    const [error, setError] = useState<string | AxiosError>();

    const leggTilDeltakelse = async () => {
        setError(undefined);
        setPending(true);
        // const deltakelse = await veilederService;
        // .createDeltakelse({
        //     deltakerId: deltakerFnr,
        //     fraOgMed: values.fom,
        //     tilOgMed: values.tom,
        // })
        // .catch((e) => {
        //     if (isAxiosError(e)) {
        //         setError(e);
        //     } else {
        //         setError(e.message);
        //     }
        //     setPending(false);
        // });
        setPending(false);
        // if (deltakelse) {
        //     onDeltakelseLagtTil();
        // }
    };

    if (showForm === false) {
        return (
            <Box>
                <Button
                    type="button"
                    variant="tertiary"
                    icon={<PlusCircleIcon />}
                    onClick={() => {
                        setShowForm(true);
                    }}>
                    Legg til ny
                </Button>
            </Box>
        );
    }

    return (
        <Box borderRadius="large" background="bg-subtle" padding="6">
            <TypedFormikWrapper<DeltakelseFormValues>
                initialValues={initialValues}
                onSubmit={leggTilDeltakelse}
                renderForm={({ setValues, values }) => {
                    const fomDate = values.fom ? ISODateToDate(values.fom) : undefined;
                    const tomDate = values.tom ? ISODateToDate(values.tom) : undefined;

                    return (
                        <VStack gap="6">
                            <TypedFormikForm
                                submitPending={pending}
                                submitButtonLabel="Legg til"
                                showSubmitButton={false}>
                                <Heading level="2" size="small" spacing={true}>
                                    Legg til deltakelse
                                </Heading>

                                <VStack gap="6">
                                    <PeriodeFormPart fomDate={fomDate} tomDate={tomDate} deltakelser={deltakelser} />
                                    <HStack gap="6">
                                        <Button type="submit" loading={pending} icon={<PlusCircleIcon />}>
                                            Legg til
                                        </Button>
                                        <Button
                                            type="button"
                                            variant="secondary"
                                            onClick={(evt) => {
                                                evt.stopPropagation();
                                                evt.preventDefault();
                                                setValues({});
                                                setShowForm(false);
                                            }}>
                                            Avbryt
                                        </Button>
                                    </HStack>
                                </VStack>
                            </TypedFormikForm>

                            {error && (
                                <Alert variant="error">
                                    {isAxiosError(error) ? (
                                        <>
                                            <Heading level="3" size="xsmall">
                                                {error.message}
                                            </Heading>
                                            <BodyShort size="small">
                                                <p>{JSON.stringify(error.response?.data, undefined, 2)}</p>
                                            </BodyShort>
                                        </>
                                    ) : (
                                        error
                                    )}
                                </Alert>
                            )}
                        </VStack>
                    );
                }}
            />
        </Box>
    );
};

export default LeggTilDeltakelseForm;
