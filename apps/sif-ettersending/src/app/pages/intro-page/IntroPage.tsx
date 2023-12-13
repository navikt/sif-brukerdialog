import { useIntl } from 'react-intl';
import { SIFCommonPageKey, useLogSidevisning } from '@navikt/sif-common-amplitude/lib';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import Page from '@navikt/sif-common-core-ds/src/components/page/Page';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import { getTypedFormComponents } from '@navikt/sif-common-formik-ds/lib';
import { getRequiredFieldValidator } from '@navikt/sif-common-formik-ds/lib/validation';
import getIntlFormErrorHandler from '@navikt/sif-common-formik-ds/lib/validation/intlFormErrorHandler';
import { ValidationError } from '@navikt/sif-common-formik-ds/lib/validation/types';
import SoknadHeader from '@navikt/sif-common-soknad-ds/lib/components/soknad-header/SoknadHeader';
import { Søknadstype } from '../../types/Søknadstype';
import { navigateToWelcomePage } from '../../utils/navigationUtils';

enum PageFormField {
    'søknadstype' = 'søknadstype',
}

interface PageFormValues {
    [PageFormField.søknadstype]: Søknadstype;
}

const PageForm = getTypedFormComponents<PageFormField, PageFormValues, ValidationError>();

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
                                    radios={[
                                        {
                                            value: Søknadstype.pleiepengerSyktBarn,
                                            label: intlHelper(intl, 'page.intro.type.pleiepenger'),
                                        },
                                        {
                                            value: Søknadstype.pleiepengerLivetsSluttfase,
                                            label: intlHelper(intl, 'page.intro.type.pleiepenger_livets_sluttfase'),
                                        },
                                        {
                                            value: Søknadstype.omsorgspenger,
                                            label: intlHelper(intl, 'page.intro.type.omsorgspenger'),
                                        },
                                    ]}
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
