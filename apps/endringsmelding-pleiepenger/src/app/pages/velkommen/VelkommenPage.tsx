import { useSakUtledet as useSakInfo, useStartSøknad } from '@app/hooks';
import { AppText, useAppIntl } from '@app/i18n';
import { EndringType } from '@app/types';
import { Bleed, BodyLong, Heading, VStack } from '@navikt/ds-react';
import Page from '@navikt/sif-common-core-ds/src/components/page/Page';
import { getIntlFormErrorHandler, getTypedFormComponents, ValidationError } from '@navikt/sif-common-formik-ds';
import { SamtykkeFormPart } from '@navikt/sif-common-soknad-ds';
import { FormLayout } from '@navikt/sif-common-ui';
import { getListValidator } from '@navikt/sif-validation';

import { Feature, isFeatureEnabled } from '../../utils';
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

    const featureVelgEndringV2Enabled = isFeatureEnabled(Feature.SIF_PUBLIC_VELG_ENDRING_V2);

    return (
        <Page title={text('application.title')}>
            <FormikWrapper
                initialValues={{ harForståttRettigheterOgPlikter: false, hvaSkalEndres: [] }}
                onSubmit={(values) => {
                    if (featureVelgEndringV2Enabled) {
                        startSøknad([EndringType.arbeidstid, EndringType.lovbestemtFerie, EndringType.tilsynsordning]);
                    } else {
                        startSøknad(values.hvaSkalEndres);
                    }
                }}
                renderForm={() => (
                    <Form
                        includeValidationSummary={true}
                        includeButtons={true}
                        submitButtonLabel={text('velkommenForm.submitButtonLabel')}
                        formErrorHandler={getIntlFormErrorHandler(intl, 'velkommenForm')}>
                        <FormLayout.Guide poster={true}>
                            <Heading level="1" size="large" data-testid="velkommen-header" spacing>
                                <AppText id="velkommenPage.guide.tittel" values={{ navn: søkersFornavn }} />
                            </Heading>
                            <VStack gap="space-16">
                                <BodyLong size="large">
                                    {barnetsNavn === '' ? (
                                        <AppText
                                            id="velkommenPage.guide.tekst.anonymisertBarn"
                                            values={{
                                                samletSøknadsperiodeTekst,
                                            }}
                                        />
                                    ) : (
                                        <AppText
                                            id="velkommenPage.guide.tekst"
                                            values={{
                                                barnetsNavn: <strong>{barnetsNavn}</strong>,
                                                samletSøknadsperiodeTekst,
                                            }}
                                        />
                                    )}
                                </BodyLong>
                                {featureVelgEndringV2Enabled ? (
                                    <BodyLong size="large">Du velger hva du ønsker å endre underveis</BodyLong>
                                ) : (
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
                                                'data-testid': 'endreArbeidstid',
                                                label: text('velkommenPage.endre.jobb'),
                                                value: EndringType.arbeidstid,
                                            },
                                            {
                                                'data-testid': 'endreLovbestemtFerie',
                                                label: text('velkommenPage.endre.ferie'),
                                                value: EndringType.lovbestemtFerie,
                                            },
                                            {
                                                'data-testid': 'endreOmsorgstilbud',
                                                label: text('velkommenPage.endre.tilsynsordning'),
                                                value: EndringType.tilsynsordning,
                                            },
                                        ]}
                                    />
                                )}
                            </VStack>
                        </FormLayout.Guide>
                        <Bleed marginBlock="space-12 space-0">
                            <VStack gap="space-24">
                                <OmSøknaden />
                                <SamtykkeFormPart />
                            </VStack>
                        </Bleed>
                    </Form>
                )}
            />
        </Page>
    );
};

export default VelkommenPage;
