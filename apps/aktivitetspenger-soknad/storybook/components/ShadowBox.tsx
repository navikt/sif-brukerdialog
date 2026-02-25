/*
TODO: Aksel Box migration:
Could not migrate the following:
  - shadow=medium
*/

import { Box } from '@navikt/ds-react';

const ShadowBox = ({ children }: { children: React.ReactNode }) => {
    return (
        <Box borderRadius="4" borderWidth="1" borderColor="neutral-subtle" padding="space-24" shadow="dialog">
            {children}
        </Box>
    );
};

export default ShadowBox;
