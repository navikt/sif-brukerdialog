import { useIntl } from 'react-intl';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import Page from '@navikt/sif-common-core-ds/src/components/page/Page';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import SoknadErrorMessages from '../components/soknad-error-messages/SoknadErrorMessages';
import SoknadHeader from '../components/soknad-header/SoknadHeader';

interface Props {
    pageTitle?: string;
    bannerTitle?: string;
    contentRenderer?: () => JSX.Element;
}
const ErrorPage = ({ contentRenderer, pageTitle, bannerTitle }: Props) => {
    const intl = useIntl();
    return (
        <Page
            title={pageTitle || intlHelper(intl, 'common.errorPage.defaultTitle')}
            topContentRenderer={() => <SoknadHeader title={bannerTitle || intlHelper(intl, 'application.title')} />}>
            <Block margin="xxxl">
                {contentRenderer ? contentRenderer() : <SoknadErrorMessages.GeneralApplicationError />}
            </Block>
        </Page>
    );
};

export default ErrorPage;
