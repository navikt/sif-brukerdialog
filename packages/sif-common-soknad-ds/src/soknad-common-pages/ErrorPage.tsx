import React from 'react';
import { useIntl } from 'react-intl';
import Block from '@navikt/sif-common-core-ds/lib/components/block/Block';
import Page from '@navikt/sif-common-core-ds/lib/components/page/Page';
import StepBanner from '@navikt/sif-common-core-ds/lib/components/step-banner/StepBanner';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
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
            <Block margin="xxxl">
                {contentRenderer ? contentRenderer() : <SoknadErrorMessages.GeneralApplicationError />}
            </Block>
        </Page>
    );
};

export default ErrorPage;
