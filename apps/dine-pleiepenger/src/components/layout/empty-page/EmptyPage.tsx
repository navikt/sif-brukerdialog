import React from 'react';

interface Props {
    children: React.ReactNode;
}

const EmptyPage: React.FunctionComponent<Props> = ({ children }) => (
    <div className="p-10 pb-20">
        <div className="max-w-[1128px] mx-auto">{children}</div>
    </div>
);

export default EmptyPage;
