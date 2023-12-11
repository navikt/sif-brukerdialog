import DefaultPage from '../../components/page-layout/default-page/DefaultPage';

export const withDefaultPage = (Story) => (
    <div className="bg-[--a-deepblue-50]">
        <DefaultPage>
            <Story />
        </DefaultPage>
    </div>
);
