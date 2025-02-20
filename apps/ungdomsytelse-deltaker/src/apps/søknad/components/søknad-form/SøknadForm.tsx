import { Alert, Heading, ReadMore, VStack } from '@navikt/ds-react';
import { RegistrertBarn, Søker } from '@navikt/sif-common-api';
import { getLocaleForApi } from '@navikt/sif-common-core-ds/src';
import { getIntlFormErrorHandler, YesOrNo } from '@navikt/sif-common-formik-ds';
import { dateToISODate } from '@navikt/sif-common-utils';
import { deltakerService, SendSøknadDTO, sendSøknadDTOSchema, Søknadstype } from '@navikt/ung-common';
import BlueBox from '../../../../components/blue-box/BlueBox';
import { useAppIntl } from '../../../../i18n';
import { useSendSøknad } from '../../hooks/useSendSøknad';
import BehandlingAvPersonopplysningerContent from '../BehandlingAvPersonopplysningerContent';
import BarnSpørsmål from './spørsmål/BarnSpørsmål';
import KontonummerSpørsmål from './spørsmål/KontonummerSpørsmål';
import SamtykkeSpørsmål from './spørsmål/SamtykkeSpørsmål';
import Startdato from './Startdato';
import { søknadFormComponents } from './TypedSøknadFormComponents';

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
    startdato: Date;
    kontonummer: string;
    barn: RegistrertBarn[];
    søker: Søker;
    onSøknadSendt: () => void;
}
const SøknadForm = ({ kontonummer, deltakelseId, barn, søker, startdato, onSøknadSendt }: Props) => {
    const { intl, text } = useAppIntl();
    const { pending, error, sendSøknad } = useSendSøknad();

    const handleSubmit = (values: SøknadFormValues) => {
        const søknad: SendSøknadDTO = {
            søknadstype: Søknadstype.DELTAKELSE_SØKNAD,
            søknadId: deltakelseId,
            språk: getLocaleForApi(intl.locale),
            startdato: dateToISODate(startdato),
            barnStemmer: values[SøknadFormFields.barnErRiktig] === YesOrNo.YES,
            kontonummerStemmer: values[SøknadFormFields.kontonummerErRiktig] === YesOrNo.YES,
            harBekreftetOpplysninger: values[SøknadFormFields.samtykker],
            harForståttRettigheterOgPlikter: values[SøknadFormFields.samtykker],
            søkerNorskIdent: søker.fødselsnummer,
            isInntektForPeriode: false,
        };
        if (sendSøknadDTOSchema.parse(søknad)) {
            sendSøknad(søknad).then(async () => {
                await deltakerService.markerDeltakelseSøkt(søknad.søknadId);
                onSøknadSendt();
            });
        } else {
            alert('Invalid data');
        }
    };

    return (
        <VStack gap="8">
            <VStack gap="2">
                <Heading level="2" size="medium">
                    Søknadsskjema
                </Heading>
                <ReadMore header={text('personopplysninger.accordion.header')}>
                    <BehandlingAvPersonopplysningerContent />
                </ReadMore>
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
                        <BlueBox>
                            <Form
                                formErrorHandler={getIntlFormErrorHandler(intl, 'validation')}
                                includeValidationSummary={true}
                                submitPending={pending}
                                submitButtonLabel="Send søknad"
                                runDelayedFormValidation={true}>
                                <VStack gap="8">
                                    <Startdato startdato={startdato} />

                                    <KontonummerSpørsmål
                                        kontonummer={kontonummer}
                                        kontonummerStemmerIkke={kontonummerSvar === YesOrNo.NO}
                                        disabled={pending}
                                    />

                                    {visBarnSpørsmål && (
                                        <BarnSpørsmål
                                            barn={barn}
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
                        </BlueBox>
                    );
                }}
            />
        </VStack>
    );
};

export default SøknadForm;
