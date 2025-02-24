import { BodyLong, Box, Button, Heading, HGrid, HStack, VStack } from '@navikt/ds-react';
import { TypedFormikForm, TypedFormikWrapper } from '@navikt/sif-common-formik-ds';

import { dateToISODate, ISODateToDate } from '@navikt/sif-common-utils';
import { Deltakelse } from '../../api/types';
import PeriodeFormPart from '../periode-form-part/PeriodeFormPart';
import { useEndreDeltakelse } from '../../depr/hooks/useEndreDeltakelse';
import EndreSluttdatoInfo from './EndreSluttdatoInfo';

export type EndreSluttdatoFormValues = {
    id: string;
    fnr: string;
    fom: string;
    tom?: string;
};

interface Props {
    deltakernavn: string;
    deltakelse: Deltakelse;
    deltakelser: Deltakelse[];
    onChange: () => void;
}

const EndreSluttdato = ({ deltakelse, deltakelser, deltakernavn, onChange }: Props) => {
    const { pending: endreDeltakelsePending, endreSluttdato } = useEndreDeltakelse(onChange || (() => {}));

    const getInitialValues = (d: Deltakelse): EndreSluttdatoFormValues => {
        return {
            fnr: d.deltaker.deltakerIdent,
            id: d.id,
            fom: dateToISODate(d.fraOgMed),
            tom: d.tilOgMed ? dateToISODate(d.tilOgMed) : '',
        };
    };

    return (
        <Box>
            <TypedFormikWrapper<EndreSluttdatoFormValues>
                initialValues={deltakelse ? getInitialValues(deltakelse) : {}}
                onSubmit={(values) => {
                    endreSluttdato(deltakelse, ISODateToDate(values.tom));
                }}
                renderForm={({ values }) => {
                    const tomDate = values.tom ? ISODateToDate(values.tom) : undefined;
                    return (
                        <HGrid columns={'2fr 1fr'} gap="6">
                            <VStack gap="4">
                                <Heading level="3" size="medium">
                                    Endre sluttdato
                                </Heading>
                                {deltakelse.harSøkt ? (
                                    <BodyLong spacing={true}>
                                        Når sluttdato endres, opprettes en oppgave til deltaker hvor hen må bekrefte den
                                        nye datoen. Oppgaven vil også bli synlig for deg under fanen "Oppgaver til
                                        deltaker".
                                    </BodyLong>
                                ) : (
                                    <BodyLong spacing={true}>
                                        Deltaker har ikke søkt enda. Du kan endre sluttdatoen uten at det uløser blir
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
                                            visSluttdato={true}
                                            visStartdato={false}
                                            tomDate={tomDate}
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
                                <EndreSluttdatoInfo />
                            </VStack>
                        </HGrid>
                    );
                }}
            />
        </Box>
    );
};

export default EndreSluttdato;
