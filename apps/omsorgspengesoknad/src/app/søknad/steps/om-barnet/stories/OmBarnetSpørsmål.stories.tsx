import { VStack } from '@navikt/ds-react';
import { StoryFn } from '@storybook/react';
import { FormLayout } from '@navikt/sif-common-ui';
import { StoryFormikWrapper } from '../../../../../storybook/components/StoryFormikWrapper';
import ValidationErrorsList from '../../../../../storybook/components/ValidationErrorsList';
import { withIntl } from '../../../../../storybook/decorators/withIntl';
import { withStepFormValuesContext } from '../../../../../storybook/decorators/withStepFormValuesContext';
import { mockInitialSøknadContextState } from '../../../../../storybook/decorators/withSøknadContext';
import { SøknadContextState } from '../../../../types/SøknadContextState';
import { Søknadsdata } from '../../../../types/søknadsdata/Søknadsdata';
import { SøknadContextProvider } from '../../../context/SøknadContext';
import AnnetBarnFnrSpørsmål, {
    AnnetBarnFnrValidationErrorKeys as AnnetBarnFnrValidationErrors,
} from '../spørsmål/AnnetBarnFnrSpørsmål';
import AnnetBarnFødselsdatoSpørsmål, {
    AnnetBarnFødselsdatoValidationErrorKeys,
} from '../spørsmål/AnnetBarnFødselsdatoSpørsmål';
import AnnetBarnNavnSpørsmål from '../spørsmål/AnnetBarnNavnSpørsmål';
import AnnetBarnRelasjonSpørsmål from '../spørsmål/AnnetBarnRelasjonSpørsmål';
import BorSammenMedBarnetSpørsmål from '../spørsmål/BorSammenMedBarnetSpørsmål';
import HøyereRisikoForFraværBeskrivelseSpørsmål from '../spørsmål/HøyereRisikoForFraværBeskrivelseSpørsmål';
import HøyereRisikoForFraværSpørsmål from '../spørsmål/HøyereRisikoForFraværSpørsmål';
import KroniskEllerFunksjonshemningSpørsmål from '../spørsmål/KroniskEllerFunksjonshemningSpørsmål';
import RegistrertBarnSpørsmål from '../spørsmål/RegistrertBarnSpørsmål';

export default {
    title: 'Steps/OmBarnet/Spørsmål',
    decorators: [withIntl, withStepFormValuesContext],
};

interface Props {
    context: SøknadContextState;
}

const Template: StoryFn<Props> = ({ context }: Props) => {
    return (
        <SøknadContextProvider initialData={context}>
            <StoryFormikWrapper parameters={{ formErrorHandlerIntlKey: 'steg.omBarnet.validation' }}>
                <FormLayout.Questions>
                    <RegistrertBarnSpørsmål
                        registrerteBarn={context.registrerteBarn}
                        onAnnetBarnSelected={() => null}
                        søknadenGjelderEtAnnetBarn={false}
                    />
                    <VStack gap="2">
                        <AnnetBarnFnrSpørsmål søkersFnr="123" allowHnr={true} />
                        <ValidationErrorsList
                            intlKeyPath="steg.omBarnet.validation.barnetsFødselsnummer"
                            validationKeys={AnnetBarnFnrValidationErrors}
                        />
                    </VStack>
                    <VStack gap="2">
                        <AnnetBarnFødselsdatoSpørsmål />
                        <ValidationErrorsList
                            intlKeyPath="steg.omBarnet.validation.barnetsFødselsdato"
                            validationKeys={AnnetBarnFødselsdatoValidationErrorKeys}
                        />
                    </VStack>

                    <AnnetBarnNavnSpørsmål />
                    <AnnetBarnRelasjonSpørsmål />
                    <BorSammenMedBarnetSpørsmål />
                    <HøyereRisikoForFraværSpørsmål />
                    <HøyereRisikoForFraværBeskrivelseSpørsmål />
                    <KroniskEllerFunksjonshemningSpørsmål />
                </FormLayout.Questions>
            </StoryFormikWrapper>
        </SøknadContextProvider>
    );
};

export const Default = Template.bind({});

const annetBarnState: Søknadsdata = {};
Default.args = {
    context: { ...mockInitialSøknadContextState, søknadsdata: annetBarnState },
};
Default.parameters = {};
