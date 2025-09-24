import { BoxNew } from '@navikt/ds-react';
import React from 'react';

const InnsynInfoBox = ({ children }: { children: React.ReactNode }) => {
    return (
        <BoxNew background="brand-blue-moderateA" className="inline-block rounded-xl p-6">
            {children}
        </BoxNew>
    );
};

export default InnsynInfoBox;
