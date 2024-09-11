import { StoryFn } from '@storybook/react';
import { SpørsmålWrapper } from '../../../../../storybook/components/SpørsmålWrapper';
import { getValidationIntlKeys } from '../../../../../storybook/utils/intlUtils';
import { appMessages } from '../../../../i18n/appMessages';
import { OmBarnetFormFields } from '../OmBarnetStep';
import AnnetBarnFødselsdatoSpørsmål, {
    AnnetBarnFødselsdatoValidationErrorKeys,
} from '../spørsmål/AnnetBarnFødselsdatoSpørsmål';

export default {
    title: 'Questions/OmBarnet/BarnetsFødselsdato',
};

const intlKeys = Object.keys(appMessages.nb).filter((key) => key.includes('steg.omBarnet.spm.fødselsdato'));

const validationErrorIntlKeys = getValidationIntlKeys(
    AnnetBarnFødselsdatoValidationErrorKeys,
    `steg.omBarnet.validation.${OmBarnetFormFields.barnetsFødselsdato}`,
);

const Template: StoryFn = () => {
    return (
        <SpørsmålWrapper
            formErrorHandlerIntlKey={'steg.omBarnet.validation'}
            spørsmål={<AnnetBarnFødselsdatoSpørsmål />}
            messageIntlKeys={intlKeys}
            validationErrorIntlKeys={validationErrorIntlKeys}
        />
    );
};

export const Default = Template.bind({});
