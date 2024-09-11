import { StoryFn } from '@storybook/react';
import { SpørsmålWrapper } from '../../../../../storybook/components/SpørsmålWrapper';
import { appMessages } from '../../../../i18n/appMessages';
import { getValidationIntlKeys } from '../../../../../storybook/utils/intlUtils';
import { OmBarnetFormFields } from '../OmBarnetStep';
import BorSammenMedBarnetSpørsmål, { BorSammenMedBarnetErrorKeys } from '../spørsmål/BorSammenMedBarnetSpørsmål';

export default {
    title: 'Questions/OmBarnet/BorSammenMedBarnet',
};

const intlKeys = Object.keys(appMessages.nb).filter((key) => key.includes('steg.omBarnet.spm.sammeAdresse'));

const fieldIntlErrorKey = `steg.omBarnet.validation.${OmBarnetFormFields.sammeAdresse}`;
const validationErrorIntlKeys = getValidationIntlKeys(BorSammenMedBarnetErrorKeys, fieldIntlErrorKey);

const Template: StoryFn = () => {
    return (
        <SpørsmålWrapper
            formErrorHandlerIntlKey={'steg.omBarnet.validation'}
            spørsmål={<BorSammenMedBarnetSpørsmål />}
            messageIntlKeys={intlKeys}
            validationErrorIntlKeys={validationErrorIntlKeys}
        />
    );
};

export const Default = Template.bind({});
