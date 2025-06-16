import { Theme, VStack } from '@navikt/ds-react';
import { useEffect } from 'react';
import ForsidePageLayout from '../../src/apps/innsyn/pages/layout/ForsidePageLayout';
import InnsynAppHeader from '../../src/apps/innsyn/components/innsyn-app-header/InnsynAppHeader';
import '../../src/app.css';

export const withInnsynApp = (Story: any, startdato?: Date) => {
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
                    <InnsynAppHeader startdato={startdato || new Date()} />
                    <Story />
                </VStack>
            </ForsidePageLayout>
        </Theme>
    );
};
