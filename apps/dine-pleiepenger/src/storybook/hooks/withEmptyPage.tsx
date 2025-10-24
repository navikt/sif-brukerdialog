import { AmplitudeProvider } from '@navikt/sif-common-amplitude';
import type { Decorator } from '@storybook/react';

import EmptyPage from '../../components/page-layout/empty-page/EmptyPage';

export const withEmptyPage: Decorator = (Story) => (
    <div className="bg-(--ax-bg-info-soft)">
        <AmplitudeProvider applicationKey="storybook" apiKey="default">
            <EmptyPage>
                <Story />
            </EmptyPage>
        </AmplitudeProvider>
    </div>
);
