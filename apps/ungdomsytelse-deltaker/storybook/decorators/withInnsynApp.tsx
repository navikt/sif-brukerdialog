import '../../src/app.css';

import { Theme, VStack } from '@navikt/ds-react';
import { UxSignalsLoaderProvider } from '@navikt/sif-common-core-ds';
import { InnsynForsideHeader } from '@sif/ung-ui/components';
import { useEffect } from 'react';

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
                            {options.withHeader && <InnsynForsideHeader title="Din ungdomsprogramytelse" />}
                            <Story />
                        </VStack>
                    </ForsidePageLayout>
                </StoryIntlProvider>
            </UxSignalsLoaderProvider>
        </Theme>
    );
};
