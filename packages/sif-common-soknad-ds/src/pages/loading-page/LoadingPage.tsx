import LoadingSpinner from '@navikt/sif-common-core-ds/src/atoms/loading-spinner/LoadingSpinner';
import Page from '@navikt/sif-common-core-ds/src/components/page/Page';
import { useSoknadIntl } from '../../hooks/useSoknadIntl';

const LoadingPage = () => {
    const { text } = useSoknadIntl();
    return (
        <Page title={text('scs.loadingPage.henterInformasjon')}>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    minHeight: '15rem',
                    alignItems: 'center',
                }}>
                <LoadingSpinner size="2xlarge" type="XXL" />
            </div>
        </Page>
    );
};

export default LoadingPage;
