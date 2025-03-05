import { Alert, BodyShort, ReadMore, VStack } from '@navikt/ds-react';
import { dateFormatter, dateToISODate } from '@navikt/sif-common-utils';
import { EndreSluttdatoOppgave } from '@navikt/ung-common';
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
import { getDateValidator, getStringValidator, getYesOrNoValidator } from '@navikt/sif-validation';
import { UngdomsytelseOppgavebekreftelse } from '@navikt/k9-brukerdialog-prosessering-api';
import { useBesvarOppgave } from '../../hooks/useBesvarOppgave';

interface Props {
    deltakelseId: string;
    oppgave: EndreSluttdatoOppgave;
    opprinneligSluttdato?: Date;
}

enum FormFields {
    harKontaktetVeileder = 'harKontaktetVeileder',
    korrigertDato = 'korrigertDato',
    godkjenner = 'godkjenner',
    begrunnelse = 'begrunnelse',
}

type FormValues = Partial<{
    [FormFields.korrigertDato]: Date;
    [FormFields.harKontaktetVeileder]: YesOrNo;
    [FormFields.begrunnelse]: string;
    [FormFields.godkjenner]: YesOrNo;
}>;

const { FormikWrapper, Form, YesOrNoQuestion, Textarea, DatePicker } = getTypedFormComponents<
    FormFields,
    FormValues,
    ValidationError
>();

const EndretSluttdatoOppgaveForm = ({ deltakelseId, oppgave, opprinneligSluttdato }: Props) => {
    const { intl } = useAppIntl();
    const { sendSvar, error, pending } = useBesvarOppgave();
    const nySluttdatoTekst = dateFormatter.dayDateMonthYear(oppgave.oppgavetypeData.nySluttdato);

    const handleSubmit = async (values: FormValues) => {
        const godkjennerOppgave = values[FormFields.godkjenner] === YesOrNo.YES;

        const dto: UngdomsytelseOppgavebekreftelse = {
            deltakelseId,
            oppgave: {
                oppgaveId: oppgave.id,
                bekreftelseSvar: godkjennerOppgave ? 'GODTAR' : 'AVSLÅR',
                nySluttdato: dateToISODate(oppgave.oppgavetypeData.nySluttdato),
                ikkeGodkjentResponse: godkjennerOppgave
                    ? undefined
                    : {
                          kontaktVeilederSvar: values[FormFields.harKontaktetVeileder] === YesOrNo.YES,
                          korrigertDato: dateToISODate(values[FormFields.korrigertDato]!),
                          meldingFraDeltaker: values[FormFields.begrunnelse]!,
                      },
                type: 'EndretSluttdatoUngdomsytelseOppgaveDTO',
            },
        };
        await sendSvar(dto);
    };

    return (
        <OppgaveLayout
            tittel="Din deltakerperiode blir endret"
            beskrivelse={
                <>
                    <BodyShort>
                        {opprinneligSluttdato ? (
                            <>
                                Veileder har registrert at datoen du går ut av ungdomsprogrammet skal være{' '}
                                <BodyShort as="span" className="inline-block nowrap" weight="semibold">
                                    {nySluttdatoTekst}
                                </BodyShort>
                                .
                            </>
                        ) : (
                            <>
                                Veileder har registrert at datoen du går ut av ungdomsprogrammet skal endres til{' '}
                                <BodyShort as="span" className="inline-block nowrap" weight="semibold">
                                    {nySluttdatoTekst}
                                </BodyShort>
                                .
                            </>
                        )}
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
                                        legend={`Godkjenner du at sluttdato endres til ${nySluttdatoTekst}?`}
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
                                            <DatePicker
                                                name={FormFields.korrigertDato}
                                                label="Hvilken dato mener du er korrekt?"
                                                validate={getDateValidator({ required: true })}
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

export default EndretSluttdatoOppgaveForm;
