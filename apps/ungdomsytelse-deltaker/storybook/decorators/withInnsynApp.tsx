import { Theme, VStack } from '@navikt/ds-react';
import { useEffect } from 'react';
import ForsidePageLayout from '../../src/apps/innsyn/pages/layout/ForsidePageLayout';

export const withInnsynApp = (Story: any) => {
    useEffect(() => {
        document.body.classList.add('innsynAppBody');
        return () => {
            document.body.classList.remove('innsynAppBody');
        };
    }, [location.pathname]);
    return (
        <Theme hasBackground={false}>
            <ForsidePageLayout documentTitle="Forside">
                <VStack gap="8">
                    <Story />
                </VStack>
            </ForsidePageLayout>
        </Theme>
    );
};
