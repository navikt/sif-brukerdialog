import { useEffect } from 'react';
import PageLayout from '../../src/apps/innsyn/components/page-layout/PageLayout';
import UngdomsprogramYtelseHeader from '../../src/apps/innsyn/components/page-layout/illustrasjon/UngdomsprogramYtelseHeader';
import { VStack } from '@navikt/ds-react';

export const withInnsynApp = (Story: any) => {
    useEffect(() => {
        document.body.classList.add('innsynAppBody');
        return () => {
            document.body.classList.remove('innsynAppBody');
        };
    }, [location.pathname]);
    return (
        <PageLayout documentTitle="Forside">
            <VStack gap="8">
                <UngdomsprogramYtelseHeader />
                <Story />
            </VStack>
        </PageLayout>
    );
};
