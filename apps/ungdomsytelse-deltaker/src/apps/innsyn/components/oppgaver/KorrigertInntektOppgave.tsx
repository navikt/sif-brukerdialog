import { Alert, BodyLong, ReadMore, VStack } from '@navikt/ds-react';
import { FormattedNumber } from 'react-intl';
import { UngdomsytelseOppgaveDto } from '@navikt/k9-brukerdialog-prosessering-api';
import {
    FormikConfirmationCheckbox,
    getIntlFormErrorHandler,
    getTypedFormComponents,
    ValidationError,
    YesOrNo,
} from '@navikt/sif-common-formik-ds';
import { Kvittering } from '@navikt/sif-common-soknad-ds/src';
import { dateFormatter, dateRangeFormatter } from '@navikt/sif-common-utils';
import { getCheckedValidator, getStringValidator, getYesOrNoValidator } from '@navikt/sif-validation';
import { KorrigertInntektOppgave } from '@navikt/ung-common';
import dayjs from 'dayjs';
import { useAppIntl } from '../../../../i18n';
import InntektTabell from '../inntekt-tabell/InntektTabell';
import { useDeprOppgaveContext } from '../oppgavebekreftelse/DeprOppgaveContext';
import PageOppgaveLayout from './PageOppgaveLayout';

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

const KorrigertInntektOppgave = ({ oppgave }: Props) => {
    const { intl } = useAppIntl();
    const { sendSvar, error, isPending, erBesvart } = useDeprOppgaveContext();

    const handleSubmit = async (values: FormValues) => {
        const godkjennerOppgave = values[FormFields.godkjenner] === YesOrNo.YES;
        const oppgaveDto: UngdomsytelseOppgaveDto = {
            oppgaveReferanse: oppgave.oppgaveReferanse,
            uttalelse: {
                bekreftelseSvar: godkjennerOppgave ? 'GODTAR' : 'AVSLÅR',
                meldingFraDeltaker: values[FormFields.begrunnelse],
            },
        };

        await sendSvar({
            oppgave: oppgaveDto,
        });
    };

    const { fraOgMed, tilOgMed } = oppgave.oppgavetypeData;
    const periodetekst = dateRangeFormatter.getDateRangeText(
        {
            from: fraOgMed,
            to: tilOgMed,
        },
        intl.locale,
    );
    const svarfristTekst = dateFormatter.compact(dayjs(oppgave.svarfrist).add(1, 'day').toDate());
    const {
        registerinntekt: { arbeidOgFrilansInntekter, ytelseInntekter },
    } = oppgave.oppgavetypeData;

    const harOppgittInntekt = false; // TODO

    const summertInntektFraAinntekt =
        arbeidOgFrilansInntekter.reduce((acc, arbeidsgiver) => acc + arbeidsgiver.inntekt, 0) +
        ytelseInntekter.reduce((acc, yelse) => acc + yelse.inntekt, 0);

    const summertInntektFraDeltaker = 0;

    if (erBesvart) {
        return <Kvittering tittel="Ditt svar er mottatt">sdf</Kvittering>;
    }

    return (
        <PageOppgaveLayout
            tittel={
                harOppgittInntekt
                    ? `Endret inntekt for perioden ${periodetekst}`
                    : `Inntekt for perioden ${periodetekst}`
            }
            svarfrist={oppgave.svarfrist}
            beskrivelse={
                <BodyLong as="div">
                    <>
                        {harOppgittInntekt ? (
                            <>
                                <p className="mt-0">
                                    Vi har mottatt inntektsopplysninger fra a-ordningen som avviker fra beløpet du har
                                    oppgitt. Du har oppgitt{' '}
                                    <strong>
                                        <FormattedNumber value={summertInntektFraDeltaker} /> kroner
                                    </strong>
                                    , mens vi har mottatt{' '}
                                    <strong>
                                        <FormattedNumber value={summertInntektFraAinntekt} /> kroner
                                    </strong>{' '}
                                    fra A-ordningen.
                                </p>
                                <p>
                                    Vil vil bruke inntekten fra A-ordningen som grunnlag for beregning av ytelsen din.
                                </p>
                            </>
                        ) : (
                            <p className="mt-0">
                                Du har ikke rapportert inntekt for denne perioden. Vi har nå mottatt
                                inntektsopplysninger fra A-ordningen som vi vil bruke som grunnlag for beregning av
                                ytelsen din.
                            </p>
                        )}
                    </>
                    <p className="mb-0">
                        For at vi skal kunne behandle saken din, må du bekrefte at den inntekten vi har registrert er
                        den korrekte innen <strong>{svarfristTekst}</strong>. Hvis vi ikke mottar en bekreftelse innen
                        fristen, vil vi automatisk bruke inntektsopplysningene fra a-ordningen. Eventuell utbetaling vil
                        bli satt på vent til du har bekreftet endringen, eller fristen har passert.
                    </p>
                </BodyLong>
            }>
            <VStack gap="4">
                <FormikWrapper
                    initialValues={{}}
                    onSubmit={handleSubmit}
                    renderForm={({ values }) => {
                        return (
                            <Form
                                submitButtonLabel="Send"
                                submitPending={isPending}
                                includeValidationSummary={true}
                                formErrorHandler={getIntlFormErrorHandler(intl, 'inntektForm.validation')}>
                                <VStack gap="8" marginBlock="2 0">
                                    <VStack gap="4">
                                        {arbeidOgFrilansInntekter.length > 0 ? (
                                            <>
                                                <InntektTabell
                                                    header="Arbeidstaker/frilanser"
                                                    inntekt={arbeidOgFrilansInntekter.map(
                                                        ({ arbeidsgiver, inntekt }) => ({
                                                            beløp: inntekt,
                                                            navn: arbeidsgiver,
                                                        }),
                                                    )}
                                                />
                                            </>
                                        ) : null}
                                        {ytelseInntekter.length > 0 ? (
                                            <>
                                                <InntektTabell
                                                    header="Ytelser"
                                                    inntekt={ytelseInntekter.map((y) => ({
                                                        beløp: y.inntekt,
                                                        navn: y.ytelsetype,
                                                    }))}
                                                />
                                            </>
                                        ) : null}
                                    </VStack>

                                    <YesOrNoQuestion
                                        reverse={true}
                                        name={FormFields.godkjenner}
                                        legend="Er inntektsopplysningene fra A-ordningen riktig?"
                                        validate={getYesOrNoValidator()}
                                        labels={{
                                            yes: 'Ja',
                                        }}
                                    />
                                    {values[FormFields.godkjenner] === YesOrNo.NO ? (
                                        <Textarea
                                            name={FormFields.begrunnelse}
                                            label="Hvorfor stemmer ikke inntekten vi har fått fra a-ordningen?"
                                            maxLength={250}
                                            description={
                                                <ReadMore header="Hva skal jeg skrive her?">
                                                    Hvis du har en klar årsak, skriv den. Hvis du er usikker skriver det
                                                    du tror kan forårsake dette.
                                                </ReadMore>
                                            }
                                            validate={getStringValidator({ required: true, maxLength: 250 })}
                                        />
                                    ) : null}

                                    {values[FormFields.godkjenner] === YesOrNo.YES ? (
                                        <>
                                            <FormikConfirmationCheckbox
                                                name={FormFields.bekrefterOpplysninger}
                                                label="Jeg bekrefter at denne inntekten skal brukes for å beregne min ytelse for denne perioden."
                                                validate={getCheckedValidator()}
                                            />
                                        </>
                                    ) : null}
                                    {values[FormFields.godkjenner] === YesOrNo.NO ? (
                                        <>
                                            <FormikConfirmationCheckbox
                                                name={FormFields.bekrefterOpplysninger}
                                                label="Jeg bekrefter at informasjonen jeg oppgitt ovenfor er riktig."
                                                validate={getCheckedValidator()}
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
        </PageOppgaveLayout>
    );
};

export default KorrigertInntektOppgave;
