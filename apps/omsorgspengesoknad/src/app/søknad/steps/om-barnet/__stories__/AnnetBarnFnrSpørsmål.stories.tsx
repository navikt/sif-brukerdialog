import { StoryFn } from '@storybook/react';
import { SpørsmålWrapper } from '../../../../../storybook/components/SpørsmålWrapper';
import AnnetBarnFnrSpørsmål, { AnnetBarnFnrValidationErrorKeys } from '../spørsmål/AnnetBarnFnrSpørsmål';
import { appMessages } from '../../../../i18n/appMessages';
import { getValidationIntlKeys } from '../../../../../storybook/utils/intlUtils';
import { OmBarnetFormFields } from '../OmBarnetStep';

export default {
    title: 'Questions/OmBarnet/BarnetsFødselsnummer',
};

const intlKeys = Object.keys(appMessages.nb).filter((key) => key.includes('steg.omBarnet.barnetsFødselsnummer'));

const fieldIntlErrorKey = `steg.omBarnet.validation.${OmBarnetFormFields.barnetsFødselsnummer}`;
const validationErrorIntlKeys = getValidationIntlKeys(AnnetBarnFnrValidationErrorKeys, fieldIntlErrorKey);

const Template: StoryFn = () => {
    return (
        <SpørsmålWrapper
            formErrorHandlerIntlKey={'steg.omBarnet.validation'}
            spørsmål={<AnnetBarnFnrSpørsmål søkersFnr="123" allowHnr={true} />}
            messageIntlKeys={intlKeys}
            validationErrorIntlKeys={validationErrorIntlKeys}
            validationIntlPath={fieldIntlErrorKey}
            messageIntlPath="steg.omBarnet.barnetsFødselsnummer"
        />
    );
};

export const Default = Template.bind({});
