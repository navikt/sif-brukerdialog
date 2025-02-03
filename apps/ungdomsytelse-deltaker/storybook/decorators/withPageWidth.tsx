export const withPageWidth = (Story) => (
    <div className="p-5 pb-10 md:p-10 md:pb-20">
        <div className="max-w-[1128px] mx-auto">
            <Story />
        </div>
    </div>
);
