import { Alert, BodyShort, HStack, ReadMore, VStack } from '@navikt/ds-react';
import { dateFormatter } from '@navikt/sif-common-utils';
import { EndretProgramperiodeOppgave } from '@navikt/ung-common';
import OppgaveLayout from './OppgaveLayout';
import dayjs from 'dayjs';
import {
    getIntlFormErrorHandler,
    getTypedFormComponents,
    ValidationError,
    YesOrNo,
} from '@navikt/sif-common-formik-ds';
import { useAppIntl } from '../../../../i18n';
import { getStringValidator, getYesOrNoValidator } from '@navikt/sif-validation';
import { UngdomsytelseOppgavebekreftelse } from '@navikt/k9-brukerdialog-prosessering-api';
import { CalendarIcon } from '@navikt/aksel-icons';
import { useOppgaveContext } from '../oppgave/OppgaveContext';

interface Props {
    deltakelseId: string;
    oppgave: EndretProgramperiodeOppgave;
}

enum FormFields {
    harKontaktetVeileder = 'harKontaktetVeileder',
    godkjenner = 'godkjenner',
    begrunnelse = 'begrunnelse',
}

type FormValues = Partial<{
    [FormFields.harKontaktetVeileder]: YesOrNo;
    [FormFields.begrunnelse]: string;
    [FormFields.godkjenner]: YesOrNo;
}>;

const { FormikWrapper, Form, YesOrNoQuestion, Textarea } = getTypedFormComponents<
    FormFields,
    FormValues,
    ValidationError
>();

const EndretProgramperiodeOppgaveForm = ({ oppgave }: Props) => {
    const { intl } = useAppIntl();
    const { sendSvar, error, pending, setVisSkjema } = useOppgaveContext();
    const { fraOgMed, tilOgMed } = oppgave.oppgavetypeData;

    const handleSubmit = async (values: FormValues) => {
        const godkjennerOppgave = values[FormFields.godkjenner] === YesOrNo.YES;

        const dto: UngdomsytelseOppgavebekreftelse = {
            oppgave: {
                oppgaveReferanse: oppgave.oppgaveReferanse,
                uttalelse: {
                    bekreftelseSvar: godkjennerOppgave ? 'GODTAR' : 'AVSLÅR',
                    meldingFraDeltaker: values[FormFields.begrunnelse]!,
                },
            },
        };
        await sendSvar(dto);
    };

    return (
        <OppgaveLayout
            tag={
                <HStack gap="2">
                    <CalendarIcon />
                    Endret deltakerperiode
                </HStack>
            }
            tittel="Din deltakerperiode blir endret"
            svarfrist={oppgave.svarfrist}
            beskrivelse={
                <>
                    <BodyShort>
                        <>
                            Veileder har endret perioden du er med i programmet. Perioden er nå{' '}
                            <BodyShort>
                                <>
                                    fra og med{' '}
                                    <BodyShort as="span" className="inline-block nowrap" weight="semibold">
                                        {dateFormatter.compact(fraOgMed)}
                                    </BodyShort>
                                </>
                                {tilOgMed ? (
                                    <>
                                        {' '}
                                        til og med{' '}
                                        <BodyShort as="span" className="inline-block nowrap" weight="semibold">
                                            {dateFormatter.compact(tilOgMed)}
                                        </BodyShort>
                                    </>
                                ) : null}
                                .
                            </BodyShort>
                        </>
                    </BodyShort>
                    <BodyShort>
                        Du kan bekrefte eller kommentere denne endringen frem til og med{' '}
                        {dateFormatter.compact(oppgave.svarfrist)}. Endringen vil tre i kraft når du bekrefter
                        endringen, eller senest {dateFormatter.compact(dayjs(oppgave.svarfrist).add(1, 'day').toDate())}
                        .
                    </BodyShort>
                </>
            }>
            <VStack gap="4">
                <FormikWrapper
                    initialValues={{}}
                    onSubmit={handleSubmit}
                    renderForm={({ values, resetForm }) => {
                        return (
                            <Form
                                submitButtonLabel="Send"
                                cancelButtonLabel="Avbryt"
                                onCancel={() => {
                                    resetForm();
                                    setVisSkjema(false);
                                }}
                                submitPending={pending}
                                includeValidationSummary={true}
                                formErrorHandler={getIntlFormErrorHandler(intl, 'inntektForm.validation')}>
                                <VStack gap="6" marginBlock="2 0">
                                    <YesOrNoQuestion
                                        name={FormFields.godkjenner}
                                        legend={`Godkjenner du endringen i programperioden?`}
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
                                            <YesOrNoQuestion
                                                name={FormFields.harKontaktetVeileder}
                                                legend="Har du hatt kontakt med veileder for å diskutere hvorfor du ikke ønsker å godkjenne denne endringen?"
                                                validate={getYesOrNoValidator()}
                                            />
                                            {values.harKontaktetVeileder === YesOrNo.NO ? (
                                                <Alert variant="info">
                                                    Vi anbefaler deg å ta kontakt med veileder for å se om dere kan
                                                    oppklare hvorfor du ikke ønsker å godkjenne. Da kan veileder evt.
                                                    endre datoen til den dere blir enig om.
                                                </Alert>
                                            ) : null}
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

export default EndretProgramperiodeOppgaveForm;
