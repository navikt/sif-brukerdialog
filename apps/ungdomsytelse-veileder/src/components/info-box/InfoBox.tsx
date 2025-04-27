import { BoxNew } from '@navikt/ds-react';

const InfoBox = ({ children }) => {
    return (
        <BoxNew background="info-moderate" paddingBlock="7 8" paddingInline="8" borderRadius="large">
            {children}
        </BoxNew>
    );
};

export default InfoBox;
