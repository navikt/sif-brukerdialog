import dayjs from 'dayjs';
import { Deltakelse, Deltaker, UregistrertDeltaker } from '../../api/types';
import { useState } from 'react';
import {
    FormikConfirmationCheckbox,
    FormikDatepicker,
    TypedFormikForm,
    TypedFormikWrapper,
} from '@navikt/sif-common-formik-ds';
import { BodyShort, Button, Heading, HStack, VStack } from '@navikt/ds-react';
import { getIntlFormErrorHandler } from '@navikt/sif-common-formik-ds';
import { useIntl } from 'react-intl';
import { getCheckedValidator, getDateValidator } from '@navikt/sif-validation';
import { PaperplaneIcon } from '@navikt/aksel-icons';
import { localVeilederService } from '../../api/services/localVeilederService';

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
    const intl = useIntl();

    const handleOnSubmit = async (values: FormValues) => {
        setSubmitPending(true);
        const deltakelse = await localVeilederService.meldInnDeltaker({
            deltakerIdent: deltaker.deltakerIdent,
            startdato: values.startDato,
        });
        setSubmitPending(false);
        onDeltakelseRegistrert(deltakelse);
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
                        </VStack>
                    </TypedFormikForm>
                );
            }}
        />
    );
};

export default MeldInnDeltakerForm;
