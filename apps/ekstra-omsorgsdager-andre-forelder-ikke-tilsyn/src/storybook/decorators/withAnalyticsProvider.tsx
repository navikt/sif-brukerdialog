import { AnalyticsProvider } from '@navikt/sif-common-analytics';

export const withAnalyticsProvider = (Story: any) => (
    <AnalyticsProvider applicationKey="ab" isActive={false}>
        <Story />
    </AnalyticsProvider>
);
