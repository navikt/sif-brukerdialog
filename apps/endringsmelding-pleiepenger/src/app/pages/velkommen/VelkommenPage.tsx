import { useSakUtledet as useSakInfo, useStartSøknad } from '@hooks';
import { BodyLong, Heading, VStack } from '@navikt/ds-react';
import Page from '@navikt/sif-common-core-ds/src/components/page/Page';
import { getIntlFormErrorHandler, getTypedFormComponents, ValidationError } from '@navikt/sif-common-formik-ds';
import { SamtykkeFormPart } from '@navikt/sif-common-soknad-ds';
import { FormLayout } from '@navikt/sif-common-ui';
import { getListValidator } from '@navikt/sif-validation';
import { EndringType } from '@types';

import { AppText, useAppIntl } from '../../i18n';
import OmSøknaden from './OmSøknaden';

export enum VelkommenFormFields {
    harForståttRettigheterOgPlikter = 'harForståttRettigheterOgPlikter',
    hvaSkalEndres = 'hvaSkalEndres',
}

export interface VelkommenFormValues {
    [VelkommenFormFields.harForståttRettigheterOgPlikter]: boolean;
    [VelkommenFormFields.hvaSkalEndres]: EndringType[];
}

const { FormikWrapper, Form, CheckboxGroup } = getTypedFormComponents<
    VelkommenFormFields,
    VelkommenFormValues,
    ValidationError
>();

const VelkommenPage = () => {
    const { text, intl } = useAppIntl();
    const { startSøknad } = useStartSøknad();
    const { søkersFornavn, barnetsNavn, samletSøknadsperiodeTekst } = useSakInfo();

    return (
        <Page title={text('application.title')}>
            <FormikWrapper
                initialValues={{ harForståttRettigheterOgPlikter: false, hvaSkalEndres: [] }}
                onSubmit={(values) => startSøknad(values.hvaSkalEndres)}
                renderForm={() => (
                    <Form
                        includeValidationSummary={true}
                        includeButtons={true}
                        submitButtonLabel={text('velkommenForm.submitButtonLabel')}
                        formErrorHandler={getIntlFormErrorHandler(intl, 'velkommenForm')}>
                        <FormLayout.Guide poster={true}>
                            <Heading level="1" size="large" data-testid="velkommen-header" spacing={false}>
                                <AppText id="velkommenPage.guide.tittel" values={{ navn: søkersFornavn }} />
                            </Heading>
                            <VStack gap="space-24">
                                <BodyLong size="large">
                                    <AppText
                                        id="velkommenPage.guide.tekst"
                                        values={{
                                            barnetsNavn: <strong>{barnetsNavn}</strong>,
                                            samletSøknadsperiodeTekst,
                                        }}
                                    />
                                </BodyLong>
                                <CheckboxGroup
                                    data-color="accent"
                                    name={VelkommenFormFields.hvaSkalEndres}
                                    legend={
                                        <Heading level="2" size="small">
                                            <AppText id="velkommenPage.endre.spm" />
                                        </Heading>
                                    }
                                    validate={getListValidator({ minItems: 1 })}
                                    checkboxes={[
                                        {
                                            'data-testid': 'endreLovbestemtFerie',
                                            label: text('velkommenPage.endre.ferie'),
                                            value: EndringType.lovbestemtFerie,
                                        },
                                        {
                                            'data-testid': 'endreArbeidstid',
                                            label: text('velkommenPage.endre.jobb'),
                                            value: EndringType.arbeidstid,
                                        },
                                        {
                                            'data-testid': 'endreOmsorgstilbud',
                                            label: text('velkommenPage.endre.omsorgstilbud'),
                                            value: EndringType.omsorgstilbud,
                                        },
                                    ]}
                                />

                                <OmSøknaden />
                            </VStack>
                        </FormLayout.Guide>

                        <SamtykkeFormPart />
                    </Form>
                )}
            />
        </Page>
    );
};

export default VelkommenPage;
