import { BodyLong, Box, Button, Heading, HGrid, HStack, VStack } from '@navikt/ds-react';
import { TypedFormikForm, TypedFormikWrapper } from '@navikt/sif-common-formik-ds';

import { dateToISODate, ISODateToDate } from '@navikt/sif-common-utils';
import { Deltakelse } from '../../api/types';
import PeriodeFormPart from '../periode-form-part/PeriodeFormPart';
import { useEndreDeltakelse } from '../../depr/hooks/useEndreDeltakelse';
import EndreStartdatoInfo from './EndreStartdatoInfo';

export type EndreStartdatoFormValues = {
    id: string;
    fnr: string;
    fom: string;
};

interface Props {
    deltakernavn: string;
    deltakelse: Deltakelse;
    deltakelser: Deltakelse[];
    onChange: () => void;
}

const EndreStartdato = ({ deltakelse, deltakelser, deltakernavn, onChange }: Props) => {
    const { pending: endreDeltakelsePending, endreStartdato } = useEndreDeltakelse(onChange || (() => {}));

    const getInitialValues = (d: Deltakelse): EndreStartdatoFormValues => {
        return {
            fnr: d.deltaker.deltakerIdent,
            id: d.id,
            fom: dateToISODate(d.fraOgMed),
        };
    };

    return (
        <Box>
            <TypedFormikWrapper<EndreStartdatoFormValues>
                initialValues={deltakelse ? getInitialValues(deltakelse) : {}}
                onSubmit={(values) => {
                    endreStartdato(deltakelse, ISODateToDate(values.fom));
                }}
                renderForm={({ values }) => {
                    const fomDate = values.fom ? ISODateToDate(values.fom) : undefined;
                    return (
                        <HGrid columns={'2fr 1fr'} gap="6">
                            <VStack gap="4">
                                <Heading level="3" size="medium">
                                    Endre startdato
                                </Heading>
                                {deltakelse.harSøkt ? (
                                    <BodyLong spacing={true}>
                                        Når startdato endres, opprettes en oppgave til deltaker hvor hen må bekrefte den
                                        nye startdatoen. Oppgaven vil også bli synlig for deg under fanen "Oppgaver til
                                        deltaker".
                                    </BodyLong>
                                ) : (
                                    <BodyLong spacing={true}>
                                        Deltaker har ikke søkt enda. Du kan endre startdatoen uten at det uløser blir
                                        noen oppgave til deltaker.
                                    </BodyLong>
                                )}
                                <TypedFormikForm
                                    submitPending={endreDeltakelsePending}
                                    showSubmitButton={false}
                                    submitButtonLabel="Endre"
                                    showButtonArrows={false}>
                                    <VStack gap="6">
                                        <PeriodeFormPart
                                            deltakernavn={deltakernavn}
                                            visSluttdato={false}
                                            visStartdato={true}
                                            fomDate={fomDate}
                                            deltakelser={deltakelser}
                                            deltakelseId={deltakelse.id}
                                        />
                                        <HStack gap="2">
                                            <Button type="submit" loading={endreDeltakelsePending} variant="primary">
                                                Send oppgave til {deltakernavn}
                                            </Button>
                                        </HStack>
                                    </VStack>
                                </TypedFormikForm>
                            </VStack>

                            <VStack className="bg-deepblue-50 p-5 rounded-md">
                                <EndreStartdatoInfo />
                            </VStack>
                        </HGrid>
                    );
                }}
            />
        </Box>
    );
};

export default EndreStartdato;
