import { Box, VStack } from '@navikt/ds-react';
import React from 'react';
import HvaSkjerFooter from '../../hva-skjer-footer/HvaSkjerFooter';
import PageHeader from '../page-header/PageHeader';
import KontaktOssFooter from '../../kontakt-oss-footer/KontaktOssFooter';

interface Props {
    children: React.ReactNode;
}

const DefaultPage: React.FunctionComponent<Props> = ({ children }) => (
    <>
        <VStack gap="10" className="p-5">
            <div className="max-w-[1128px] mx-auto">
                <PageHeader />
                <Box className="mt-10">{children}</Box>
            </div>
            <HvaSkjerFooter />
        </VStack>

        <div className="bg-white p-5 pt-10">
            <div className="max-w-[1128px] mx-auto">
                <KontaktOssFooter />
            </div>
        </div>
    </>
);

export default DefaultPage;
