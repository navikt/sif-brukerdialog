import { AnalyticsProvider } from '@navikt/sif-common-analytics';
import type { Decorator } from '@storybook/react';

import EmptyPage from '../../components/page-layout/empty-page/EmptyPage';

export const withEmptyPage: Decorator = (Story) => (
    <div className="bg-(--ax-bg-info-soft)">
        <AnalyticsProvider applicationKey="storybook" apiKey="default">
            <EmptyPage>
                <Story />
            </EmptyPage>
        </AnalyticsProvider>
    </div>
);
