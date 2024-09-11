import { StoryFn } from '@storybook/react';
import { SpørsmålWrapper } from '../../../../../storybook/components/SpørsmålWrapper';
import AnnetBarnFnrSpørsmål, { AnnetBarnFnrValidationErrorKeys } from '../spørsmål/AnnetBarnFnrSpørsmål';
import MessagesList from '@navikt/sif-common-core-ds/src/dev-utils/intl/messages-preview/MessagesList';
import { getIntlMessagesFromKeys } from '../../../../../storybook/utils/intlUtils';
import { appMessages } from '../../../../i18n/appMessages';

export default {
    title: 'Questions/OmBarnet/BarnetsFødselsnummer',
};

const AnnetBarnFnrIntlKeys = Object.keys(appMessages.nb).filter((key) =>
    key.includes('steg.omBarnet.barnetsFødselsnummer'),
);

const Template: StoryFn = () => {
    return (
        <SpørsmålWrapper
            formErrorHandlerIntlKey={'steg.omBarnet.validation'}
            spørsmål={<AnnetBarnFnrSpørsmål søkersFnr="123" allowHnr={true} />}
            messages={
                <MessagesList
                    messages={getIntlMessagesFromKeys([...AnnetBarnFnrIntlKeys, ...AnnetBarnFnrValidationErrorKeys])}
                />
            }
        />
    );
};

export const Default = Template.bind({});
