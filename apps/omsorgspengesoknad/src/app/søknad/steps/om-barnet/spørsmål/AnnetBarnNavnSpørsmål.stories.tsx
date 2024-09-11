import { StoryFn } from '@storybook/react';
import { SpørsmålWrapper } from '../../../../../storybook/components/SpørsmålWrapper';
import MessagesList from '@navikt/sif-common-core-ds/src/dev-utils/intl/messages-preview/MessagesList';
import { getIntlMessagesFromKeys, getValidationIntlKeys } from '../../../../../storybook/utils/intlUtils';
import { appMessages } from '../../../../i18n/appMessages';
import AnnetBarnNavnSpørsmål, { AnnetBarnNavnValidationErrorKeys } from './AnnetBarnNavnSpørsmål';
import { OmBarnetFormFields } from '../OmBarnetStep';

export default {
    title: 'Questions/OmBarnet/BarnetsNavn',
};

const validationErrorIntlKeys = getValidationIntlKeys(
    AnnetBarnNavnValidationErrorKeys,
    `steg.omBarnet.validation.${OmBarnetFormFields.barnetsNavn}`,
);

const intlKeys = Object.keys(appMessages.nb).filter((key) => key.includes('steg.omBarnet.barnetsNavn'));

const Template: StoryFn = () => {
    return (
        <SpørsmålWrapper
            formErrorHandlerIntlKey="steg.omBarnet.validation"
            spørsmål={<AnnetBarnNavnSpørsmål />}
            messages={<MessagesList messages={getIntlMessagesFromKeys([...intlKeys, ...validationErrorIntlKeys])} />}
        />
    );
};

export const Default = Template.bind({});
