import LoadingSpinner from '@navikt/sif-common-core-ds/src/atoms/loading-spinner/LoadingSpinner';
import Page from '@navikt/sif-common-core-ds/src/components/page/Page';
import SoknadHeader from '../../components/soknad-header/SoknadHeader';
import { useSoknadIntl } from '../../hooks/useSoknadIntl';

interface Props {
    headerTitle?: string;
}

const LoadingPage = ({ headerTitle }: Props) => {
    const { text } = useSoknadIntl();
    return (
        <Page
            title={text('@soknad.loadingPage.henterInformasjon')}
            topContentRenderer={headerTitle ? () => <SoknadHeader title={headerTitle} /> : undefined}>
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
