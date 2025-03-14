import { Alert, BodyLong, Box, Button, HGrid, HStack, VStack } from '@navikt/ds-react';
import { TypedFormikForm, TypedFormikWrapper } from '@navikt/sif-common-formik-ds';
import { ISODateToDate } from '@navikt/sif-common-utils';
import { Deltakelse, Deltaker, EndreStartdatoOppgave, formaterNavn, Oppgavetype } from '@navikt/ung-common';
import { useEndreDeltakelse } from '../../hooks/useEndreDeltakelse';
import PeriodeFormPart from '../periode-form-part/PeriodeFormPart';
import EndreStartdatoInfo from './EndreStartdatoInfo';
import { useVeileder } from '../../context/VeilederContext';

export type EndreStartdatoFormValues = {
    id: string;
    fnr: string;
    fom: string;
    melding?: string;
};

interface Props {
    // veileder: Veileder;
    deltaker: Deltaker;
    deltakelse: Deltakelse;
    deltakelser: Deltakelse[];
    onDeltakelseChanged: () => void;
}

const EndreStartdatoForm = ({ deltakelse, deltakelser, deltaker, onDeltakelseChanged }: Props) => {
    const { veileder } = useVeileder();

    const { endreStartdato, pending, error } = useEndreDeltakelse(onDeltakelseChanged);

    const åpenOppgaver = deltakelse.oppgaver.filter(
        (oppgave) => oppgave.status === 'ULØST' && oppgave.oppgavetype === Oppgavetype.BEKREFT_ENDRET_STARTDATO,
    ) as EndreStartdatoOppgave[];

    const åpenOppgave: EndreStartdatoOppgave | undefined = åpenOppgaver.length > 0 ? åpenOppgaver[0] : undefined;
    const deltakernavn = formaterNavn(deltaker.navn);

    return (
        <Box>
            <TypedFormikWrapper<EndreStartdatoFormValues>
                initialValues={{}}
                onSubmit={(values: EndreStartdatoFormValues) => {
                    const melding = values.melding ? values.melding.trim() : undefined;
                    // setOppdatert(false);
                    endreStartdato(deltakelse, ISODateToDate(values.fom), melding);
                }}
                renderForm={({ values }) => {
                    const fomDate = values.fom ? ISODateToDate(values.fom) : undefined;
                    return (
                        <HGrid columns={'2fr 1fr'} gap="6">
                            <VStack gap="4">
                                {åpenOppgave ? (
                                    <Alert variant="warning">
                                        Det finnes allerede en endring av startdato som deltaker ikke har besvart enda.
                                        Hvis du registrerer en ny endring, vil den forrige endringen bli erstattet av
                                        denne.
                                    </Alert>
                                ) : null}
                                <VStack gap="2">
                                    {deltakelse.harSøkt ? (
                                        <BodyLong>
                                            Når startdato endres, opprettes en oppgave til deltaker hvor hen må bekrefte
                                            den nye startdatoen. Oppgaven vil også bli synlig for deg under fanen
                                            "Oppgaver til deltaker".
                                        </BodyLong>
                                    ) : (
                                        <BodyLong>
                                            Deltaker har ikke søkt enda. Du kan endre startdatoen uten at det utløser
                                            blir noen oppgave til deltaker.
                                        </BodyLong>
                                    )}
                                </VStack>
                                <TypedFormikForm
                                    submitPending={pending}
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
                                            harSøkt={deltakelse.harSøkt}
                                            deltakelser={deltakelser}
                                            deltakelseId={deltakelse.id}
                                        />
                                        <HStack gap="2">
                                            <Button type="submit" loading={pending} variant="primary">
                                                Endre startdato og send varsel til {deltakernavn}
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

export default EndreStartdatoForm;
