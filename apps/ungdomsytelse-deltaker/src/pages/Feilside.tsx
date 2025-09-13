import { Box } from '@navikt/ds-react';
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
            <Box paddingBlock="10">{children || <SoknadErrorMessages.GeneralApplicationError />}</Box>
        </Page>
    );
};

export default Feilside;
