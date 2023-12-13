import { useIntl } from 'react-intl';
import LoadingSpinner from '@navikt/sif-common-core-ds/src/atoms/loading-spinner/LoadingSpinner';
import Page from '@navikt/sif-common-core-ds/src/components/page/Page';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import SoknadHeader from '@navikt/sif-common-soknad-ds/lib/components/soknad-header/SoknadHeader';

const LoadingPage = () => {
    const intl = useIntl();
    return (
        <Page
            title={intlHelper(intl, 'page.loadingPage.tekst')}
            topContentRenderer={() => <SoknadHeader title={intlHelper(intl, 'application.title')} />}>
            <div style={{ display: 'flex', justifyContent: 'center', minHeight: '15rem', alignItems: 'center' }}>
                <LoadingSpinner type="XXL" />
            </div>
        </Page>
    );
};

export default LoadingPage;
