import LoadingSpinner from '@navikt/sif-common-core-ds/src/atoms/loading-spinner/LoadingSpinner';
import Page from '@navikt/sif-common-core-ds/src/components/page/Page';

const LoadingPage = () => (
    <Page title={'Henter informasjon'}>
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                minHeight: '15rem',
                alignItems: 'center',
            }}>
            <LoadingSpinner type="XXL" />
        </div>
    </Page>
);

export default LoadingPage;
