import { Deltakelse } from '../../api/types';
import { useState } from 'react';
import { TypedFormikForm, TypedFormikWrapper } from '@navikt/sif-common-formik-ds';
import { Alert, BodyShort, Button, Heading, HStack, VStack } from '@navikt/ds-react';
import getIntlFormErrorHandler from '@navikt/sif-common-formik-ds/src/validation/intlFormErrorHandler';
import { useIntl } from 'react-intl';
import { getCheckedValidator } from '@navikt/sif-common-formik-ds/src/validation';
import { PaperplaneIcon } from '@navikt/aksel-icons';
import FormikCheckboxGroup from '@navikt/sif-common-formik-ds/src/components/formik-checkbox-group/FormikCheckboxGroup';
import { isAxiosError } from 'axios';

interface Props {
    deltakelse: Deltakelse;
}

interface FormValues {
    bekreftSlett: boolean;
}

const SlettDeltakelseForm = ({ deltakelse }: Props) => {
    const [submitPending, setSubmitPending] = useState(false);
    const [error, setError] = useState<string | JSX.Element | undefined>(undefined);
    const intl = useIntl();
    console.log(deltakelse);

    const handleOnSubmit = async () => {
        reset();
        setSubmitPending(true);

        try {
            // const avsluttetDeltakelse = await veilederService.avsluttDeltakelse({
            //     deltakelseId: deltakelse.id,
            // });
            reset();
            setSubmitPending(false);
        } catch (e) {
            if (isAxiosError(e)) {
                setError(
                    <VStack gap="6">
                        <BodyShort>En feil oppstod ved sletting av deltakelsen. Vennligst prøv på nytt</BodyShort>
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
                                Nulla ullamcorper sed eros quis dictum. Aenean pharetra lorem risus, et tincidunt nisl
                                porttitor vel. Curabitur vitae accumsan est, eget rutrum ante. Proin vulputate erat et
                                lorem tincidunt faucibus. Curabitur vel pretium odio. Morbi lobortis laoreet felis at
                                mattis. Curabitur a enim id erat tincidunt tempor
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
                                    loading={submitPending}
                                    iconPosition="right"
                                    icon={<PaperplaneIcon aria-hidden />}>
                                    Slett periode
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

export default SlettDeltakelseForm;
