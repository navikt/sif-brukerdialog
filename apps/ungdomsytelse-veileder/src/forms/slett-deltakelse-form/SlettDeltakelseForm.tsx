import { Deltakelse } from '../../api/types';
import { useState } from 'react';
import { TypedFormikForm, TypedFormikWrapper } from '@navikt/sif-common-formik-ds';
import { Alert, BodyShort, Button, Heading, HStack, VStack } from '@navikt/ds-react';
import getIntlFormErrorHandler from '@navikt/sif-common-formik-ds/src/validation/intlFormErrorHandler';
import { useIntl } from 'react-intl';
import { getCheckedValidator } from '@navikt/sif-common-formik-ds/src/validation';
import { PaperplaneIcon } from '@navikt/aksel-icons';
import FormikCheckboxGroup from '@navikt/sif-common-formik-ds/src/components/formik-checkbox-group/FormikCheckboxGroup';
import ConfirmationDialog from '@navikt/sif-common-formik-ds/src/components/helpers/confirmation-dialog/ConfirmationDialog';
import { useSlettDeltakelse } from '../../hooks/useSlettDeltakelse';

interface Props {
    deltakelse: Deltakelse;
    onDeltakelseSlettet: () => void;
}

interface FormValues {
    bekreftSlett: boolean;
}

const SlettDeltakelseForm = ({ deltakelse, onDeltakelseSlettet }: Props) => {
    const [confirmationDialogVisible, setConfirmationDialogVisible] = useState(false);
    const { pending, slettDeltakelse, error: apiError } = useSlettDeltakelse(onDeltakelseSlettet || (() => {}));

    const [error, setError] = useState<string | JSX.Element | undefined>(undefined);
    const intl = useIntl();

    const handleOnSubmit = async () => {
        reset();
        setConfirmationDialogVisible(true);
    };

    const reset = () => {
        setError(undefined);
    };

    return (
        <>
            <TypedFormikWrapper<FormValues>
                initialValues={{}}
                onSubmit={handleOnSubmit}
                renderForm={() => {
                    return (
                        <TypedFormikForm
                            includeButtons={false}
                            formErrorHandler={getIntlFormErrorHandler(intl, 'avsluttDeltakelseForm')}>
                            <VStack gap="4" maxWidth={'50rem'} width={'100%'}>
                                <Heading level="2" size="medium">
                                    Slett deltakerperiode
                                </Heading>

                                <BodyShort>
                                    Nulla ullamcorper sed eros quis dictum. Aenean pharetra lorem risus, et tincidunt
                                    nisl porttitor vel. Curabitur vitae accumsan est, eget rutrum ante. Proin vulputate
                                    erat et lorem tincidunt faucibus. Curabitur vel pretium odio. Morbi lobortis laoreet
                                    felis at mattis. Curabitur a enim id erat tincidunt tempor
                                </BodyShort>

                                <FormikCheckboxGroup
                                    name={'bekreftSlett'}
                                    legend="Bekreft slett deltakerperiode"
                                    hideLegend={true}
                                    validate={getCheckedValidator()}
                                    checkboxes={[
                                        {
                                            label: 'Jeg bekrefter at deltakelsen skal slettes.',
                                            value: 'bekreftSlett',
                                        },
                                    ]}
                                />

                                <HStack gap="2">
                                    <Button
                                        type="submit"
                                        variant="primary"
                                        loading={pending}
                                        iconPosition="right"
                                        icon={<PaperplaneIcon aria-hidden />}>
                                        Slett periode
                                    </Button>
                                </HStack>
                                {error || apiError ? <Alert variant="error">{error || apiError}</Alert> : null}
                            </VStack>
                        </TypedFormikForm>
                    );
                }}
            />
            <ConfirmationDialog
                okLabel="Ja, slett"
                onCancel={() => {
                    setConfirmationDialogVisible(false);
                }}
                onConfirm={() => {
                    setConfirmationDialogVisible(false);
                    slettDeltakelse(deltakelse);
                }}
                open={confirmationDialogVisible}
                title="Bekreft slett periode">
                Bekreft at du ønsker å slette deltakelsesperioden
            </ConfirmationDialog>
        </>
    );
};

export default SlettDeltakelseForm;
