import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import Page from '@navikt/sif-common-core-ds/src/components/page/Page';
import SoknadErrorMessages from '../../components/soknad-error-messages/SoknadErrorMessages';
import SoknadHeader from '../../components/soknad-header/SoknadHeader';
import { useSoknadIntl } from '../../hooks/useSoknadIntl';

interface Props {
    pageTitle?: string;
    bannerTitle?: string;
    contentRenderer?: () => JSX.Element;
}
const ErrorPage = ({ contentRenderer, pageTitle, bannerTitle }: Props) => {
    const { text } = useSoknadIntl();
    return (
        <Page
            title={pageTitle || text('@soknad.errorPage.defaultTitle')}
            topContentRenderer={() => <SoknadHeader title={bannerTitle || text('application.title')} />}>
            <Block margin="xxxl">
                {contentRenderer ? contentRenderer() : <SoknadErrorMessages.GeneralApplicationError />}
            </Block>
        </Page>
    );
};

export default ErrorPage;
