import { Alert, BodyShort, Box, Heading, VStack } from '@navikt/ds-react';
import { RegistrertBarn } from '@navikt/sif-common-api';
import { YesOrNo } from '@navikt/sif-common-formik-ds';
import getIntlFormErrorHandler from '@navikt/sif-common-formik-ds/src/validation/intlFormErrorHandler';
import { useAppIntl } from '../../../../i18n';
import BarnSpørsmål from './BarnSpørsmål';
import KontonummerSpørsmål from './KontonummerSpørsmål';
import SamtykkeSpørsmål from './SamtykkeSpørsmål';
import { søknadFormComponents } from './TypedSøknadFormComponents';
import { useSendSøknad } from '../../hooks/useSendSøknad';
import { sendSøknadApiData, SendSøknadApiData } from '../../../../api/schemas/sendSøknadDto';

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
    deltakelseId: string;
    kontonummer: string;
    barn: RegistrertBarn[];
    onSøknadSendt: () => void;
}
const Søknadsskjema = ({ kontonummer, deltakelseId, onSøknadSendt }: Props) => {
    const { intl } = useAppIntl();
    const { pending, error, sendSøknad } = useSendSøknad();

    const handleSubmit = (values: SøknadFormValues) => {
        const apiData: SendSøknadApiData = {
            barnStemmer: values[SøknadFormFields.barnErRiktig] === YesOrNo.YES,
            kontonummerStemmer: values[SøknadFormFields.kontonummerErRiktig] === YesOrNo.YES,
            bekrefterAnsvar: values[SøknadFormFields.samtykker],
            deltakelseId,
        };
        if (sendSøknadApiData.parse(apiData)) {
            sendSøknad(deltakelseId, apiData).then(() => {
                onSøknadSendt();
            });
        } else {
            alert('Invalid data');
        }
    };

    return (
        <VStack gap="8">
            <VStack gap="4">
                <Heading level="2" size="medium">
                    Søknadsskjema
                </Heading>
                <BodyShort size="large">Du må svare på alle spørsmålene for å kunne sende inn en søknaden.</BodyShort>
            </VStack>
            <FormikWrapper
                initialValues={{}}
                onSubmit={handleSubmit}
                renderForm={({ values }) => {
                    const kontonummerSvar = values[SøknadFormFields.kontonummerErRiktig];
                    const barnSvar = values[SøknadFormFields.barnErRiktig];

                    const visBarnSpørsmål = !!kontonummerSvar && kontonummerSvar !== YesOrNo.NO;
                    const visSamtykkeSpørsmål = visBarnSpørsmål && !!barnSvar && barnSvar !== YesOrNo.NO;

                    return (
                        <Box className="bg-deepblue-50 p-8 pb-4 rounded-md">
                            <Form
                                formErrorHandler={getIntlFormErrorHandler(intl, 'validation')}
                                includeValidationSummary={true}
                                submitPending={pending}
                                submitButtonLabel="Send søknad"
                                runDelayedFormValidation={true}>
                                <VStack gap="8">
                                    <KontonummerSpørsmål
                                        kontonummer={kontonummer}
                                        kontonummerStemmerIkke={kontonummerSvar === YesOrNo.NO}
                                        disabled={pending}
                                    />

                                    {visBarnSpørsmål && (
                                        <BarnSpørsmål
                                            barn={[]}
                                            barnStemmerIkke={barnSvar === YesOrNo.NO}
                                            disabled={pending}
                                        />
                                    )}
                                    {visSamtykkeSpørsmål && <SamtykkeSpørsmål disabled={pending} />}
                                    {error && (
                                        <Alert variant="error">
                                            Det oppstod en feil:
                                            <br />
                                            {error}
                                        </Alert>
                                    )}
                                </VStack>
                            </Form>
                        </Box>
                    );
                }}
            />
        </VStack>
    );
};

export default Søknadsskjema;
