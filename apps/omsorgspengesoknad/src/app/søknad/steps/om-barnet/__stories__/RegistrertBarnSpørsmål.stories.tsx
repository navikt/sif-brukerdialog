import { StoryFn } from '@storybook/react';
import { ValidateRequiredFieldErrorKeys } from '@navikt/sif-common-formik-ds/src/validation';
import { SpørsmålWrapper } from '../../../../../storybook/components/SpørsmålWrapper';
import { getValidationIntlKeys, includesString } from '../../../../../storybook/utils/intlUtils';
import { appMessages } from '../../../../i18n/appMessages';
import { OmBarnetFormFields } from '../OmBarnetStep';
import RegistrertBarnSpørsmål from '../spørsmål/RegistrertBarnSpørsmål';
import { RegistrerteBarnMock } from '../../../../../storybook/mock-data';

export default {
    title: 'Questions/OmBarnet/RegistrerteBarn',
};

const intlKeys = Object.keys(appMessages.nb).filter((key) =>
    includesString(key, ['steg.omBarnet.spm.barnetSøknadenGjelder.', 'steg.omBarnet.spm.gjelderAnnetBarn.']),
);

const validationErrorIntlKeys = getValidationIntlKeys(
    ValidateRequiredFieldErrorKeys,
    `steg.omBarnet.validation.${OmBarnetFormFields.barnetSøknadenGjelder}`,
);

const Template: StoryFn = () => {
    return (
        <SpørsmålWrapper
            formErrorHandlerIntlKey="steg.omBarnet.validation"
            spørsmål={
                <RegistrertBarnSpørsmål
                    registrerteBarn={RegistrerteBarnMock}
                    søknadenGjelderEtAnnetBarn={false}
                    onAnnetBarnSelected={() => null}
                />
            }
            messageIntlKeys={intlKeys}
            validationErrorIntlKeys={validationErrorIntlKeys}
        />
    );
};

export const Default = Template.bind({});
