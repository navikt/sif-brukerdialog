import { StoryFn } from '@storybook/react';
import { ValidateYesOrNoErrorKeys } from '@navikt/sif-common-formik-ds/src/validation';
import { SpørsmålWrapper } from '../../../../../storybook/components/SpørsmålWrapper';
import { getValidationIntlKeys } from '../../../../../storybook/utils/intlUtils';
import { appMessages } from '../../../../i18n/appMessages';
import { OmBarnetFormFields } from '../OmBarnetStep';
import KroniskEllerFunksjonshemningSpørsmål from '../spørsmål/KroniskEllerFunksjonshemningSpørsmål';

export default {
    title: 'Questions/OmBarnet/KroniskEllerFunksjonshemningSpørsmål',
};

const intlKeys = Object.keys(appMessages.nb).filter((key) =>
    key.includes('steg.omBarnet.spm.kroniskEllerFunksjonshemning.'),
);

const validationErrorIntlKeys = getValidationIntlKeys(
    ValidateYesOrNoErrorKeys,
    `steg.omBarnet.validation.${OmBarnetFormFields.kroniskEllerFunksjonshemming}`,
);

const Template: StoryFn = () => {
    return (
        <SpørsmålWrapper
            formErrorHandlerIntlKey="steg.omBarnet.validation"
            spørsmål={<KroniskEllerFunksjonshemningSpørsmål />}
            messageIntlKeys={intlKeys}
            validationErrorIntlKeys={validationErrorIntlKeys}
        />
    );
};

export const Default = Template.bind({});
