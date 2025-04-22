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
import { GYLDIG_PERIODE } from '../../settings';
import dayjs from 'dayjs';
import { dateFormatter } from '@navikt/sif-common-utils';
import ToDo from '../../dev-components/ToDo';
import { ToDoKeys } from '../../dev-components/ToDos';

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
                                    description={<ToDo todo={ToDoKeys.henteGyldigPeriodeForDeltakelser} />}
                                    minDate={GYLDIG_PERIODE.from}
                                    maxDate={GYLDIG_PERIODE.to}
                                    defaultMonth={dayjs.max([dayjs(GYLDIG_PERIODE.from), dayjs()]).toDate()}
                                    validate={(value) => {
                                        const error = getDateValidator({
                                            required: true,
                                            min: GYLDIG_PERIODE.from,
                                            max: GYLDIG_PERIODE.to,
                                            onlyWeekdays: true,
                                        })(value);
                                        return error
                                            ? {
                                                  key: error,
                                                  values: {
                                                      min: dateFormatter.compact(GYLDIG_PERIODE.from),
                                                      max: dateFormatter.compact(GYLDIG_PERIODE.to),
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
                            {error ? <Alert variant="error">{error.error.message}</Alert> : null}
                        </VStack>
                    </TypedFormikForm>
                );
            }}
        />
    );
};

export default MeldInnDeltakerForm;
