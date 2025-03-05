import { Alert, BodyShort, Button, Heading, HStack, VStack } from '@navikt/ds-react';
import { useState } from 'react';
import { useIntl } from 'react-intl';
import { PaperplaneIcon } from '@navikt/aksel-icons';
import {
    FormikConfirmationCheckbox,
    FormikDatepicker,
    getIntlFormErrorHandler,
    TypedFormikForm,
    TypedFormikWrapper,
} from '@navikt/sif-common-formik-ds';
import { getCheckedValidator, getDateValidator } from '@navikt/sif-validation';
import { ApiErrorObject, Deltakelse, Deltaker, UregistrertDeltaker, veilederApiService } from '@navikt/ung-common';
import dayjs from 'dayjs';

interface Props {
    deltaker: UregistrertDeltaker | Deltaker;
    minStartDato?: Date;
    onDeltakelseRegistrert: (deltakelse: Deltakelse) => void;
    onCancel: () => void;
}

const maxDate = dayjs().add(2, 'years').endOf('month').toDate();
const minDate = dayjs().subtract(2, 'years').startOf('month').toDate();

interface FormValues {
    startDato: string;
    bekreftRegistrering: boolean;
}

const MeldInnDeltakerForm = ({ deltaker, minStartDato, onCancel, onDeltakelseRegistrert }: Props) => {
    const [submitPending, setSubmitPending] = useState(false);
    const [error, setError] = useState<ApiErrorObject | undefined>();
    const intl = useIntl();

    const handleOnSubmit = async (values: FormValues) => {
        setSubmitPending(true);
        try {
            const deltakelse = await veilederApiService.meldInnDeltaker({
                deltakerIdent: deltaker.deltakerIdent,
                startdato: values.startDato,
            });
            onDeltakelseRegistrert(deltakelse);
        } catch (e) {
            setError(e);
        } finally {
            setSubmitPending(false);
        }
    };

    return (
        <TypedFormikWrapper<FormValues>
            initialValues={{}}
            onSubmit={handleOnSubmit}
            renderForm={() => {
                return (
                    <TypedFormikForm
                        showSubmitButton={false}
                        formErrorHandler={getIntlFormErrorHandler(intl, 'meldInnDeltakerForm')}>
                        <VStack gap="6">
                            <VStack gap="4">
                                <Heading level="2" size="small" spacing={false}>
                                    Registrer ny deltakelse
                                </Heading>
                                <FormikDatepicker
                                    name="startDato"
                                    label={`Når starter deltakelsen?`}
                                    disableWeekends={true}
                                    minDate={minStartDato || minDate}
                                    maxDate={maxDate}
                                    defaultMonth={minStartDato}
                                    validate={getDateValidator({
                                        required: true,
                                        min: minDate,
                                        max: maxDate,
                                        onlyWeekdays: true,
                                    })}
                                />
                                <FormikConfirmationCheckbox
                                    label={
                                        <>
                                            <BodyShort>Bekreft deltakelse</BodyShort>
                                        </>
                                    }
                                    name="bekreftRegistrering"
                                    validate={getCheckedValidator()}
                                />
                            </VStack>

                            <HStack gap="2">
                                <Button
                                    type="submit"
                                    variant="primary"
                                    loading={submitPending}
                                    iconPosition="right"
                                    icon={<PaperplaneIcon aria-hidden />}>
                                    Registrer
                                </Button>
                                <Button type="button" variant="tertiary" onClick={onCancel}>
                                    Avbryt
                                </Button>
                            </HStack>
                            {error ? <Alert variant="error">{error.message}</Alert> : null}
                        </VStack>
                    </TypedFormikForm>
                );
            }}
        />
    );
};

export default MeldInnDeltakerForm;
