import ForsidePageLayout from '../../src/apps/innsyn/pages/layout/ForsidePageLayout';
import { VStack } from '@navikt/ds-react';
import UngdomsprogrammetHeader from '../../src/apps/innsyn/components/ungdomsprogrammet-header/UngdomsprogrammetHeader';
import { useEffect } from 'react';

export const withInnsynApp = (Story: any) => {
    useEffect(() => {
        document.body.classList.add('innsynAppBody');
        return () => {
            document.body.classList.remove('innsynAppBody');
        };
    }, [location.pathname]);
    return (
        <ForsidePageLayout documentTitle="Forside">
            <VStack gap="8">
                <UngdomsprogrammetHeader />
                <Story />
            </VStack>
        </ForsidePageLayout>
    );
};
