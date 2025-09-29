import { AmplitudeProvider } from '@navikt/sif-common-amplitude';
import EmptyPage from '../../components/page-layout/empty-page/EmptyPage';

export const withEmptyPage = (Story) => (
    <div className="bg-(--ax-bg-info-soft)">
        <AmplitudeProvider applicationKey="storybook" apiKey="default">
            <EmptyPage>
                <Story />
            </EmptyPage>
        </AmplitudeProvider>
    </div>
);
