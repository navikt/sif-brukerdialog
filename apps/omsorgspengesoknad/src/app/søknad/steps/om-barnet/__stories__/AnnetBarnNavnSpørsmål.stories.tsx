import { StoryFn } from '@storybook/react';
import { SpørsmålWrapper } from '../../../../../storybook/components/SpørsmålWrapper';
import { getValidationIntlKeys } from '../../../../../storybook/utils/intlUtils';
import { appMessages } from '../../../../i18n/appMessages';
import AnnetBarnNavnSpørsmål, { AnnetBarnNavnValidationErrorKeys } from '../spørsmål/AnnetBarnNavnSpørsmål';
import { OmBarnetFormFields } from '../OmBarnetStep';

export default {
    title: 'Questions/OmBarnet/BarnetsNavn',
};

const intlKeys = Object.keys(appMessages.nb).filter((key) => key.includes('steg.omBarnet.spm.barnetsNavn'));

const validationErrorIntlKeys = getValidationIntlKeys(
    AnnetBarnNavnValidationErrorKeys,
    `steg.omBarnet.validation.${OmBarnetFormFields.barnetsNavn}`,
);

const Template: StoryFn = () => {
    return (
        <SpørsmålWrapper
            formErrorHandlerIntlKey="steg.omBarnet.validation"
            spørsmål={<AnnetBarnNavnSpørsmål />}
            messageIntlKeys={intlKeys}
            validationErrorIntlKeys={validationErrorIntlKeys}
        />
    );
};

export const Default = Template.bind({});
