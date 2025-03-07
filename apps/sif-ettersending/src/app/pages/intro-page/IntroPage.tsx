import { useIntl } from 'react-intl';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import Page from '@navikt/sif-common-core-ds/src/components/page/Page';
import { getTypedFormComponents } from '@navikt/sif-common-formik-ds';
import { getRequiredFieldValidator } from '@navikt/sif-validation';
import { getIntlFormErrorHandler } from '@navikt/sif-common-formik-ds';
import { ValidationError } from '@navikt/sif-common-formik-ds';
import { SoknadHeader } from '@navikt/sif-common-soknad-ds';
import { useAppIntl } from '../../i18n';
import { Søknadstype } from '../../types/Søknadstype';
import { navigateToWelcomePage } from '../../utils/navigationUtils';
import { Feature, isFeatureEnabled } from '../../utils/featureToggleUtils';

enum PageFormField {
    'søknadstype' = 'søknadstype',
}

interface PageFormValues {
    [PageFormField.søknadstype]: Søknadstype;
}

const PageForm = getTypedFormComponents<PageFormField, PageFormValues, ValidationError>();

const IntroPage = () => {
    const intl = useIntl();
    const { text } = useAppIntl();

    return (
        <Page title={text('banner.intro')} topContentRenderer={() => <SoknadHeader title={text('banner.intro')} />}>
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
                    const radios = [
                        {
                            value: Søknadstype.pleiepengerSyktBarn,
                            label: text('page.intro.type.pleiepenger'),
                        },
                        {
                            value: Søknadstype.pleiepengerLivetsSluttfase,
                            label: text('page.intro.type.pleiepenger_livets_sluttfase'),
                        },
                        {
                            value: Søknadstype.omsorgspenger,
                            label: text('page.intro.type.omsorgspenger'),
                        },
                    ];
                    if (isFeatureEnabled(Feature.OPPLARINGSPENGER)) {
                        radios.push({
                            value: Søknadstype.opplaringspenger,
                            label: text('page.intro.type.opplaringspenger'),
                        });
                    }
                    return (
                        <PageForm.Form
                            formErrorHandler={getIntlFormErrorHandler(intl, 'page.intro')}
                            submitButtonLabel={text('step.button.gåVidere')}>
                            <Block margin="xl">
                                <PageForm.RadioGroup
                                    name={PageFormField.søknadstype}
                                    legend={text('page.intro.hvilkenTypeSøknad')}
                                    radios={radios}
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
