import { VStack } from '@navikt/ds-react';
import { useEffect } from 'react';
import UngdomsprogrammetHeader from '../../src/apps/innsyn/atoms/ungdomsprogrammet-header/UngdomsprogrammetHeader';
import ForsidePageLayout from '../../src/apps/innsyn/pages/layout/ForsidePageLayout';

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
