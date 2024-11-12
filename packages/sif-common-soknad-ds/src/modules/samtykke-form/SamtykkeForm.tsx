import { BodyLong, Heading, Link, List, VStack } from '@navikt/ds-react';
import React from 'react';
import { useIntl } from 'react-intl';
import { FormikCheckbox, getTypedFormComponents, ValidationError } from '@navikt/sif-common-formik-ds';
import { getCheckedValidator } from '@navikt/sif-common-formik-ds/src/validation';
import getIntlFormErrorHandler from '@navikt/sif-common-formik-ds/src/validation/intlFormErrorHandler';
import { useSoknadIntl } from '../../hooks/useSoknadIntl';

const RettOgPliktURL = 'https://www.nav.no/endringer#du-har-plikt-til-a-gi-nav-riktige-opplysninger';

export enum SamtykkeFormFields {
    harForståttRettigheterOgPlikter = 'harForståttRettigheterOgPlikter',
}

export interface SamtykkeFormValues {
    [SamtykkeFormFields.harForståttRettigheterOgPlikter]: boolean;
}

const { FormikWrapper, Form, ConfirmationCheckbox } = getTypedFormComponents<
    SamtykkeFormFields,
    SamtykkeFormValues,
    ValidationError
>();

interface Props {
    submitButtonLabel?: string;
    variant?: 'vanlig' | 'enkel';
    onValidSubmit: () => void;
}

export const SamtykkeFormPart = () => {
    const { text } = useSoknadIntl();
    return (
        <ConfirmationCheckbox
            label={<span data-testid="bekreft-label">{text('@soknad.samtykkeForm.bekreftLabel')}</span>}
            name={SamtykkeFormFields.harForståttRettigheterOgPlikter}
            validate={getCheckedValidator()}>
            <Heading level="2" size="small">
                {text('@soknad.samtykkeForm.ansvar.tittel')}
            </Heading>
            <List>
                <List.Item>{text('@soknad.samtykkeForm.ansvar.list.1')}</List.Item>
                <List.Item>
                    {text('@soknad.samtykkeForm.ansvar.list.2', {
                        a: (msg) => (
                            <Link href={RettOgPliktURL} target="_blank">
                                {msg}
                            </Link>
                        ),
                    })}
                </List.Item>
            </List>
        </ConfirmationCheckbox>
    );
};
export const SamtykkeFormPartEnkel = () => {
    return (
        <>
            <BodyLong>
                Det er viktig at du gir oss riktige opplysninger slik at vi kan behandle saken din.{' '}
                <Link href={RettOgPliktURL}>Les mer om viktigheten av å gi riktige opplysninger.</Link>
            </BodyLong>
            <FormikCheckbox
                label="Jeg vil svare så godt jeg kan på spørsmålene i søknaden."
                name={SamtykkeFormFields.harForståttRettigheterOgPlikter}
                validate={getCheckedValidator()}
            />
        </>
    );
};

const SamtykkeForm: React.FunctionComponent<Props> = ({ onValidSubmit, variant = 'vanlig', submitButtonLabel }) => {
    const { text } = useSoknadIntl();
    const intl = useIntl();
    return (
        <FormikWrapper
            initialValues={{ harForståttRettigheterOgPlikter: false }}
            onSubmit={onValidSubmit}
            renderForm={() => (
                <Form
                    includeButtons={true}
                    submitButtonLabel={submitButtonLabel || text('@soknad.samtykkeform.submitButtonLabel')}
                    includeValidationSummary={true}
                    formErrorHandler={getIntlFormErrorHandler(intl, '@soknad.samtykkeForm')}>
                    <VStack gap="4">{variant === 'vanlig' ? <SamtykkeFormPart /> : <SamtykkeFormPartEnkel />}</VStack>
                </Form>
            )}
        />
    );
};

export default SamtykkeForm;
