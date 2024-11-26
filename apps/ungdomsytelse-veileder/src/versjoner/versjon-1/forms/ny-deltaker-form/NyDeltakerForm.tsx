import dayjs from 'dayjs';
import { Deltaker, NyDeltaker } from '../../../../api/types';
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
import { veilederService } from '../../../../api/services/veilederService';

interface Props {
    deltaker: NyDeltaker;
    onDeltakerRegistrert: (deltaker: Deltaker) => void;
    onCancel: () => void;
}

const maxDate = dayjs().add(1, 'month').endOf('month').toDate();
const minDate = dayjs().subtract(3, 'months').startOf('month').toDate();

interface NyDeltakerFormValues {
    startDato: string;
    bekreftRegistrering: boolean;
}

const NyDeltakerForm = ({ deltaker, onCancel, onDeltakerRegistrert }: Props) => {
    const navn = deltaker.navn.fornavn; //formaterNavn(deltaker.navn);
    const [submitPending, setSubmitPending] = useState(false);
    const intl = useIntl();

    const handleOnSubmit = async (values: NyDeltakerFormValues) => {
        setSubmitPending(true);
        const nyDeltaker = await veilederService.registrerDeltaker({
            deltakerIdent: deltaker.deltakerIdent,
            fraOgMed: values.startDato,
        });
        setSubmitPending(false);
        onDeltakerRegistrert(nyDeltaker);
    };

    return (
        <TypedFormikWrapper<NyDeltakerFormValues>
            initialValues={{}}
            onSubmit={handleOnSubmit}
            renderForm={() => {
                return (
                    <TypedFormikForm
                        showSubmitButton={false}
                        formErrorHandler={getIntlFormErrorHandler(intl, 'nyDeltakerForm')}>
                        <VStack gap="6">
                            <VStack gap="4">
                                <Heading level="2" size="medium" spacing={true}>
                                    Registrer {navn} som ny deltaker
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
                                            <BodyShort>Bekreft deltakelse for {navn}</BodyShort>
                                        </>
                                    }
                                    name="bekreftRegistrering"
                                    validate={getCheckedValidator()}
                                />
                            </VStack>

                            <HStack gap="2">
                                <Button type="submit" variant="primary" loading={submitPending}>
                                    Registrer deltakelse
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

export default NyDeltakerForm;
