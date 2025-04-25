import { Alert, BodyShort, Button, Heading, HStack, VStack } from '@navikt/ds-react';
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
import { Deltakelse, Deltaker, UregistrertDeltaker } from '@navikt/ung-common';

import { useMeldInnDeltaker } from '../../hooks/useMeldInnDeltaker';
import dayjs from 'dayjs';
import { dateFormatter, getDateToday } from '@navikt/sif-common-utils';
import { getStartdatobegrensningForDeltaker } from '../../utils/deltakelseUtils';
import { GYLDIG_PERIODE } from '../../settings';

interface Props {
    deltaker: UregistrertDeltaker | Deltaker;
    onDeltakelseRegistrert: (deltakelse: Deltakelse) => void;
    onCancel: () => void;
}

interface FormValues {
    startDato: string;
    bekreftRegistrering: boolean;
}

const MeldInnDeltakerForm = ({ deltaker, onCancel, onDeltakelseRegistrert }: Props) => {
    const intl = useIntl();

    const { mutateAsync, isPending, error } = useMeldInnDeltaker(deltaker.deltakerIdent);

    const handleOnSubmit = async (values: FormValues) => {
        const deltakelse = await mutateAsync({
            deltakerIdent: deltaker.deltakerIdent,
            startdato: values.startDato,
        });
        onDeltakelseRegistrert(deltakelse);
    };

    const startdatoMinMax = getStartdatobegrensningForDeltaker(
        deltaker.førsteMuligeInnmeldingsdato,
        deltaker.sisteMuligeInnmeldingsdato,
        GYLDIG_PERIODE.from,
        getDateToday(),
    );

    if (startdatoMinMax === 'fomFørTom') {
        return (
            <Alert variant="error">
                Deltaker kan ikke meldes inn fordi perioden deltakeren kan meldes inn ikke er gyldig.
            </Alert>
        );
    }

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
                                    description={
                                        <>Tidligste startdato er {dateFormatter.compact(startdatoMinMax.from)}</>
                                    }
                                    minDate={startdatoMinMax.from}
                                    maxDate={startdatoMinMax.to}
                                    defaultMonth={dayjs.max([dayjs(startdatoMinMax.from), dayjs()]).toDate()}
                                    validate={(value) => {
                                        const error = getDateValidator({
                                            required: true,
                                            min: startdatoMinMax.from,
                                            max: startdatoMinMax.to,
                                            onlyWeekdays: true,
                                        })(value);
                                        return error
                                            ? {
                                                  key: error,
                                                  values: {
                                                      min: dateFormatter.compact(startdatoMinMax.from),
                                                      max: dateFormatter.compact(startdatoMinMax.to),
                                                  },
                                              }
                                            : undefined;
                                    }}
                                />
                                <FormikConfirmationCheckbox
                                    label={<BodyShort>Bekreft deltakelse</BodyShort>}
                                    name="bekreftRegistrering"
                                    validate={getCheckedValidator()}
                                />
                            </VStack>
                            <HStack gap="2">
                                <Button
                                    type="submit"
                                    variant="primary"
                                    loading={isPending}
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
