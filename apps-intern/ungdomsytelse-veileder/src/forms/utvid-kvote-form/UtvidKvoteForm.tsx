import { Bleed, VStack } from '@navikt/ds-react';
import { useIntl } from 'react-intl';
import {
    FormikYesOrNoQuestion,
    getIntlFormErrorHandler,
    getTypedFormComponents,
    ValidationError,
    YesOrNo,
} from '@navikt/sif-common-formik-ds';
import { getCheckedValidator, getYesOrNoValidator } from '@navikt/sif-validation';
import { Deltakelse } from '../../types/Deltakelse';
import { Deltaker } from '../../types/Deltaker';
import { formatName } from '@navikt/sif-common-utils';
import { useUtvidKvote } from '../../hooks/useUtvidKvote';
import ApiErrorAlert from '../../components/api-error-alert/ApiErrorAlert';

enum FieldNames {
    harUtvidetPeriode = 'harUtvidetPeriode',
    bekrefterEndring = 'bekrefterEndring',
}
type FormValues = {
    [FieldNames.harUtvidetPeriode]: YesOrNo;
    [FieldNames.bekrefterEndring]: boolean;
};

const { FormikWrapper, Form, ConfirmationCheckbox } = getTypedFormComponents<FieldNames, FormValues, ValidationError>();

interface Props {
    deltaker: Deltaker;
    deltakelse: Deltakelse;
    onCancel?: () => void;
    onDeltakelseChanged: (oppdatertDeltakelse: Deltakelse) => void;
}

const UtvidKvoteForm = ({ deltaker, deltakelse, onCancel, onDeltakelseChanged }: Props) => {
    const intl = useIntl();

    const { mutate, isPending, error } = useUtvidKvote({ deltakelseId: deltakelse.id, deltakerId: deltaker.id });

    const handleOnSubmit = async (values: FormValues) => {
        const { bekrefterEndring } = values;
        if (!bekrefterEndring) {
            return;
        }
        mutate(deltakelse.id, {
            onSuccess: (oppdatertDeltakelse) => {
                onDeltakelseChanged(oppdatertDeltakelse);
            },
        });
    };

    return (
        <FormikWrapper
            initialValues={{
                bekrefterEndring: false,
            }}
            onSubmit={handleOnSubmit}
            renderForm={({ values }) => {
                const { harUtvidetPeriode } = values;
                return (
                    <VStack gap="space-24">
                        <Form
                            formErrorHandler={getIntlFormErrorHandler(intl, 'endrePeriodeForm')}
                            submitPending={isPending}
                            showSubmitButton={true}
                            submitButtonLabel="Bekreft utvidelse"
                            cancelButtonLabel="Avbryt"
                            onCancel={onCancel}
                            showButtonArrows={false}>
                            <VStack gap="space-24">
                                <VStack gap="space-32" className="rounded-xs">
                                    <FormikYesOrNoQuestion
                                        name={FieldNames.harUtvidetPeriode}
                                        legend="Har deltaker fått utvidet deltakelse?"
                                        validate={getYesOrNoValidator()}
                                    />
                                    {harUtvidetPeriode === YesOrNo.YES && (
                                        <>
                                            <Bleed marginBlock="space-16 space-0">
                                                <ConfirmationCheckbox
                                                    name={FieldNames.bekrefterEndring}
                                                    label={`Jeg bekrefter at ${formatName(deltaker.navn)} skal har fått utvidet deltakelse`}
                                                    validate={getCheckedValidator()}
                                                />
                                            </Bleed>
                                        </>
                                    )}
                                </VStack>
                            </VStack>
                        </Form>
                        {error ? <ApiErrorAlert error={error} /> : null}
                    </VStack>
                );
            }}
        />
    );
};

export default UtvidKvoteForm;
