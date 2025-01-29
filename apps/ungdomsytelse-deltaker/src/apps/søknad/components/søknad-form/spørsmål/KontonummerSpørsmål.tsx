import { Alert, Heading, VStack } from '@navikt/ds-react';
import { getYesOrNoValidator } from '@navikt/sif-common-formik-ds/src/validation';
import { SøknadFormFields } from '../SøknadForm';
import { søknadFormComponents } from '../TypedSøknadFormComponents';

interface Props {
    kontonummer: string;
    kontonummerStemmerIkke?: boolean;
    disabled?: boolean;
}

const { YesOrNoQuestion } = søknadFormComponents;

const KontonummerSpørsmål = ({ kontonummer, kontonummerStemmerIkke, disabled }: Props) => {
    return (
        <VStack gap="4">
            <Heading level="3" size="medium">
                Kontonummer
            </Heading>
            <YesOrNoQuestion
                disabled={disabled}
                legend={`Er kontonummeret ditt ${kontonummer}?`}
                name={SøknadFormFields.kontonummerErRiktig}
                validate={getYesOrNoValidator()}
                labels={{ no: 'Nei det stemmer ikke' }}
            />
            {kontonummerStemmerIkke ? <Alert variant="info">For å endre kontonummeret må du gå til ...</Alert> : null}
        </VStack>
    );
};

export default KontonummerSpørsmål;
