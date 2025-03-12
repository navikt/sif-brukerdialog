import { Alert, BodyShort, Box, Heading, HStack, List, ReadMore, VStack } from '@navikt/ds-react';
import { dateFormatter, dateRangeFormatter } from '@navikt/sif-common-utils';
import { KorrigertInntektOppgave, Oppgavetype } from '@navikt/ung-common';
import OppgaveLayout from './OppgaveLayout';
import dayjs from 'dayjs';
import {
    getIntlFormErrorHandler,
    getTypedFormComponents,
    ValidationError,
    YesOrNo,
} from '@navikt/sif-common-formik-ds';
import { useAppIntl } from '../../../../i18n';
import { getNumberValidator, getStringValidator, getYesOrNoValidator } from '@navikt/sif-validation';
import { UngdomsytelseOppgavebekreftelse } from '@navikt/k9-brukerdialog-prosessering-api';
import { useBesvarOppgave } from '../../hooks/useBesvarOppgave';
import { FormattedNumber } from 'react-intl';
import { WalletIcon } from '@navikt/aksel-icons';

interface Props {
    deltakelseId: string;
    oppgave: KorrigertInntektOppgave;
}

enum FormFields {
    arbeidstakerOgFrilansInntekt = 'arbeidstakerOgFrilansInntekt',
    inntektFraYtelse = 'inntektFraYtelse',
    godkjenner = 'godkjenner',
    begrunnelse = 'begrunnelse',
    bekrefterOpplysninger = 'bekrefterOpplysninger',
}

type FormValues = Partial<{
    [FormFields.arbeidstakerOgFrilansInntekt]?: string;
    [FormFields.inntektFraYtelse]?: string;
    [FormFields.begrunnelse]: string;
    [FormFields.godkjenner]: YesOrNo;
    [FormFields.bekrefterOpplysninger]: boolean;
}>;

const { FormikWrapper, Form, YesOrNoQuestion, Textarea, NumberInput, ConfirmationCheckbox } = getTypedFormComponents<
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
                          arbeidstakerOgFrilansInntekt: parseInt(values[FormFields.arbeidstakerOgFrilansInntekt]!, 10),
                          inntektFraYtelse: parseInt(values[FormFields.inntektFraYtelse]!, 10),
                          meldingFraDeltaker: values[FormFields.begrunnelse]!,
                      },
                type: Oppgavetype.BEKREFT_KORRIGERT_INNTEKT,
            },
        };
        await sendSvar(dto);
    };

    const { inntektFraDeltaker, periodeForInntekt, inntektFraAinntekt } = oppgave.oppgavetypeData;
    const periodetekst = dateRangeFormatter.getDateRangeText(
        {
            from: periodeForInntekt.fraOgMed,
            to: periodeForInntekt.tilOgMed,
        },
        intl.locale,
    );

    return (
        <OppgaveLayout
            tag={
                <HStack gap="2">
                    <WalletIcon />
                    Avvik i inntekt
                </HStack>
            }
            tittel={`Inntekt du har opplyst stemmer ikke med registrert inntekt i a-ordningen`}
            besvart={besvart}
            beskrivelse={
                <>
                    <ReadMore header="Hva er a-ordningen?">
                        A-ordningen er en samordnet måte for arbeidsgivere å rapportere opplysninger om inntekt og
                        ansatte til NAV, SSB og Skatteetaten. Ordningen er digital. Opplysningene blir sendt
                        elektronisk, enten via arbeidsgivers lønnssystem eller via en tjeneste i Altinn.
                    </ReadMore>
                    <BodyShort>Gjelder perioden {periodetekst}</BodyShort>
                    <BodyShort>
                        Inntekt vi har fått fra <strong>a-ordningen</strong> stemmer ikke overens med inntekten vi har
                        fått av deg. Vennligst se over og send inn hvilken inntekt som er den riktige. Frist for å svare
                        på denne oppgaven er {dateFormatter.compact(dayjs(oppgave.svarfrist).add(1, 'day').toDate())}.
                    </BodyShort>
                    <BodyShort spacing={true}>
                        Hvis du ikke sender inn et svar, vil vi bruke inntekten vi har fått fra a-ordningen.
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
                                submitButtonLabel="Send inn svar"
                                cancelButtonLabel="Avbryt"
                                submitPending={pending}
                                includeValidationSummary={true}
                                formErrorHandler={getIntlFormErrorHandler(intl, 'inntektForm.validation')}>
                                <VStack gap="6" marginBlock="2 0">
                                    <VStack gap="2">
                                        <Heading level="3" size="xsmall">
                                            Inntektsperiode
                                        </Heading>
                                        <BodyShort>{periodetekst}</BodyShort>
                                    </VStack>
                                    <VStack gap="2">
                                        <Heading level="3" size="xsmall">
                                            Inntekt du har oppgitt
                                        </Heading>
                                        <BodyShort as="div">
                                            {inntektFraDeltaker ? (
                                                <List>
                                                    <List.Item title="Arbeidstaker/frilans">
                                                        <FormattedNumber
                                                            value={inntektFraDeltaker.arbeidstakerOgFrilansInntekt || 0}
                                                        />{' '}
                                                        kroner
                                                    </List.Item>
                                                    <List.Item title="Ytelser fra Nav">
                                                        <FormattedNumber
                                                            value={inntektFraDeltaker.inntektFraYtelse || 0}
                                                        />{' '}
                                                        kroner
                                                    </List.Item>
                                                </List>
                                            ) : (
                                                <>Du har ikke oppgitt inntekt for denne perioden</>
                                            )}
                                        </BodyShort>
                                    </VStack>
                                    <VStack gap="2">
                                        <Heading level="3" size="xsmall">
                                            Inntekt vi var har fått fra a-ordningen
                                        </Heading>

                                        <List>
                                            <List.Item title="Arbeidstaker/frilans">
                                                <FormattedNumber
                                                    value={inntektFraAinntekt.arbeidstakerOgFrilansInntekt || 0}
                                                />{' '}
                                                kroner
                                            </List.Item>
                                            <List.Item title="Ytelser fra Nav">
                                                <FormattedNumber value={inntektFraAinntekt.inntektFraYtelse || 0} />{' '}
                                                kroner
                                            </List.Item>
                                        </List>
                                    </VStack>

                                    <YesOrNoQuestion
                                        name={FormFields.godkjenner}
                                        legend={`Er inntekten vi har fått fra a-ordningen korrekt?`}
                                        validate={getYesOrNoValidator()}
                                        description={
                                            <ReadMore header="Jeg forstår ikke hvorfor inntekten er forskjellig">
                                                <Box marginBlock="2 0">
                                                    <Heading level="3" size="xsmall">
                                                        Mulige årsaker
                                                    </Heading>
                                                    <List>
                                                        <List.Item>
                                                            Du har ikke tatt med alle inntektene i perioden, eller
                                                            oppgitt feil inntekt
                                                        </List.Item>
                                                        <List.Item>
                                                            Arbeidsgiver har rapportert feil inntekt til a-ordningen
                                                        </List.Item>
                                                        <List.Item>Kan en ytelse fra Nav være feil?</List.Item>
                                                    </List>
                                                    <Heading level="3" size="xsmall">
                                                        Hva kan du gjøre?
                                                    </Heading>
                                                    <List>
                                                        <List.Item>
                                                            Se over inntekten for perioden på nytt og se om det er noe
                                                            du har glemt eller oppgitt feil
                                                        </List.Item>
                                                        <List.Item>
                                                            Ta kontakt med arbeidsgiver og se om de har oppgitt riktig
                                                            inntekt
                                                        </List.Item>
                                                        <List.Item>Ta kontakt med din veileder?</List.Item>
                                                    </List>
                                                </Box>
                                            </ReadMore>
                                        }
                                    />
                                    {values[FormFields.godkjenner] === YesOrNo.NO ? (
                                        <>
                                            <Alert variant="info">
                                                Når du mener inntekten fra a-ordningen ikke er korrekt, må du oppgi
                                                hvilken inntekt du mener er den riktige og begrunne hvorfor inntekten er
                                                forskjellig.
                                            </Alert>
                                            <NumberInput
                                                name={FormFields.arbeidstakerOgFrilansInntekt}
                                                label="Oppgi inntekt fra arbeidsgiver/frilans i perioden"
                                                validate={getNumberValidator({ required: true })}
                                            />
                                            <NumberInput
                                                name={FormFields.inntektFraYtelse}
                                                label="Oppgi inntekt fra ytelser i perioden"
                                                validate={getNumberValidator({ required: true })}
                                            />
                                            <Textarea
                                                name={FormFields.begrunnelse}
                                                label="Skriv en kort begrunnelse for hvorfor inntekten er annerledes enn den vi har fra a-ordningen"
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
                                    <ConfirmationCheckbox
                                        name={FormFields.bekrefterOpplysninger}
                                        label="Jeg bekrefter at ..."
                                    />
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
