import { Box, BoxNewProps } from '@navikt/ds-react';

export const InnsynPageBoundary = (props: BoxNewProps) => {
    return <Box marginInline="auto" paddingInline={{ sm: 'space-16', xs: 'space-8' }} maxWidth="704px" {...props} />;
};
