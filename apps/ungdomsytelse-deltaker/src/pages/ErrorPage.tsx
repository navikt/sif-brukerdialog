import { Box } from '@navikt/ds-react';
import { ApplicationPage } from '@sif/soknad-ui/pages';

interface Props {
    pageTitle?: string;
    bannerTitle: string;
    children?: React.ReactNode;
}
const ErrorPage = ({ children, pageTitle, bannerTitle }: Props) => {
    return (
        <ApplicationPage documentTitle={pageTitle} applicationTitle={bannerTitle}>
            <Box paddingBlock="space-40">{children}</Box>
        </ApplicationPage>
    );
};

export default ErrorPage;
