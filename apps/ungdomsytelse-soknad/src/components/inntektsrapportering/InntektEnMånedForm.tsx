import { Deltakelse } from '../../api/types';
import { DateRange, getTypedFormComponents, ValidationError } from '@navikt/sif-common-formik-ds';

import { capsFirstCharacter, dateFormatter } from '@navikt/sif-common-utils';
import { Alert, Box, Button, HStack } from '@navikt/ds-react';
import getIntlFormErrorHandler from '@navikt/sif-common-formik-ds/src/validation/intlFormErrorHandler';
import { useAppIntl } from '../../i18n';
import { getNumberValidator } from '@navikt/sif-common-formik-ds/src/validation';
import { useRapporterInntekt } from '../../hooks/useRapporterInntekt';
import TimedContent from '../timed-content/TimedContent';

interface Props {
    deltakelse: Deltakelse;
    måned: DateRange;
}

enum InntektFormFields {
    'inntekt' = 'inntekt',
}

type InntektFormValues = {
    inntekt: string;
};

const { TextField, Form, FormikWrapper } = getTypedFormComponents<
    InntektFormFields,
    InntektFormValues,
    ValidationError
>();

const InntektEnMånedForm = ({ deltakelse, måned }: Props) => {
    const { rapporterInntekt, resetInntektLagret, inntektLagret, isSubmitting } = useRapporterInntekt();

    const onSubmit = (data: InntektFormValues) => {
        rapporterInntekt(deltakelse.id, måned, parseInt(data.inntekt, 10));
    };
    const { intl } = useAppIntl();
    const månedNavn = `${dateFormatter.monthFullYear(måned.from)}`;
    return (
        <FormikWrapper
            initialValues={{
                inntekt: '',
            }}
            onSubmit={onSubmit}
            renderForm={() => {
                return (
                    <Form
                        formErrorHandler={getIntlFormErrorHandler(intl)}
                        includeButtons={false}
                        isFinalSubmit={true}
                        submitPending={isSubmitting}>
                        <HStack gap="3" align="start">
                            <TextField
                                name={InntektFormFields.inntekt}
                                label={capsFirstCharacter(dateFormatter.monthFullYear(måned.from))}
                                type="text"
                                validate={getNumberValidator({
                                    required: true,
                                })}
                                required
                                min={0}
                                onFocus={resetInntektLagret}
                            />
                            <Box>
                                <HStack gap="2" style={{ marginTop: '2rem' }} align={'center'}>
                                    <Button loading={isSubmitting} type="submit" aria-label={`Send for ${månedNavn}`}>
                                        Send
                                    </Button>
                                    {inntektLagret ? (
                                        <TimedContent>
                                            <Box>
                                                <Alert variant="success" inline={true}>
                                                    Inntekt lagret for {månedNavn}
                                                </Alert>
                                            </Box>
                                        </TimedContent>
                                    ) : null}
                                </HStack>
                            </Box>
                        </HStack>
                    </Form>
                );
            }}></FormikWrapper>
    );
};

export default InntektEnMånedForm;
