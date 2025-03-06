import { Alert, BodyLong, Box, Button, Heading, HGrid, HStack, VStack } from '@navikt/ds-react';
import { TypedFormikForm, TypedFormikWrapper } from '@navikt/sif-common-formik-ds';
import { ISODateToDate } from '@navikt/sif-common-utils';
import { Deltakelse, EndreStartdatoOppgave, Oppgave, Oppgavetype } from '@navikt/ung-common';
import { useEndreDeltakelse } from '../../hooks/useEndreDeltakelse';
import PeriodeFormPart from '../periode-form-part/PeriodeFormPart';
import EndreStartdatoInfo from './EndreStartdatoInfo';
import { Veileder } from '../../types/Veileder';

export type EndreStartdatoFormValues = {
    id: string;
    fnr: string;
    fom: string;
    melding?: string;
};

interface Props {
    veileder: Veileder;
    oppgaver: Oppgave[];
    deltakernavn: string;
    deltakelse: Deltakelse;
    deltakelser: Deltakelse[];
    onChange: () => void;
}

const EndreStartdato = ({ deltakelse, deltakelser, deltakernavn, oppgaver, veileder, onChange }: Props) => {
    const { pending: endreDeltakelsePending, endreStartdato, error } = useEndreDeltakelse(onChange || (() => {}));

    const åpenOppgaver = oppgaver.filter(
        (oppgave) => oppgave.status === 'ULØST' && oppgave.oppgavetype === Oppgavetype.BEKREFT_ENDRET_STARTDATO,
    ) as EndreStartdatoOppgave[];

    const åpenOppgave: EndreStartdatoOppgave | undefined = åpenOppgaver.length > 0 ? åpenOppgaver[0] : undefined;

    return (
        <Box>
            <TypedFormikWrapper<EndreStartdatoFormValues>
                initialValues={{}}
                onSubmit={(values: EndreStartdatoFormValues) => {
                    const melding = values.melding ? values.melding.trim() : undefined;
                    endreStartdato(deltakelse, ISODateToDate(values.fom), melding);
                }}
                renderForm={({ values }) => {
                    const fomDate = values.fom ? ISODateToDate(values.fom) : undefined;
                    return (
                        <HGrid columns={'2fr 1fr'} gap="6">
                            <VStack gap="4">
                                {åpenOppgave ? (
                                    <Box marginBlock="0 4">
                                        <Alert variant="warning">
                                            Det eksisterer allerede en oppgave på endring av startdato. Hvis du
                                            registrerer en ny endring i startdato, vil denne oppgaven lukkes og bli
                                            erstattet med den nye.
                                        </Alert>
                                    </Box>
                                ) : null}
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
                                            veileder={veileder}
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
                                        {error ? <Alert variant="error">{error.message}</Alert> : null}
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
