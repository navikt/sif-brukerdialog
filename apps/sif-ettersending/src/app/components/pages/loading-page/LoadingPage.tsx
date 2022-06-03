import * as React from 'react';
import { useIntl } from 'react-intl';
import LoadingSpinner from '@navikt/sif-common-core/lib/components/loading-spinner/LoadingSpinner';
import Page from '@navikt/sif-common-core/lib/components/page/Page';
import intlHelper from '@navikt/sif-common-core-ds/utils/intlUtils';

const LoadingPage = () => {
    const intl = useIntl();
    return (
        <Page title={intlHelper(intl, 'page.loadingPage.tekst')}>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    minHeight: '15rem',
                    alignItems: 'center',
                    flexDirection: 'column',
                }}>
                <LoadingSpinner type="XXL" />
            </div>
        </Page>
    );
};

export default LoadingPage;
