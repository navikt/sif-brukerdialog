import EmptyPage from '../../components/page-layout/empty-page/EmptyPage';

export const withEmptyPage = (Story) => (
    <div className="bg-[--a-deepblue-50]">
        <EmptyPage>
            <Story />
        </EmptyPage>
    </div>
);
