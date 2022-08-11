import * as React from 'react';
import { useIntl } from 'react-intl';
import intlHelper from '../../utils/intlUtils';
import LoadingSpinner from '../loading-spinner/LoadingSpinner';
import Page from '../page/Page';

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
