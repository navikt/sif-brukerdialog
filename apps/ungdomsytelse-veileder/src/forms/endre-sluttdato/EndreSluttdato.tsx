import { Alert, BodyLong, Box, Button, Heading, HGrid, HStack, VStack } from '@navikt/ds-react';
import { TypedFormikForm, TypedFormikWrapper } from '@navikt/sif-common-formik-ds';
import { ISODateToDate } from '@navikt/sif-common-utils';
import { Deltakelse, EndreSluttdatoOppgave, Oppgave, Oppgavetype } from '@navikt/ung-common';
import PeriodeFormPart from '../periode-form-part/PeriodeFormPart';
import EndreSluttdatoInfo from './EndreSluttdatoInfo';
import { useEndreDeltakelse } from '../../hooks/useEndreDeltakelse';
import { Veileder } from '../../types/Veileder';
import { useState } from 'react';

export type EndreSluttdatoFormValues = {
    id: string;
    fnr: string;
    fom: string;
    tom?: string;
    melding?: string;
};

interface Props {
    veileder: Veileder;
    oppgaver: Oppgave[];
    deltakernavn: string;
    deltakelse: Deltakelse;
    deltakelser: Deltakelse[];
    onDeltakelseChanged: () => void;
}

const EndreSluttdato = ({ deltakelse, deltakelser, deltakernavn, oppgaver, veileder, onDeltakelseChanged }: Props) => {
    const [oppdatert, setOppdatert] = useState(false);

    const handleOnDeltakelseChanged = () => {
        setOppdatert(true);
        onDeltakelseChanged();
    };

    const { pending: endreDeltakelsePending, error, endreSluttdato } = useEndreDeltakelse(handleOnDeltakelseChanged);

    const åpneOppgaver = oppgaver.filter(
        (oppgave) => oppgave.status === 'ULØST' && oppgave.oppgavetype === Oppgavetype.BEKREFT_ENDRET_SLUTTDATO,
    ) as EndreSluttdatoOppgave[];

    const åpenOppgave: EndreSluttdatoOppgave | undefined = åpneOppgaver.length > 0 ? åpneOppgaver[0] : undefined;

    return (
        <Box>
            <TypedFormikWrapper<EndreSluttdatoFormValues>
                initialValues={{}}
                onSubmit={(values) => {
                    const melding = values.melding ? values.melding.trim() : undefined;
                    endreSluttdato(deltakelse, ISODateToDate(values.tom), melding);
                }}
                renderForm={({ values }) => {
                    const tomDate = values.tom ? ISODateToDate(values.tom) : undefined;
                    return (
                        <HGrid columns={'2fr 1fr'} gap="6">
                            <VStack gap="4">
                                {åpenOppgave ? (
                                    <Box marginBlock="0 4">
                                        <Alert variant="warning">
                                            Det eksisterer allerede en oppgave på endring av sluttdato. Hvis du
                                            registrerer en ny endring i startdato, vil denne oppgaven lukkes og bli
                                            erstattet med den nye.
                                        </Alert>
                                    </Box>
                                ) : null}
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
                                    <>
                                        <VStack gap="2">
                                            <Heading level="3" size="medium">
                                                Endre sluttdato
                                            </Heading>
                                            {deltakelse.harSøkt ? (
                                                <BodyLong spacing={true}>
                                                    Når sluttdato endres, opprettes en oppgave til deltaker hvor hen må
                                                    bekrefte den nye datoen. Oppgaven vil også bli synlig for deg under
                                                    fanen "Oppgaver til deltaker".
                                                </BodyLong>
                                            ) : (
                                                <Alert variant="info">
                                                    Deltaker har ikke søkt enda. Du kan endre sluttdatoen uten at det
                                                    uløser blir noen oppgave til deltaker.
                                                </Alert>
                                            )}
                                        </VStack>
                                        <TypedFormikForm
                                            submitPending={endreDeltakelsePending}
                                            showSubmitButton={false}
                                            submitButtonLabel="Endre"
                                            showButtonArrows={false}>
                                            <VStack gap="6">
                                                <PeriodeFormPart
                                                    harSøkt={deltakelse.harSøkt}
                                                    veileder={veileder}
                                                    deltakernavn={deltakernavn}
                                                    visSluttdato={true}
                                                    visStartdato={false}
                                                    tomDate={tomDate}
                                                    deltakelser={deltakelser}
                                                    deltakelseId={deltakelse.id}
                                                />
                                                <HStack gap="2">
                                                    <Button
                                                        type="submit"
                                                        loading={endreDeltakelsePending}
                                                        variant="primary">
                                                        {deltakelse.harSøkt ? (
                                                            <>Endre sluttdato og send varsel til {deltakernavn}</>
                                                        ) : (
                                                            <>Endre sluttdato</>
                                                        )}
                                                    </Button>
                                                </HStack>
                                                {error ? (
                                                    <Alert variant="error">
                                                        {error.type}
                                                        <br />
                                                        {error.message}
                                                    </Alert>
                                                ) : null}
                                            </VStack>
                                        </TypedFormikForm>
                                    </>
                                )}
                                {oppdatert ? (
                                    <Alert variant="success">Startdato er oppdatert</Alert>
                                ) : (
                                    <TypedFormikForm
                                        submitPending={endreDeltakelsePending}
                                        showSubmitButton={false}
                                        submitButtonLabel="Endre"
                                        showButtonArrows={false}>
                                        <VStack gap="6">
                                            <PeriodeFormPart
                                                veileder={veileder}
                                                deltakernavn={deltakernavn}
                                                visSluttdato={true}
                                                harSøkt={deltakelse.harSøkt}
                                                visStartdato={false}
                                                tomDate={tomDate}
                                                deltakelser={deltakelser}
                                                deltakelseId={deltakelse.id}
                                            />
                                            <HStack gap="2">
                                                <Button
                                                    type="submit"
                                                    loading={endreDeltakelsePending}
                                                    variant="primary">
                                                    Endre sluttdato og send varsel til {deltakernavn}
                                                </Button>
                                            </HStack>
                                            {error ? (
                                                <Alert variant="error">
                                                    {error.type}
                                                    <br />
                                                    {error.message}
                                                </Alert>
                                            ) : null}
                                        </VStack>
                                    </TypedFormikForm>
                                )}
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
