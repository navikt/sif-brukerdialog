import { Theme, VStack } from '@navikt/ds-react';
import { useEffect } from 'react';
import InnsynAppHeader from '../../src/apps/innsyn/components/innsyn-app-header/InnsynAppHeader';
import ForsidePageLayout from '../../src/apps/innsyn/pages/layout/ForsidePageLayout';
import ForsidePageFooter from '../../src/apps/innsyn/pages/parts/ForsidePageFooter';
import '../../src/app.css';

export const withInnsynApp = (
    Story: any,
    options: { startdato?: Date; frontpageFooter?: boolean; withHeader?: boolean } = {
        withHeader: true,
    },
) => {
    useEffect(() => {
        document.body.classList.add('innsynAppBody');
        return () => {
            document.body.classList.remove('innsynAppBody');
        };
    }, [location.pathname]);
    return (
        <Theme hasBackground={false}>
            <ForsidePageLayout documentTitle="Forside" footer={options?.frontpageFooter ? <ForsidePageFooter /> : null}>
                <VStack gap="8">
                    {options.withHeader && <InnsynAppHeader startdato={options.startdato || new Date()} />}
                    <Story />
                </VStack>
            </ForsidePageLayout>
        </Theme>
    );
};
