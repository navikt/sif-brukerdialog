import { Box } from '@navikt/ds-react';
import Page from '@navikt/sif-common-core-ds/src/components/page/Page';
import { getIntlFormErrorHandler, getTypedFormComponents, ValidationError } from '@navikt/sif-common-formik-ds';
import { SoknadHeader } from '@navikt/sif-common-soknad-ds';
import { getRequiredFieldValidator } from '@navikt/sif-validation';
import { useIntl } from 'react-intl';

import { useAppIntl } from '../../i18n';
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
                        {
                            value: Søknadstype.opplaringspenger,
                            label: text('page.intro.type.opplaringspenger'),
                        },
                    ];
                    return (
                        <PageForm.Form
                            formErrorHandler={getIntlFormErrorHandler(intl, 'page.intro')}
                            submitButtonLabel={text('step.button.gåVidere')}>
                            <Box marginBlock="10">
                                <PageForm.RadioGroup
                                    name={PageFormField.søknadstype}
                                    legend={text('page.intro.hvilkenTypeSøknad')}
                                    radios={radios}
                                    validate={getRequiredFieldValidator()}
                                />
                            </Box>
                        </PageForm.Form>
                    );
                }}
            />
        </Page>
    );
};

export default IntroPage;
