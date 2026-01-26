import '../../src/app.css';

import { Theme, VStack } from '@navikt/ds-react';
import { UxSignalsLoaderProvider } from '@navikt/sif-common-core-ds';
import { useEffect } from 'react';

import ForsideHeader from '../../src/apps/innsyn/components/forside-header/ForsideHeader';
import ForsidePageLayout from '../../src/apps/innsyn/pages/layout/ForsidePageLayout';
import ForsidePageFooter from '../../src/apps/innsyn/pages/parts/ForsidePageFooter';
import StoryIntlProvider from '../components/StoryIntlProvider';

export const useWithInnsynApp = (
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
            <UxSignalsLoaderProvider>
                <StoryIntlProvider>
                    <ForsidePageLayout
                        documentTitle="Forside"
                        footer={options?.frontpageFooter ? <ForsidePageFooter /> : null}>
                        <VStack gap="space-32">
                            {options.withHeader && <ForsideHeader startdato={options.startdato || new Date()} />}
                            <Story />
                        </VStack>
                    </ForsidePageLayout>
                </StoryIntlProvider>
            </UxSignalsLoaderProvider>
        </Theme>
    );
};
