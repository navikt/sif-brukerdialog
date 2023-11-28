import { Box } from '@navikt/ds-react';
import React from 'react';
import HvaSkjerFooter from '../../hva-skjer-footer/HvaSkjerFooter';
import PageHeader from '../page-header/PageHeader';

interface Props {
    children: React.ReactNode;
}

const DefaultPage: React.FunctionComponent<Props> = ({ children }) => (
    <>
        <div className="p-5">
            <div className="max-w-[1128px] mx-auto">
                <PageHeader />
                <Box className="mt-10">{children}</Box>
            </div>
        </div>

        <div className="bg-white p-5 pt-10">
            <div className="max-w-[1128px] mx-auto">
                <HvaSkjerFooter />
            </div>
        </div>
    </>
);

export default DefaultPage;
