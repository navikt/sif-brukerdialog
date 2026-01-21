import { Box, BoxNewProps } from '@navikt/ds-react';

const ResponsivePanel = ({ ...rest }: BoxNewProps & any) => (
    <Box
        borderColor="neutral-subtle"
        background="neutral-soft"
        borderRadius="8"
        borderWidth="1"
        padding={{ xs: "space-8", sm: "space-16", md: "space-24" }}
        {...rest}
    />
);

export default ResponsivePanel;
