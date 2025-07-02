import { Box, Heading, VStack } from '@navikt/ds-react';
import { RegistrertBarn } from '@navikt/sif-common-api';
import { Vedlegg } from '@navikt/sif-common-core-ds/src/types/Vedlegg';
import { getIntlFormErrorHandler } from '@navikt/sif-common-formik-ds';
import { annetBarnErValgt, FormLayout, VelgRegistrerteBarnInput } from '@navikt/sif-common-ui';
import { useFormikContext } from 'formik';
import AnnetBarnPart from './components/AnnetBarnPart';
import { OmBarnetFormComponents } from './components/OmBarnetFormComponents';
import { useOmBarnetFormIntl } from './omBarnetFormMessages';
import { OmBarnetFormFields, OmBarnetFormValues } from './types';
import { getRequiredFieldValidator } from '@navikt/sif-validation';

interface Props {
    søkersFødselsnummer: string;
    isSubmitting: boolean;
    registrerteBarn: RegistrertBarn[];
    initialValues: Partial<OmBarnetFormValues>;
    ettersendelseURL: string;
    andreVedlegg: Vedlegg[];
    goBack?: () => void;
}

const OmBarnetForm = ({
    søkersFødselsnummer,
    isSubmitting,
    registrerteBarn,
    initialValues,
    ettersendelseURL,
    andreVedlegg,
    goBack,
}: Props) => {
    const { text, intl } = useOmBarnetFormIntl();
    const { values } = useFormikContext<OmBarnetFormValues>();
    const søknadenGjelderEtAnnetBarn = annetBarnErValgt(values[OmBarnetFormFields.barnetSøknadenGjelder]);
    const harRegistrerteBarn = registrerteBarn.length > 0;

    return (
        <OmBarnetFormComponents.Form
            formErrorHandler={getIntlFormErrorHandler(intl, 'omBarnetForm.validation')}
            includeValidationSummary={true}
            submitPending={isSubmitting}
            onBack={goBack}
            runDelayedFormValidation={true}>
            <VStack gap="8">
                {harRegistrerteBarn ? (
                    <Box>
                        <Heading level="2" size="medium" spacing={true}>
                            {text('omBarnetForm.hvilketBarn.spm')}
                        </Heading>
                        <FormLayout.Questions>
                            <VelgRegistrerteBarnInput
                                name={OmBarnetFormFields.barnetSøknadenGjelder}
                                registrerteBarn={registrerteBarn}
                                inkluderAnnetBarn={true}
                                validate={getRequiredFieldValidator()}
                            />
                        </FormLayout.Questions>
                    </Box>
                ) : null}

                {(søknadenGjelderEtAnnetBarn || !harRegistrerteBarn) && (
                    <AnnetBarnPart
                        formValues={values}
                        søkersFødselsnummer={søkersFødselsnummer}
                        harRegistrerteBarn={harRegistrerteBarn}
                        initialValues={initialValues}
                        ettersendelseURL={ettersendelseURL}
                        andreVedlegg={andreVedlegg}
                    />
                )}
            </VStack>
        </OmBarnetFormComponents.Form>
    );
};

export default OmBarnetForm;
