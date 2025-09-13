import { Theme } from '@navikt/ds-react';
import React from 'react';

interface Props {
    children: React.ReactNode;
}

const EmptyPage = ({ children }: Props) => (
    <Theme hasBackground={false}>
        <div className="p-5 pb-10 md:p-10 md:pb-20">
            <div className="max-w-[1128px] mx-auto">{children}</div>
        </div>
    </Theme>
);

export default EmptyPage;
