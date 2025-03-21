import DefaultPageLayout from '../../components/page-layout/default-page-layout/DefaultPageLayout';

export const withDefaultPage = (Story) => (
    <div className="bg-(--a-deepblue-50)">
        <DefaultPageLayout>
            <Story />
        </DefaultPageLayout>
    </div>
);
