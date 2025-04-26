import { BoxNew } from '@navikt/ds-react';

const InfoBox = ({ children }) => {
    return (
        <BoxNew background="info-moderate" padding="5" borderRadius="large">
            {children}
        </BoxNew>
    );
};

export default InfoBox;
