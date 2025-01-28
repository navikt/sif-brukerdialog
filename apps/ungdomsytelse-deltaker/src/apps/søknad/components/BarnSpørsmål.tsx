import { getYesOrNoValidator } from '@navikt/sif-common-formik-ds/src/validation';
import { SøknadFormFields } from './Søknadskjema';
import { Alert, Heading, VStack } from '@navikt/ds-react';
import { RegistrertBarn } from '@navikt/sif-common-api';
import BarnList from './BarnList';
import { søknadFormComponents } from './TypedSøknadFormComponents';

interface Props {
    barn: RegistrertBarn[];
    barnStemmerIkke?: boolean;
}

const { YesOrNoQuestion } = søknadFormComponents;

const BarnSpørsmål = ({ barn, barnStemmerIkke }: Props) => {
    return (
        <VStack gap="4">
            <Heading level="3" size="small">
                Dine barn
            </Heading>
            {barn.length > 0 ? <BarnList barn={barn} /> : null}
            <YesOrNoQuestion
                legend={
                    barn.length === 0
                        ? `Vi har ikke registrert noen barn på deg. Er dette riktig?`
                        : 'Stemmer informasjonen om alle barn?'
                }
                name={SøknadFormFields.barnErRiktig}
                validate={getYesOrNoValidator()}
                labels={{ no: 'Nei det stemmer ikke' }}
            />
            {barnStemmerIkke ? <Alert variant="info">Når informasjon om dine barn ikke stemmer ...</Alert> : null}
        </VStack>
    );
};

export default BarnSpørsmål;
