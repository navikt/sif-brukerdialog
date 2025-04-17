import { Alert, Box, VStack } from '@navikt/ds-react';
import { TypedFormikForm, TypedFormikWrapper } from '@navikt/sif-common-formik-ds';
import { ISODateToDate } from '@navikt/sif-common-utils';
import { Deltakelse, Deltaker, EndretProgramperiodeOppgave, formaterNavn, Oppgavetype } from '@navikt/ung-common';
import { useEndreDeltakelse } from '../../hooks/useEndreDeltakelse';
import PeriodeFormPart from '../periode-form-part/PeriodeFormPart';

export type EndreSluttdatoFormValues = {
    id: string;
    fnr: string;
    fom: string;
    tom?: string;
};

interface Props {
    deltaker: Deltaker;
    deltakelse: Deltakelse;
    onCancel?: () => void;
    onDeltakelseChanged: (deltakelse: Deltakelse) => void;
}

const EndreSluttdatoForm = ({ deltakelse, deltaker, onCancel, onDeltakelseChanged }: Props) => {
    const { endreSluttdato, pending, error } = useEndreDeltakelse(onDeltakelseChanged);

    const åpenOppgaver = deltakelse.oppgaver.filter(
        (oppgave) => oppgave.status === 'ULØST' && oppgave.oppgavetype === Oppgavetype.BEKREFT_ENDRET_PROGRAMPERIODE,
    ) as EndretProgramperiodeOppgave[];

    const åpenOppgave: EndretProgramperiodeOppgave | undefined = åpenOppgaver.length > 0 ? åpenOppgaver[0] : undefined;
    const deltakernavn = formaterNavn(deltaker.navn);

    return (
        <Box>
            <TypedFormikWrapper<EndreSluttdatoFormValues>
                initialValues={{}}
                onSubmit={(values) => {
                    endreSluttdato(deltakelse, ISODateToDate(values.tom));
                }}
                renderForm={({ values }) => {
                    const tomDate = values.tom ? ISODateToDate(values.tom) : undefined;
                    return (
                        <VStack gap="6">
                            {åpenOppgave ? (
                                <Alert variant="info">
                                    Det finnes allerede en endring av startdato som deltaker ikke har besvart enda. Hvis
                                    du registrerer en ny endring, vil den forrige endringen bli erstattet av denne.
                                </Alert>
                            ) : null}
                            {deltakelse.harSøkt ? (
                                <Box>
                                    Når sluttdato endres, opprettes en oppgave til deltaker hvor hen må bekrefte den nye
                                    datoen. Oppgaven vil også bli synlig for deg under fanen "Oppgaver til deltaker".
                                </Box>
                            ) : null}

                            <TypedFormikForm
                                submitPending={pending}
                                showSubmitButton={false}
                                submitButtonLabel="Endre"
                                showButtonArrows={false}>
                                <VStack gap="6">
                                    <PeriodeFormPart
                                        deltakernavn={deltakernavn}
                                        visSluttdato={true}
                                        visStartdato={false}
                                        tomDate={tomDate}
                                        pending={pending}
                                        onCancel={onCancel}
                                    />
                                    {error ? (
                                        <Alert variant="error">
                                            <>
                                                {error.error.type}
                                                <br />
                                                {error.error.message}
                                            </>
                                        </Alert>
                                    ) : null}
                                </VStack>
                            </TypedFormikForm>
                        </VStack>
                    );
                }}
            />
        </Box>
    );
};

export default EndreSluttdatoForm;
