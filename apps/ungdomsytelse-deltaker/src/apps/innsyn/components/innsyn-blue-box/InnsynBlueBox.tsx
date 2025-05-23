import { BoxNew } from '@navikt/ds-react';
import React from 'react';

const InnsynBlueBox = ({ children }: { children: React.ReactNode }) => {
    return (
        <BoxNew background="info-soft" className="inline-block rounded-xl p-6">
            {children}
        </BoxNew>
    );
};

export default InnsynBlueBox;
