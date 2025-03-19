import { Alert, BodyShort, Heading, HStack, ReadMore, VStack } from '@navikt/ds-react';
import { dateFormatter, dateRangeFormatter } from '@navikt/sif-common-utils';
import { KorrigertInntektOppgave, Oppgavetype } from '@navikt/ung-common';
import OppgaveLayout from './OppgaveLayout';
import {
    FormikConfirmationCheckbox,
    getIntlFormErrorHandler,
    getTypedFormComponents,
    ValidationError,
    YesOrNo,
} from '@navikt/sif-common-formik-ds';
import { useAppIntl } from '../../../../i18n';
import { getCheckedValidator, getStringValidator, getYesOrNoValidator } from '@navikt/sif-validation';
import { UngdomsytelseOppgavebekreftelse } from '@navikt/k9-brukerdialog-prosessering-api';
import { useBesvarOppgave } from '../../hooks/useBesvarOppgave';
import { WalletIcon } from '@navikt/aksel-icons';
import dayjs from 'dayjs';
import InntektTabell from '../inntekt-tabell/InntektTabell';

interface Props {
    deltakelseId: string;
    oppgave: KorrigertInntektOppgave;
}

enum FormFields {
    godkjenner = 'godkjenner',
    begrunnelse = 'begrunnelse',
    bekrefterOpplysninger = 'bekrefterOpplysninger',
}

type FormValues = Partial<{
    [FormFields.begrunnelse]: string;
    [FormFields.godkjenner]: YesOrNo;
    [FormFields.bekrefterOpplysninger]: boolean;
}>;

const { FormikWrapper, Form, YesOrNoQuestion, Textarea } = getTypedFormComponents<
    FormFields,
    FormValues,
    ValidationError
>();

const KorrigertInntektOppgave = ({ deltakelseId, oppgave }: Props) => {
    const { intl } = useAppIntl();
    const { sendSvar, error, pending, besvart } = useBesvarOppgave();

    const handleSubmit = async (values: FormValues) => {
        const godkjennerOppgave = values[FormFields.godkjenner] === YesOrNo.YES;

        const dto: UngdomsytelseOppgavebekreftelse = {
            deltakelseId,
            oppgave: {
                oppgaveId: oppgave.id,
                bekreftelseSvar: godkjennerOppgave ? 'GODTAR' : 'AVSLÅR',
                ikkeGodkjentResponse: godkjennerOppgave
                    ? undefined
                    : {
                          meldingFraDeltaker: values[FormFields.begrunnelse]!,
                      },
                type: Oppgavetype.BEKREFT_KORRIGERT_INNTEKT,
            },
        };
        await sendSvar(dto);
    };

    const { periodeForInntekt } = oppgave.oppgavetypeData;
    const periodetekst = dateRangeFormatter.getDateRangeText(
        {
            from: periodeForInntekt.fraOgMed,
            to: periodeForInntekt.tilOgMed,
        },
        intl.locale,
    );
    const svarfristTekst = dateFormatter.compact(dayjs(oppgave.svarfrist).add(1, 'day').toDate());

    return (
        <OppgaveLayout
            tag={
                <HStack gap="2">
                    <WalletIcon />
                    Inntekt
                </HStack>
            }
            tittel={`Endret inntekt for perioden ${periodetekst}`}
            visOppgaveTittel="Vis endret inntekt"
            besvart={besvart}
            beskrivelse={
                <>
                    <BodyShort>
                        Vi har mottatt inntektsopplysninger fra a-ordningen som avviker fra beløpet du har oppgitt.
                        Derfor vil vi bruke inntekten fra a-ordningen som grunnlag for beregning av ytelsen din.
                    </BodyShort>
                    <BodyShort spacing={true}>
                        For at vi skal kunne behandle saken din, må du bekrefte at den inntekten vi har registrert er
                        den korrekte innen <strong>{svarfristTekst}</strong>. Hvis vi ikke mottar en bekreftelse innen
                        fristen, vil vi automatisk bruke inntektsopplysningene fra a-ordningen. Eventuell utbetaling vil
                        bli satt på vent til du har bekreftet endringen, eller fristen har passert.
                    </BodyShort>
                </>
            }>
            <VStack gap="4">
                <FormikWrapper
                    initialValues={{}}
                    onSubmit={handleSubmit}
                    renderForm={({ values }) => {
                        return (
                            <Form
                                submitButtonLabel="Send svar"
                                cancelButtonLabel="Avbryt"
                                submitPending={pending}
                                includeValidationSummary={true}
                                formErrorHandler={getIntlFormErrorHandler(intl, 'inntektForm.validation')}>
                                <VStack gap="8" marginBlock="2 0">
                                    <VStack gap="2">
                                        <Heading level="3" size="small">
                                            Registrert inntekt
                                        </Heading>
                                        <InntektTabell inntekt={oppgave.oppgavetypeData.inntektFraAinntekt} />
                                    </VStack>

                                    <YesOrNoQuestion
                                        name={FormFields.godkjenner}
                                        legend={`Er inntektsopplysningene over korrekte?`}
                                        validate={getYesOrNoValidator()}
                                        labels={{
                                            yes: 'Ja, inntekten er korrekt',
                                        }}
                                    />
                                    {values[FormFields.godkjenner] === YesOrNo.YES ? (
                                        <>
                                            <FormikConfirmationCheckbox
                                                name={FormFields.bekrefterOpplysninger}
                                                label="Jeg bekrefter at inntekten over skal brukes for å beregne min ytelse"
                                                validate={getCheckedValidator()}
                                            />
                                        </>
                                    ) : null}
                                    {values[FormFields.godkjenner] === YesOrNo.NO ? (
                                        <>
                                            <Textarea
                                                name={FormFields.begrunnelse}
                                                label="Hvorfor stemmer ikke inntekten vi har fått fra a-ordningen?"
                                                maxLength={250}
                                                description={
                                                    <ReadMore header="Hva skal jeg skrive her?">
                                                        Hvis du har en klar årsak, skriv den. Hvis du er usikker skriver
                                                        det du tror kan forårsake dette.
                                                    </ReadMore>
                                                }
                                                validate={getStringValidator({ required: true, maxLength: 250 })}
                                            />
                                        </>
                                    ) : null}
                                    {error ? <Alert variant="error">{JSON.stringify(error)}</Alert> : null}
                                </VStack>
                            </Form>
                        );
                    }}
                />
            </VStack>
        </OppgaveLayout>
    );
};

export default KorrigertInntektOppgave;
