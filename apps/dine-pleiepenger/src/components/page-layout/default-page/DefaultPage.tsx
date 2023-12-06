import { VStack } from '@navikt/ds-react';
import React from 'react';
import PageHeader from '../page-header/PageHeader';

interface Props {
    children: React.ReactNode;
}

const DefaultPage: React.FunctionComponent<Props> = ({ children }) => (
    <>
        <VStack gap="10" className="p-5 max-w-[1128px] mx-auto">
            <PageHeader />
            {children}
        </VStack>

        {/* <div className="bg-white p-5 pt-10">
            <div className="max-w-[1128px] mx-auto">
                <KontaktOss />
            </div>
        </div> */}
    </>
);

export default DefaultPage;
