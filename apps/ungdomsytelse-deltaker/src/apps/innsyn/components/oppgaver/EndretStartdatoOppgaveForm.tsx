import { Alert, BodyShort, ReadMore, VStack } from '@navikt/ds-react';
import { dateFormatter } from '@navikt/sif-common-utils';
import { EndreStartdatoOppgave } from '@navikt/ung-common';
import OppgaveLayout from './OppgaveLayout';
import MeldingFraVeileder from '../melding-fra-veileder/MeldingFraVeileder';
import dayjs from 'dayjs';
import {
    getIntlFormErrorHandler,
    getTypedFormComponents,
    ValidationError,
    YesOrNo,
} from '@navikt/sif-common-formik-ds';
import { useAppIntl } from '../../../../i18n';
import { getStringValidator, getYesOrNoValidator } from '@navikt/sif-validation';
import { EndretStartdatoUngdomsytelseOppgaveDto } from '@navikt/k9-brukerdialog-prosessering-api';

interface Props {
    oppgave: EndreStartdatoOppgave;
    opprinneligStartdato: Date;
}

enum FormFields {
    harKontaktetVeileder = 'harKontaktetVeileder',
    godkjenner = 'godkjenner',
    begrunnelse = 'begrunnelse',
}

type FormValues = Partial<{
    [FormFields.godkjenner]: YesOrNo;
    [FormFields.harKontaktetVeileder]: YesOrNo;
    [FormFields.begrunnelse]: boolean;
}>;

const { FormikWrapper, Form, YesOrNoQuestion, Textarea } = getTypedFormComponents<
    FormFields,
    FormValues,
    ValidationError
>();

const EndretStartdatoOppgaveForm = ({ oppgave }: Props) => {
    const { intl } = useAppIntl();
    const nyStartdatoTekst = dateFormatter.dayDateMonthYear(oppgave.oppgavetypeData.nyStartdato);
    // const opprinneligStartdatoTekst = dateFormatter.dayDateMonthYear(opprinneligStartdato);

    const handleSubmit = (values: FormValues) => {
        const dto: EndretStartdatoUngdomsytelseOppgaveDto = {
            // ...oppgave,
            bekreftelseSvar: values[FormFields.godkjenner] === YesOrNo.YES ? 'GODTAR' : 'AVSLÅR',
            oppgaveId: oppgave.oppgaveId,
            veilederRef: oppgave.oppgavetypeData.veilederRef,
            nyStartdato: 'sdf',
            isIkkeGodkjentResponseValid: false,
            type: 'EndretStartdatoUngdomsytelseOppgaveDTO',
        };
        console.log(dto);
    };

    return (
        <OppgaveLayout
            tittel="Din deltakerperiode blir endret"
            beskrivelse={
                <>
                    <BodyShort>
                        Veileder har registrert at datoen du startet i ungdomsprogrammet vil bli endret til{' '}
                        <BodyShort as="span" className="inline-block nowrap" weight="semibold">
                            {nyStartdatoTekst}
                        </BodyShort>
                        .
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
                {oppgave.oppgavetypeData.meldingFraVeileder ? (
                    <MeldingFraVeileder
                        tekst={oppgave.oppgavetypeData.meldingFraVeileder}
                        avsender={oppgave.oppgavetypeData.veilederRef}
                    />
                ) : null}

                <FormikWrapper
                    initialValues={{}}
                    onSubmit={handleSubmit}
                    renderForm={({ values }) => {
                        // const godkjenner = values[FormFields.godkjenner] === YesOrNo.YES;
                        return (
                            <Form
                                submitButtonLabel="Send inn inntekt"
                                cancelButtonLabel="Avbryt"
                                includeValidationSummary={true}
                                // submitPending={pending}
                                formErrorHandler={getIntlFormErrorHandler(intl, 'inntektForm.validation')}>
                                <VStack gap="6" marginBlock="2 0">
                                    <YesOrNoQuestion
                                        name={FormFields.godkjenner}
                                        legend={`Godkjenner du at startdato endres til ${nyStartdatoTekst}?`}
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
                                            <Alert variant="info">
                                                <BodyShort spacing={true}>
                                                    Når du ikke ønsker å godkjenne, bør du først ta kontakt med veileder
                                                    for å se om dere kan oppklare hvorfor du ikke ønsker å godkjenne.
                                                </BodyShort>
                                                <BodyShort>
                                                    Hvis du allerede har vært i kontakt med din veileder om dette, kan
                                                    du sende inn at du ikke godkjenner endringen, men du må gi en kort
                                                    beskrivelse av hvorfor du ikke ønsker å godkjenne.
                                                </BodyShort>
                                            </Alert>

                                            <YesOrNoQuestion
                                                name={FormFields.harKontaktetVeileder}
                                                legend="Har du hatt kontakt med veileder for å diskutere hvorfor du ikke ønsker å godkjenne denne endringen?"
                                                validate={getYesOrNoValidator()}
                                            />
                                            <Textarea
                                                name={FormFields.begrunnelse}
                                                label="Skriv en kort begrunnelse for hvorfor du ikke ønsker å godkjenne"
                                                maxLength={250}
                                                validate={getStringValidator({ required: true, maxLength: 250 })}
                                            />
                                        </>
                                    ) : null}
                                </VStack>
                            </Form>
                        );
                    }}
                />
                {/* <HStack gap="4">
                    <Button
                        variant="primary"
                        type="button"
                        icon={<PaperplaneIcon />}
                        onClick={(evt) => {
                            evt.preventDefault();
                            evt.stopPropagation();
                            alert('TODO');
                        }}>
                        Send svar
                    </Button>
                </HStack> */}
            </VStack>
        </OppgaveLayout>
    );
};

export default EndretStartdatoOppgaveForm;
