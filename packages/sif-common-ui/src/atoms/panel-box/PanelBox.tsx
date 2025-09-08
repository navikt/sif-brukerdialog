import { Box, BoxNewProps } from '@navikt/ds-react';

const PanelBox = (props: BoxNewProps) => (
    <Box.New padding="4" background="neutral-moderate" borderRadius="medium" {...props} />
);

export default PanelBox;
