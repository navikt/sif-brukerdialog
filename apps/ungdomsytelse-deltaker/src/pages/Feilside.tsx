import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import Page from '@navikt/sif-common-core-ds/src/components/page/Page';
import { SoknadErrorMessages, SoknadHeader } from '@navikt/sif-common-soknad-ds';
import { useSoknadIntl } from '@navikt/sif-common-soknad-ds/src/hooks/useSoknadIntl';

interface Props {
    pageTitle?: string;
    bannerTitle?: string;
    children?: React.ReactNode;
}
const Feilside = ({ children, pageTitle, bannerTitle }: Props) => {
    const { text } = useSoknadIntl();
    return (
        <Page
            title={pageTitle || text('@soknad.errorPage.defaultTitle')}
            topContentRenderer={() => <SoknadHeader title={bannerTitle || text('application.title')} />}>
            <Block margin="xxxl">{children || <SoknadErrorMessages.GeneralApplicationError />}</Block>
        </Page>
    );
};

export default Feilside;
