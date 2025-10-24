import type { Decorator } from '@storybook/react';

import DefaultPageLayout from '../../components/page-layout/default-page-layout/DefaultPageLayout';

export const withDefaultPage: Decorator = (Story) => (
    <div className="bg-(--ax-bg-info-soft)">
        <DefaultPageLayout>
            <Story />
        </DefaultPageLayout>
    </div>
);
