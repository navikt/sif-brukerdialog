import { Box } from '@navikt/ds-react';
import PageHeader from '../page-header/PageHeader';

interface Props {
    children: React.ReactNode;
}

const PageWrapper: React.FunctionComponent<Props> = ({ children }) => {
    return (
        <div style={{ padding: '2rem' }}>
            <div className="max-w-[1128px] mx-auto">
                <PageHeader />
                <Box className="mt-10">{children}</Box>
            </div>
        </div>
    );
};

export default PageWrapper;
