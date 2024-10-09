/* eslint-disable no-constant-binary-expression */
import { Box, Button, Heading, HStack, VStack } from '@navikt/ds-react';
import { FormikTextField, TypedFormikForm, TypedFormikWrapper } from '@navikt/sif-common-formik-ds';
import { useState } from 'react';
import { Deltakelse } from '../../api/types';
import { getFødselsnummerValidator } from '@navikt/sif-common-formik-ds/src/validation';
import { veilederService } from '../../api/services/veilederService';
import DeltakelseTable from '../deltakelse-table/DeltakelseTable';
import { useEffectOnce } from '@navikt/sif-common-hooks';
import LoadingSpinner from '@navikt/sif-common-core-ds/src/atoms/loading-spinner/LoadingSpinner';

type DeltakerFormValues = {
    fnr: string;
};

interface Props {
    deltakerFnr: string;
    velgDeltakelse?: (deltakelse: Deltakelse) => void;
}

const HentDeltakelserForm = ({ deltakerFnr, velgDeltakelse }: Props) => {
    const [pending, setIsPending] = useState(false);
    const [deltakelser, setDeltakelser] = useState<Deltakelse[] | undefined>();

    const [initialValues] = useState<Partial<DeltakerFormValues>>({
        fnr: deltakerFnr,
    });

    const hentDeltakelser = async (values) => {
        setIsPending(true);
        setDeltakelser(undefined);
        const d = await veilederService.getDeltakelser(values.fnr);
        setDeltakelser(d);
        setIsPending(false);
    };

    useEffectOnce(() => {
        if (!deltakelser || (deltakelser?.length > 0 && deltakelser[0].deltakerIdent !== deltakerFnr)) {
            hentDeltakelser(deltakerFnr);
        }
    });

    return (
        <TypedFormikWrapper<DeltakerFormValues>
            initialValues={initialValues}
            onSubmit={hentDeltakelser}
            renderForm={({ values }) => {
                return (
                    <VStack gap="6">
                        {1 + 1 === 3 && (
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
                                            disabled={true}
                                            width="m"
                                            validate={getFødselsnummerValidator({ required: true })}
                                        />
                                    </HStack>
                                    <Box>
                                        <Button type="submit" variant="secondary">
                                            Hent
                                        </Button>
                                    </Box>
                                </VStack>
                            </TypedFormikForm>
                        )}
                        {deltakelser && (
                            <>
                                <Heading level="2" size="small">
                                    Deltakelser for {values.fnr}
                                </Heading>
                                {pending ? (
                                    <VStack align={'center'} paddingBlock={'4'}>
                                        <LoadingSpinner size="3xlarge" />
                                    </VStack>
                                ) : (
                                    <DeltakelseTable deltakelser={deltakelser} velgDeltakelse={velgDeltakelse} />
                                )}
                            </>
                        )}
                    </VStack>
                );
            }}
        />
    );
};

export default HentDeltakelserForm;
