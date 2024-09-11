import { VStack } from '@navikt/ds-react';
import { StoryFn } from '@storybook/react';
import { SpørsmålWrapper } from '../../../../../storybook/components/SpørsmålWrapper';
import MessagesList from '@navikt/sif-common-core-ds/src/dev-utils/intl/messages-preview/MessagesList';
import { getIntlMessagesFromKeys, getValidationIntlKeys } from '../../../../../storybook/utils/intlUtils';
import { appMessages } from '../../../../i18n/appMessages';
import { OmBarnetFormFields } from '../OmBarnetStep';
import AnnetBarnFødselsdatoSpørsmål, { AnnetBarnFødselsdatoValidationErrorKeys } from './AnnetBarnFødselsdatoSpørsmål';

export default {
    title: 'Questions/OmBarnet/BarnetsFødselsdato',
};

const validationErrorIntlKeys = getValidationIntlKeys(
    AnnetBarnFødselsdatoValidationErrorKeys,
    `steg.omBarnet.validation.${OmBarnetFormFields.barnetsFødselsdato}`,
);

const intlKeys = Object.keys(appMessages.nb).filter((key) => key.includes('steg.omBarnet.fødselsdato'));

const Template: StoryFn = () => {
    return (
        <SpørsmålWrapper parameters={{ formErrorHandlerIntlKey: 'steg.omBarnet.validation' }}>
            <VStack gap="6">
                <AnnetBarnFødselsdatoSpørsmål />
                <MessagesList messages={getIntlMessagesFromKeys([...intlKeys, ...validationErrorIntlKeys])} />
            </VStack>
        </SpørsmålWrapper>
    );
};

export const Default = Template.bind({});
