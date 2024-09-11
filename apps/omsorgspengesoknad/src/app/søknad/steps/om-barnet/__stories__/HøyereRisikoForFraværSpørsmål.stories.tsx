import { StoryFn } from '@storybook/react';
import { ValidateYesOrNoErrorKeys } from '@navikt/sif-common-formik-ds/src/validation';
import { SpørsmålWrapper } from '../../../../../storybook/components/SpørsmålWrapper';
import { getValidationIntlKeys } from '../../../../../storybook/utils/intlUtils';
import { appMessages } from '../../../../i18n/appMessages';
import { OmBarnetFormFields } from '../OmBarnetStep';
import HøyereRisikoForFraværSpørsmål from '../spørsmål/HøyereRisikoForFraværSpørsmål';

export default {
    title: 'Questions/OmBarnet/HøyereRisikoForFravær',
};

const intlKeys = Object.keys(appMessages.nb).filter((key) => key.includes('steg.omBarnet.spm.høyereRisikoForFravær.'));

const validationErrorIntlKeys = getValidationIntlKeys(
    ValidateYesOrNoErrorKeys,
    `steg.omBarnet.validation.${OmBarnetFormFields.høyereRisikoForFravær}`,
);

const Template: StoryFn = () => {
    return (
        <SpørsmålWrapper
            formErrorHandlerIntlKey="steg.omBarnet.validation"
            spørsmål={<HøyereRisikoForFraværSpørsmål />}
            messageIntlKeys={intlKeys}
            validationErrorIntlKeys={validationErrorIntlKeys}
        />
    );
};

export const Default = Template.bind({});
