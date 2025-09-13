import DefaultPageLayout from '../../components/page-layout/default-page-layout/DefaultPageLayout';

export const withDefaultPage = (Story) => (
    <div className="bg-(--ax-bg-info-soft)">
        <DefaultPageLayout>
            <Story />
        </DefaultPageLayout>
    </div>
);
