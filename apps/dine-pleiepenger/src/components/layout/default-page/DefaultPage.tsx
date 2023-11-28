import { Box, VStack } from '@navikt/ds-react';
import React from 'react';
import HvaSkjer from '../../hva-skjer/HvaSkjer';
import KontaktOss from '../../kontakt-oss/KontaktOss';
import PageHeader from '../page-header/PageHeader';

interface Props {
    children: React.ReactNode;
}

const DefaultPage: React.FunctionComponent<Props> = ({ children }) => (
    <>
        <VStack gap="10" className="p-5 max-w-[1128px] mx-auto">
            <PageHeader />
            <Box className="mt-10">{children}</Box>
            <HvaSkjer />
        </VStack>

        <div className="bg-white p-5 pt-10">
            <div className="max-w-[1128px] mx-auto">
                <KontaktOss />
            </div>
        </div>
    </>
);

export default DefaultPage;
