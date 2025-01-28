import { Alert, Heading, VStack } from '@navikt/ds-react';
import { getYesOrNoValidator } from '@navikt/sif-common-formik-ds/src/validation';
import { SøknadFormFields } from './Søknadskjema';
import { søknadFormComponents } from './TypedSøknadFormComponents';

interface Props {
    kontonummer: string;
    kontonummerStemmerIkke?: boolean;
}

const { YesOrNoQuestion } = søknadFormComponents;

const KontonummerSpørsmål = ({ kontonummer, kontonummerStemmerIkke }: Props) => {
    return (
        <VStack gap="4">
            <Heading level="3" size="small">
                Kontonummer
            </Heading>
            <YesOrNoQuestion
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
