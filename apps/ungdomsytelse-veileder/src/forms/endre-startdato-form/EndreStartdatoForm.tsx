import { Alert, Box, VStack } from '@navikt/ds-react';
import { TypedFormikForm, TypedFormikWrapper } from '@navikt/sif-common-formik-ds';
import { ISODateToDate } from '@navikt/sif-common-utils';
import { Deltakelse, Deltaker, EndretProgramperiodeOppgave, formaterNavn, Oppgavetype } from '@navikt/ung-common';
import { useEndreDeltakelse } from '../../hooks/useEndreDeltakelse';
import PeriodeFormPart from '../periode-form-part/PeriodeFormPart';

export type EndreStartdatoFormValues = {
    id: string;
    fnr: string;
    fom: string;
};

interface Props {
    deltaker: Deltaker;
    deltakelse: Deltakelse;
    onCancel?: () => void;
    onDeltakelseChanged: (oppdatertDeltakelse: Deltakelse) => void;
}

const EndreStartdatoForm = ({ deltakelse, deltaker, onCancel, onDeltakelseChanged }: Props) => {
    const { endreStartdato, pending, error } = useEndreDeltakelse(onDeltakelseChanged);

    const åpenOppgaver = deltakelse.oppgaver.filter(
        (oppgave) => oppgave.status === 'ULØST' && oppgave.oppgavetype === Oppgavetype.BEKREFT_ENDRET_PROGRAMPERIODE,
    ) as EndretProgramperiodeOppgave[];

    const åpenOppgave: EndretProgramperiodeOppgave | undefined = åpenOppgaver.length > 0 ? åpenOppgaver[0] : undefined;
    const deltakernavn = formaterNavn(deltaker.navn);

    return (
        <Box>
            <TypedFormikWrapper<EndreStartdatoFormValues>
                initialValues={{}}
                onSubmit={(values: EndreStartdatoFormValues) => {
                    endreStartdato(deltakelse, ISODateToDate(values.fom));
                }}
                renderForm={({ values }) => {
                    const fomDate = values.fom ? ISODateToDate(values.fom) : undefined;
                    return (
                        <VStack gap="6">
                            {åpenOppgave ? (
                                <Alert variant="info">
                                    Det finnes allerede en endring av startdato som deltaker ikke har besvart enda. Hvis
                                    du registrerer en ny endring, vil den forrige endringen bli erstattet av denne.
                                </Alert>
                            ) : null}
                            <Box>
                                {deltakelse.harSøkt ? (
                                    <>
                                        Når startdato endres, opprettes en oppgave til deltaker hvor hen må bekrefte den
                                        nye startdatoen. Oppgaven vil også bli synlig for deg under fanen "Oppgaver til
                                        deltaker".
                                    </>
                                ) : (
                                    <>
                                        Deltaker har ikke søkt enda. Du kan endre startdatoen uten at det utløser blir
                                        noen oppgave til deltaker.
                                    </>
                                )}
                            </Box>
                            <TypedFormikForm
                                submitPending={pending}
                                showSubmitButton={false}
                                submitButtonLabel="Endre"
                                showButtonArrows={false}>
                                <VStack gap="6">
                                    <PeriodeFormPart
                                        deltakernavn={deltakernavn}
                                        visSluttdato={false}
                                        visStartdato={true}
                                        fomDate={fomDate}
                                        pending={pending}
                                        onCancel={onCancel}
                                    />

                                    {error ? <Alert variant="error">{error.message}</Alert> : null}
                                </VStack>
                            </TypedFormikForm>
                        </VStack>
                    );
                }}
            />
        </Box>
    );
};

export default EndreStartdatoForm;
