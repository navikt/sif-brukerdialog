import { Alert, BodyShort, Button, Heading, HStack, VStack } from '@navikt/ds-react';
import { ReactElement, useState } from 'react';
import { useIntl } from 'react-intl';
import {
    ConfirmationDialog,
    FormikCheckboxGroup,
    FormikDatepicker,
    getIntlFormErrorHandler,
    TypedFormikForm,
    TypedFormikWrapper,
} from '@navikt/sif-common-formik-ds';
import { DateValidationOptions, getCheckedValidator, getDateValidator } from '@navikt/sif-validation';
import { Deltakelse } from '@navikt/ung-common';
import { isAxiosError } from 'axios';
import dayjs from 'dayjs';
import { veilederApiService } from '../../api/veilederApiService';

interface Props {
    deltakelse: Deltakelse;
    onDeltakelseAvsluttet: (deltakelse: Deltakelse) => void;
    onCancel?: () => void;
}

interface FormValues {
    utmeldingsdato: string;
    bekreftAvslutning: boolean;
}

const AvsluttDeltakelseForm = ({ deltakelse, onDeltakelseAvsluttet, onCancel }: Props) => {
    const [confirmationDialogVisible, setConfirmationDialogVisible] = useState(false);
    const [submitPending, setSubmitPending] = useState(false);
    const [error, setError] = useState<string | ReactElement | undefined>(undefined);
    const intl = useIntl();

    const avsluttDeltakelse = async (values: Partial<FormValues>) => {
        reset();
        const { utmeldingsdato } = values;
        if (typeof utmeldingsdato !== 'string') {
            setError('Du må velge en utmeldingsdato');
            return;
        }
        setSubmitPending(true);

        try {
            const avsluttetDeltakelse = await veilederApiService.meldUtDeltaker(deltakelse.id, utmeldingsdato);
            reset();
            setSubmitPending(false);
            onDeltakelseAvsluttet(avsluttetDeltakelse);
        } catch (e) {
            if (isAxiosError(e)) {
                setError(
                    <VStack gap="6">
                        <BodyShort>En feil oppstod ved avslutning av deltakelsen. Vennligst prøv på nytt</BodyShort>
                        <BodyShort size="small">
                            {e.code}: {e.message}
                        </BodyShort>
                    </VStack>,
                );
            } else {
                setError('En feil oppstod ved avslutning av deltakelsen');
            }
            setSubmitPending(false);
        }
    };

    const reset = () => {
        setError(undefined);
        setConfirmationDialogVisible(false);
    };

    return (
        <TypedFormikWrapper<FormValues>
            initialValues={{}}
            onSubmit={() => setConfirmationDialogVisible(true)}
            renderForm={({ resetForm, values }) => {
                return (
                    <>
                        <TypedFormikForm
                            includeButtons={false}
                            formErrorHandler={getIntlFormErrorHandler(intl, 'avsluttDeltakelseForm')}>
                            <VStack gap="4" maxWidth={'30rem'} width={'100%'}>
                                <Heading level="2" size="medium">
                                    Avslutt deltakerperiode
                                </Heading>
                                <FormikDatepicker
                                    name="utmeldingsdato"
                                    label={`Hvilken dag er siste dag i programmet?`}
                                    disableWeekends={true}
                                    defaultMonth={dayjs.max(dayjs(deltakelse.fraOgMed), dayjs()).toDate()}
                                    minDate={deltakelse.fraOgMed}
                                    maxDate={deltakelse.tilOgMed}
                                    validate={(value) => {
                                        const options: DateValidationOptions = {
                                            required: true,
                                            min: deltakelse.fraOgMed,
                                            max: deltakelse.tilOgMed,
                                            onlyWeekdays: true,
                                        };
                                        const error = getDateValidator(options)(value);
                                        if (error) {
                                            return error ? { key: error, values: { ...options } } : undefined;
                                        }
                                    }}
                                />
                                <FormikCheckboxGroup
                                    name={'bekreftRegistrering'}
                                    legend="Bekreft avslutning"
                                    hideLegend={true}
                                    validate={getCheckedValidator()}
                                    checkboxes={[
                                        {
                                            label: 'Jeg har opplyst deltaker om A, B, C, og avslutter deltakelsen i samråd med deltakeren. Eller hva en nå må skrive her.',
                                            value: 'bekreftRegistrering',
                                        },
                                    ]}
                                />

                                <HStack gap="2">
                                    <Button type="submit" variant="primary" loading={submitPending}>
                                        Avslutt periode
                                    </Button>
                                    <Button
                                        type="reset"
                                        variant="tertiary"
                                        onClick={() => {
                                            resetForm();
                                            reset();
                                            if (onCancel) {
                                                onCancel();
                                            }
                                        }}>
                                        Avbryt
                                    </Button>
                                </HStack>
                                {error ? <Alert variant="error">{error}</Alert> : null}
                            </VStack>
                        </TypedFormikForm>
                        <ConfirmationDialog
                            okLabel="Ja, avslutt deltakelse"
                            onCancel={() => {
                                setConfirmationDialogVisible(false);
                            }}
                            onConfirm={() => {
                                avsluttDeltakelse(values);
                            }}
                            open={confirmationDialogVisible}
                            title="Bekreft slett periode">
                            Bekreft at du ønsker å slette deltakelsesperioden
                        </ConfirmationDialog>
                    </>
                );
            }}
        />
    );
};

export default AvsluttDeltakelseForm;
