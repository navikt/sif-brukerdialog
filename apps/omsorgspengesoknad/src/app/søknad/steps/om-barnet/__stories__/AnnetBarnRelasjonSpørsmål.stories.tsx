import { StoryFn } from '@storybook/react';
import { SpørsmålWrapper } from '../../../../../storybook/components/SpørsmålWrapper';
import { getValidationIntlKeys } from '../../../../../storybook/utils/intlUtils';
import { appMessages } from '../../../../i18n/appMessages';
import { OmBarnetFormFields } from '../OmBarnetStep';
import AnnetBarnRelasjonSpørsmål from '../spørsmål/AnnetBarnRelasjonSpørsmål';
import { ValidateRequiredFieldError } from '@navikt/sif-common-formik-ds/src/validation';

export default {
    title: 'Questions/OmBarnet/RelasjonTilBarn',
};

const intlKeys = Object.keys(appMessages.nb).filter((key) => key.includes('steg.omBarnet.relasjon'));

const validationErrorIntlKeys = getValidationIntlKeys(
    [ValidateRequiredFieldError.noValue],
    `steg.omBarnet.validation.${OmBarnetFormFields.søkersRelasjonTilBarnet}`,
);

const Template: StoryFn = () => {
    return (
        <SpørsmålWrapper
            formErrorHandlerIntlKey="steg.omBarnet.validation"
            spørsmål={<AnnetBarnRelasjonSpørsmål />}
            messageIntlKeys={intlKeys}
            validationErrorIntlKeys={validationErrorIntlKeys}
        />
    );
};

export const Default = Template.bind({});
