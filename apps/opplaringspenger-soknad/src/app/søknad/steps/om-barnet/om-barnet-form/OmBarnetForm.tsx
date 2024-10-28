import { VStack } from '@navikt/ds-react';
import { RegistrertBarn } from '@navikt/sif-common-api';
import getIntlFormErrorHandler from '@navikt/sif-common-formik-ds/src/validation/intlFormErrorHandler';
import { useFormikContext } from 'formik';
import AnnetBarnPart from './components/AnnetBarnPart';
import { OmBarnetFormComponents } from './components/OmBarnetFormComponents';
import VelgRegistrertBarn from './components/VelgRegistrertBarn';
import { OmBarnetFormValues } from './types';
import { Attachment } from '@navikt/sif-common-core-ds/src/types';
import { useOmBarnetFormIntl } from './omBarnetFormMessages';

interface Props {
    søkersFødselsnummer: string;
    isSubmitting: boolean;
    registrerteBarn: RegistrertBarn[];
    initialValues: Partial<OmBarnetFormValues>;
    ettersendelseURL: string;
    andreVedlegg: Attachment[];
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
    const { intl } = useOmBarnetFormIntl();
    const { values, setFieldValue } = useFormikContext<OmBarnetFormValues>();
    const { søknadenGjelderEtAnnetBarn } = values;
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
                    <VelgRegistrertBarn
                        registrerteBarn={registrerteBarn}
                        søknadenGjelderEtAnnetBarn={søknadenGjelderEtAnnetBarn}
                        onAnnetBarnSelected={() => {
                            setFieldValue('barnetSøknadenGjelder', undefined);
                        }}
                    />
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
