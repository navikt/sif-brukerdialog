import { Deltakelse } from '../../api/types';
import { useState } from 'react';
import { FormikDatepicker, TypedFormikForm, TypedFormikWrapper } from '@navikt/sif-common-formik-ds';
import { Alert, BodyShort, Button, Heading, HStack, VStack } from '@navikt/ds-react';
import getIntlFormErrorHandler from '@navikt/sif-common-formik-ds/src/validation/intlFormErrorHandler';
import { useIntl } from 'react-intl';
import {
    DateValidationOptions,
    getCheckedValidator,
    getDateValidator,
} from '@navikt/sif-common-formik-ds/src/validation';
import { PaperplaneIcon } from '@navikt/aksel-icons';
import { veilederService } from '../../api/services/veilederService';
import dayjs from 'dayjs';
import FormikCheckboxGroup from '@navikt/sif-common-formik-ds/src/components/formik-checkbox-group/FormikCheckboxGroup';
import { isAxiosError } from 'axios';

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
    const [submitPending, setSubmitPending] = useState(false);
    const [error, setError] = useState<string | JSX.Element | undefined>(undefined);
    const intl = useIntl();

    const handleOnSubmit = async (values: FormValues) => {
        reset();
        setSubmitPending(true);

        try {
            const avsluttetDeltakelse = await veilederService.avsluttDeltakelse({
                deltakelseId: deltakelse.id,
                utmeldingsdato: values.utmeldingsdato,
            });
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
    };

    return (
        <TypedFormikWrapper<FormValues>
            initialValues={{}}
            onSubmit={handleOnSubmit}
            renderForm={({ resetForm }) => {
                return (
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
                                        label: 'Jeg bekrefter at deltakelsen skal avsluttes denne datoen. Deltakeren vil ikke lenger være en del av programmet.',
                                        value: 'bekreftRegistrering',
                                    },
                                ]}
                            />

                            <HStack gap="2">
                                <Button
                                    type="submit"
                                    variant="primary"
                                    loading={submitPending}
                                    iconPosition="right"
                                    icon={<PaperplaneIcon aria-hidden />}>
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
                );
            }}
        />
    );
};

export default AvsluttDeltakelseForm;
