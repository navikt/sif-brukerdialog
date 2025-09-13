import { ReactElement } from 'react';
import Page from '@navikt/sif-common-core-ds/src/components/page/Page';
import SoknadErrorMessages from '../../components/soknad-error-messages/SoknadErrorMessages';
import SoknadHeader from '../../components/soknad-header/SoknadHeader';
import { useSoknadIntl } from '../../hooks/useSoknadIntl';
import { Box } from '@navikt/ds-react';

interface Props {
    pageTitle?: string;
    bannerTitle?: string;
    contentRenderer?: () => ReactElement;
}
const ErrorPage = ({ contentRenderer, pageTitle, bannerTitle }: Props) => {
    const { text } = useSoknadIntl();
    return (
        <Page
            title={pageTitle || text('@soknad.errorPage.defaultTitle')}
            topContentRenderer={() => <SoknadHeader title={bannerTitle || text('application.title')} />}>
            <Box marginBlock="12 0">
                {contentRenderer ? contentRenderer() : <SoknadErrorMessages.GeneralApplicationError />}
            </Box>
        </Page>
    );
};

export default ErrorPage;
