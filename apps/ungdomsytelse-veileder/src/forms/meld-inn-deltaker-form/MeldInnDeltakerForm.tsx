import dayjs from 'dayjs';
import { Deltakelse, NyDeltaker } from '../../api/types';
import { useState } from 'react';
import {
    FormikConfirmationCheckbox,
    FormikDatepicker,
    TypedFormikForm,
    TypedFormikWrapper,
} from '@navikt/sif-common-formik-ds';
import { BodyShort, Button, Heading, HStack, VStack } from '@navikt/ds-react';
import getIntlFormErrorHandler from '@navikt/sif-common-formik-ds/src/validation/intlFormErrorHandler';
import { useIntl } from 'react-intl';
import { getCheckedValidator, getDateValidator } from '@navikt/sif-common-formik-ds/src/validation';
import { PaperplaneIcon } from '@navikt/aksel-icons';
import { veilederService } from '../../api/services/veilederService';

interface Props {
    deltaker: NyDeltaker;
    onDeltakelseRegistrert: (deltakelse: Deltakelse) => void;
    onCancel: () => void;
}

const maxDate = dayjs().add(1, 'month').endOf('month').toDate();
const minDate = dayjs().subtract(3, 'months').startOf('month').toDate();

interface FormValues {
    startDato: string;
    bekreftRegistrering: boolean;
}

const MeldInnDeltakerForm = ({ deltaker, onCancel, onDeltakelseRegistrert: onDeltakerRegistrert }: Props) => {
    const navn = deltaker.navn.fornavn;
    const [submitPending, setSubmitPending] = useState(false);
    const intl = useIntl();

    const handleOnSubmit = async (values: FormValues) => {
        setSubmitPending(true);
        const deltakelse = await veilederService.meldInnDeltaker({
            deltakerIdent: deltaker.deltakerIdent,
            startdato: values.startDato,
        });
        setSubmitPending(false);
        onDeltakerRegistrert(deltakelse);
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
                                    Registrer ny deltaker
                                </Heading>
                                <FormikDatepicker
                                    name="startDato"
                                    label={`Hva er første dato i programmet for ${navn}?`}
                                    disableWeekends={true}
                                    minDate={minDate}
                                    maxDate={maxDate}
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
