import { StoryFn } from '@storybook/react';
import { SpørsmålWrapper } from '../../../../../storybook/components/SpørsmålWrapper';
import { getValidationIntlKeys } from '../../../../../storybook/utils/intlUtils';
import { appMessages } from '../../../../i18n/appMessages';
import { OmBarnetFormFields } from '../OmBarnetStep';
import HøyereRisikoForFraværBeskrivelseSpørsmål, {
    HøyereRisikoForFraværBeskrivelseValidationErrorKeys,
} from '../spørsmål/HøyereRisikoForFraværBeskrivelseSpørsmål';

export default {
    title: 'Questions/OmBarnet/HøyereRisikoForFraværBeskrivelse',
};

const intlKeys = Object.keys(appMessages.nb).filter((key) =>
    key.includes('steg.omBarnet.spm.høyereRisikoForFraværBeskrivelse.'),
);

const validationErrorIntlKeys = getValidationIntlKeys(
    HøyereRisikoForFraværBeskrivelseValidationErrorKeys,
    `steg.omBarnet.validation.${OmBarnetFormFields.høyereRisikoForFraværBeskrivelse}`,
);

const Template: StoryFn = () => {
    return (
        <SpørsmålWrapper
            formErrorHandlerIntlKey="steg.omBarnet.validation"
            spørsmål={<HøyereRisikoForFraværBeskrivelseSpørsmål />}
            messageIntlKeys={intlKeys}
            validationErrorIntlKeys={validationErrorIntlKeys}
        />
    );
};

export const Default = Template.bind({});
