import { Heading, VStack } from '@navikt/ds-react';
import { YesOrNo } from '@navikt/sif-common-formik-ds';
import getIntlFormErrorHandler from '@navikt/sif-common-formik-ds/src/validation/intlFormErrorHandler';
import { useAppIntl } from '../../../i18n';
import { useState } from 'react';
import { RegistrertBarn } from '@navikt/sif-common-api';
import BarnSpørsmål from './BarnSpørsmål';
import KontonummerSpørsmål from './KontonummerSpørsmål';
import { søknadFormComponents } from './TypedSøknadFormComponents';
import SamtykkeSpørsmål from './SamtykkeSpørsmål';

export enum SøknadFormFields {
    kontonummerErRiktig = 'kontonummerErRiktig',
    barnErRiktig = 'barnErRiktig',
    samtykker = 'samtykker',
}

export interface SøknadFormValues {
    [SøknadFormFields.kontonummerErRiktig]: YesOrNo;
    [SøknadFormFields.barnErRiktig]: YesOrNo;
    [SøknadFormFields.samtykker]: boolean;
}

const { FormikWrapper, Form } = søknadFormComponents;

interface Props {
    kontonummer: string;
    barn: RegistrertBarn[];
}
const Søknadsskjema = ({ kontonummer }: Props) => {
    const { intl } = useAppIntl();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = () => {
        setIsSubmitting(true);
    };

    return (
        <VStack gap="8">
            <Heading level="2" size="medium">
                Søknadsskjema for å motta ungdomsytelse
            </Heading>
            <FormikWrapper
                initialValues={{}}
                onSubmit={handleSubmit}
                renderForm={({ values }) => {
                    const kontonummerSvar = values[SøknadFormFields.kontonummerErRiktig];
                    const barnSvar = values[SøknadFormFields.barnErRiktig];

                    return (
                        <Form
                            formErrorHandler={getIntlFormErrorHandler(intl, 'validation')}
                            includeValidationSummary={true}
                            submitPending={isSubmitting}
                            runDelayedFormValidation={true}>
                            <VStack gap="8">
                                <KontonummerSpørsmål
                                    kontonummer={kontonummer}
                                    kontonummerStemmerIkke={kontonummerSvar === YesOrNo.NO}
                                />

                                <BarnSpørsmål barn={[]} barnStemmerIkke={barnSvar === YesOrNo.NO} />

                                <SamtykkeSpørsmål />
                            </VStack>
                        </Form>
                    );
                }}
            />
        </VStack>
    );
};

export default Søknadsskjema;
