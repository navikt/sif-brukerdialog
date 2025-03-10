import { Alert, BodyShort, ReadMore, VStack } from '@navikt/ds-react';
import { dateFormatter } from '@navikt/sif-common-utils';
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

interface Props {
    deltakelseId: string;
    oppgave: KorrigertInntektOppgave;
}

enum FormFields {
    korrigertInntekt = 'korrigertInntekt',
    godkjenner = 'godkjenner',
    begrunnelse = 'begrunnelse',
}

type FormValues = Partial<{
    [FormFields.korrigertInntekt]: string;
    [FormFields.begrunnelse]: string;
    [FormFields.godkjenner]: YesOrNo;
}>;

const { FormikWrapper, Form, YesOrNoQuestion, Textarea, NumberInput } = getTypedFormComponents<
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
                          korrigertInntekt: parseInt(values[FormFields.korrigertInntekt]!, 10),
                          meldingFraDeltaker: values[FormFields.begrunnelse]!,
                      },
                type: Oppgavetype.BEKREFT_KORRIGERT_INNTEKT,
            },
        };
        await sendSvar(dto);
    };

    return (
        <OppgaveLayout
            tag="Avvik i inntekt"
            tittel="Inntekt stemmer ikke med registrert inntekt"
            besvart={besvart}
            beskrivelse={
                <>
                    <BodyShort>
                        Inntekt vi har fått rapportert gjennom a-inntekt stemmer ikke overens med den inntekten du har
                        oppgitt. Vennligst se over inntekten og bekreft om den er korrekt. Du må gjøre dette innen
                        utgangen av {dateFormatter.compact(dayjs(oppgave.svarfrist).add(1, 'day').toDate())}.
                    </BodyShort>
                    <BodyShort spacing={true}>
                        Hvis du ikke besvarer denne oppgaven, vil vi ta utgangspunkt i inntekten vi har fått fra
                        a-inntekt.
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
                                    <YesOrNoQuestion
                                        name={FormFields.godkjenner}
                                        legend={`Godkjenner du endret inntekt?`}
                                        validate={getYesOrNoValidator()}
                                        description={
                                            <>
                                                <ReadMore header="Hva betyr dette for meg">
                                                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sed
                                                    corporis quasi id fugiat eveniet quisquam quia quam voluptate
                                                    officiis dolores quidem sunt velit, cum nemo, minima eligendi.
                                                    Temporibus, dolores facere.
                                                </ReadMore>
                                            </>
                                        }
                                    />
                                    {values[FormFields.godkjenner] === YesOrNo.NO ? (
                                        <>
                                            <NumberInput
                                                name={FormFields.korrigertInntekt}
                                                label="Hvilken inntekt mener du er korrekt?"
                                                validate={getNumberValidator({ required: true })}
                                            />
                                            <Textarea
                                                name={FormFields.begrunnelse}
                                                label="Skriv en kort begrunnelse for hvorfor du ikke ønsker å godkjenne denne endringen. "
                                                maxLength={250}
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
