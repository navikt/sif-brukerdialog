import type { Meta, StoryObj } from '@storybook/react';
import { withIntl } from '../../../../../storybook/decorators/withIntl';
import { SpørsmålWrapper } from '../../../../../storybook/components/SpørsmålWrapper';
import AnnetBarnNavnSpørsmål, { AnnetBarnNavnValidationErrorKeys } from './AnnetBarnNavnSpørsmål';
import { getScopedIntlKeys, getValidationIntlKeys } from '../../../../../storybook/utils/intlUtils';
import { OmBarnetFormFields } from '../OmBarnetStep';
import AnnetBarnFnrSpørsmål, { AnnetBarnFnrValidationErrorKeys } from './AnnetBarnFnrSpørsmål';
import AnnetBarnFødselsdatoSpørsmål, { AnnetBarnFødselsdatoValidationErrorKeys } from './AnnetBarnFødselsdatoSpørsmål';
import AnnetBarnRelasjonSpørsmål from './AnnetBarnRelasjonSpørsmål';
import {
    ValidateRequiredFieldError,
    ValidateRequiredFieldErrorKeys,
    ValidateYesOrNoErrorKeys,
} from '@navikt/sif-common-formik-ds/src/validation';
import BorSammenMedBarnetSpørsmål, { BorSammenMedBarnetErrorKeys } from './BorSammenMedBarnetSpørsmål';
import HøyereRisikoForFraværBeskrivelseSpørsmål, {
    HøyereRisikoForFraværBeskrivelseValidationErrorKeys,
} from './HøyereRisikoForFraværBeskrivelseSpørsmål';
import HøyereRisikoForFraværSpørsmål from './HøyereRisikoForFraværSpørsmål';
import KroniskEllerFunksjonshemningSpørsmål from './KroniskEllerFunksjonshemningSpørsmål';
import RegistrertBarnSpørsmål from './RegistrertBarnSpørsmål';
import { RegistrerteBarnMock } from '../../../../../storybook/mock-data';

const meta: Meta = {
    title: 'Steg/OmBarnet/Spørsmål',
    decorators: [withIntl],
};

export default meta;

type Story = StoryObj<any>;

export const AnnetBarnFnrSpørsmålStory: Story = {
    name: 'AnnetBarn.Fødselsnummer',
    render: () => (
        <SpørsmålWrapper
            spørsmål={<AnnetBarnFnrSpørsmål søkersFnr="123" allowHnr={true} />}
            formErrorHandlerIntlKey="steg.omBarnet.validation"
            messageIntlKeys={getScopedIntlKeys('steg.omBarnet.spm.barnetsFødselsnummer.')}
            validationErrorIntlKeys={getValidationIntlKeys(
                AnnetBarnFnrValidationErrorKeys,
                `steg.omBarnet.validation.${OmBarnetFormFields.barnetsFødselsnummer}`,
            )}
        />
    ),
};

export const AnnetBarnNavnSpørsmålStory: Story = {
    name: 'AnnetBarn.Navn',
    render: () => (
        <SpørsmålWrapper
            spørsmål={<AnnetBarnNavnSpørsmål />}
            formErrorHandlerIntlKey="steg.omBarnet.validation"
            messageIntlKeys={getScopedIntlKeys('steg.omBarnet.spm.barnetsNavn.')}
            validationErrorIntlKeys={getValidationIntlKeys(
                AnnetBarnNavnValidationErrorKeys,
                `steg.omBarnet.validation.${OmBarnetFormFields.barnetsNavn}`,
            )}
        />
    ),
};

export const AnnetBarnFødselsdatoSpørsmålStory: Story = {
    name: 'AnnetBarn.Fødselsdato',
    render: () => (
        <SpørsmålWrapper
            spørsmål={<AnnetBarnFødselsdatoSpørsmål />}
            formErrorHandlerIntlKey="steg.omBarnet.validation"
            messageIntlKeys={getScopedIntlKeys('steg.omBarnet.spm.fødselsdato.')}
            validationErrorIntlKeys={getValidationIntlKeys(
                AnnetBarnFødselsdatoValidationErrorKeys,
                `steg.omBarnet.validation.${OmBarnetFormFields.barnetsFødselsdato}`,
            )}
        />
    ),
};

export const AnnetBarnRelasjonSpørsmålStory: Story = {
    name: 'AnnetBarn.Relasjon',
    render: () => (
        <SpørsmålWrapper
            spørsmål={<AnnetBarnRelasjonSpørsmål />}
            formErrorHandlerIntlKey="steg.omBarnet.validation"
            messageIntlKeys={getScopedIntlKeys('steg.omBarnet.spm.relasjon.')}
            validationErrorIntlKeys={getValidationIntlKeys(
                [ValidateRequiredFieldError.noValue],
                `steg.omBarnet.validation.${OmBarnetFormFields.søkersRelasjonTilBarnet}`,
            )}
        />
    ),
};

export const BorSammenMedBarnetSpørsmålStory: Story = {
    name: 'BorSammenMedBarnet',
    render: () => (
        <SpørsmålWrapper
            spørsmål={<BorSammenMedBarnetSpørsmål />}
            formErrorHandlerIntlKey="steg.omBarnet.validation"
            messageIntlKeys={getScopedIntlKeys('steg.omBarnet.spm.sammeAdresse.')}
            validationErrorIntlKeys={getValidationIntlKeys(
                BorSammenMedBarnetErrorKeys,
                `steg.omBarnet.validation.${OmBarnetFormFields.sammeAdresse}`,
            )}
        />
    ),
};

export const HøyereRisikoForFraværBeskrivelseSpørsmålStory: Story = {
    name: 'HøyereRisikoForFraværBeskrivelse',
    render: () => (
        <SpørsmålWrapper
            spørsmål={<HøyereRisikoForFraværBeskrivelseSpørsmål />}
            formErrorHandlerIntlKey="steg.omBarnet.validation"
            messageIntlKeys={getScopedIntlKeys('steg.omBarnet.spm.høyereRisikoForFraværBeskrivelse.')}
            validationErrorIntlKeys={getValidationIntlKeys(
                HøyereRisikoForFraværBeskrivelseValidationErrorKeys,
                `steg.omBarnet.validation.${OmBarnetFormFields.høyereRisikoForFraværBeskrivelse}`,
            )}
        />
    ),
};

export const HøyereRisikoForFraværSpørsmålStory: Story = {
    name: 'HøyereRisikoForFravær',
    render: () => (
        <SpørsmålWrapper
            spørsmål={<HøyereRisikoForFraværSpørsmål />}
            formErrorHandlerIntlKey="steg.omBarnet.validation"
            messageIntlKeys={getScopedIntlKeys('steg.omBarnet.spm.høyereRisikoForFravær.')}
            validationErrorIntlKeys={getValidationIntlKeys(
                ValidateYesOrNoErrorKeys,
                `steg.omBarnet.validation.${OmBarnetFormFields.høyereRisikoForFravær}`,
            )}
        />
    ),
};

export const KroniskEllerFunksjonshemningSpørsmålStory: Story = {
    name: 'KroniskEllerFunksjonshemning',
    render: () => (
        <SpørsmålWrapper
            spørsmål={<KroniskEllerFunksjonshemningSpørsmål />}
            formErrorHandlerIntlKey="steg.omBarnet.validation"
            messageIntlKeys={getScopedIntlKeys('steg.omBarnet.spm.kroniskEllerFunksjonshemning.')}
            validationErrorIntlKeys={getValidationIntlKeys(
                ValidateYesOrNoErrorKeys,
                `steg.omBarnet.validation.${OmBarnetFormFields.kroniskEllerFunksjonshemming}`,
            )}
        />
    ),
};

export const RegistrertBarnSpørsmålStory: Story = {
    name: 'RegistrertBarn',
    render: () => (
        <SpørsmålWrapper
            spørsmål={
                <RegistrertBarnSpørsmål
                    onAnnetBarnSelected={() => null}
                    registrerteBarn={RegistrerteBarnMock}
                    søknadenGjelderEtAnnetBarn={false}
                />
            }
            formErrorHandlerIntlKey="steg.omBarnet.validation"
            messageIntlKeys={getScopedIntlKeys('steg.omBarnet.spm.gjelderAnnetBarn.')}
            validationErrorIntlKeys={getValidationIntlKeys(
                ValidateRequiredFieldErrorKeys,
                `steg.omBarnet.validation.${OmBarnetFormFields.barnetSøknadenGjelder}`,
            )}
        />
    ),
};
