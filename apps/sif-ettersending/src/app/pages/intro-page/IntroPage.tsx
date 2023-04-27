import { IntlShape, useIntl } from 'react-intl';
import { SIFCommonPageKey, useLogSidevisning } from '@navikt/sif-common-amplitude/lib';
import Block from '@navikt/sif-common-core-ds/lib/atoms/block/Block';
import Page from '@navikt/sif-common-core-ds/lib/components/page/Page';
import SoknadHeader from '@navikt/sif-common-soknad-ds/lib/components/soknad-header/SoknadHeader';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import { getTypedFormComponents } from '@navikt/sif-common-formik-ds/lib';
import { getRequiredFieldValidator } from '@navikt/sif-common-formik-ds/lib/validation';
import getIntlFormErrorHandler from '@navikt/sif-common-formik-ds/lib/validation/intlFormErrorHandler';
import { ValidationError } from '@navikt/sif-common-formik-ds/lib/validation/types';
import { ApplicationType } from '../../types/ApplicationType';
import { Feature, isFeatureEnabled } from '../../utils/featureToggleUtils';
import { navigateToWelcomePage } from '../../utils/navigationUtils';

enum PageFormField {
    'søknadstype' = 'søknadstype',
}

interface PageFormValues {
    [PageFormField.søknadstype]: ApplicationType;
}

const PageForm = getTypedFormComponents<PageFormField, PageFormValues, ValidationError>();

const getSøknadstyper = (intl: IntlShape) => [
    {
        value: ApplicationType.pleiepengerBarn,
        label: intlHelper(intl, 'page.intro.type.pleiepenger'),
    },
    ...(isFeatureEnabled(Feature.LIVETS_SLUTTFASE)
        ? [
              {
                  value: ApplicationType.pleiepengerLivetsSluttfase,
                  label: intlHelper(intl, 'page.intro.type.pleiepenger_livets_sluttfase'),
              },
          ]
        : []),
    {
        value: ApplicationType.omsorgspenger,
        label: intlHelper(intl, 'page.intro.type.omsorgspenger'),
    },
];

const IntroPage = () => {
    const intl = useIntl();

    useLogSidevisning(SIFCommonPageKey.intro);
    return (
        <Page
            title={intlHelper(intl, 'banner.intro')}
            topContentRenderer={() => <SoknadHeader title={intlHelper(intl, 'banner.intro')} />}>
            <PageForm.FormikWrapper
                initialValues={{}}
                onSubmit={({ søknadstype }) => {
                    if (søknadstype) {
                        setTimeout(() => {
                            navigateToWelcomePage(søknadstype);
                        });
                    }
                }}
                renderForm={() => {
                    return (
                        <PageForm.Form
                            formErrorHandler={getIntlFormErrorHandler(intl, 'page.intro')}
                            submitButtonLabel={intlHelper(intl, 'step.button.gåVidere')}>
                            <Block margin="xl">
                                <PageForm.RadioGroup
                                    name={PageFormField.søknadstype}
                                    legend={intlHelper(intl, 'page.intro.hvilkenTypeSøknad')}
                                    radios={getSøknadstyper(intl)}
                                    validate={getRequiredFieldValidator()}
                                />
                            </Block>
                        </PageForm.Form>
                    );
                }}
            />
        </Page>
    );
};

export default IntroPage;
