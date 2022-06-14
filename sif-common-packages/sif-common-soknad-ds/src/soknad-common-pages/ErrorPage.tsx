import React from 'react';
import { useIntl } from 'react-intl';
import Box from '@navikt/sif-common-core/lib/components/box/Box';
import Page from '@navikt/sif-common-core/lib/components/page/Page';
import StepBanner from '@navikt/sif-common-core/lib/components/step-banner/StepBanner';
import intlHelper from '@navikt/sif-common-core/lib/utils/intlUtils';
import SoknadErrorMessages from '../soknad-error-messages/SoknadErrorMessages';

interface Props {
    pageTitle?: string;
    bannerTitle?: string;
    contentRenderer?: () => JSX.Element;
}
const ErrorPage = ({ contentRenderer, pageTitle, bannerTitle }: Props) => {
    const intl = useIntl();
    return (
        <Page
            title={pageTitle || intlHelper(intl, 'page.error.pageTitle')}
            topContentRenderer={() => <StepBanner text={bannerTitle || intlHelper(intl, 'application.title')} />}>
            <Box margin="xxxl">
                {contentRenderer ? contentRenderer() : <SoknadErrorMessages.GeneralApplicationError />}
            </Box>
        </Page>
    );
};

export default ErrorPage;
