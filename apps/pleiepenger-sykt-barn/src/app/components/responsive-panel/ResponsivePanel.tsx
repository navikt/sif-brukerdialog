import { BoxNew, BoxNewProps } from '@navikt/ds-react';

const ResponsivePanel = ({ ...rest }: BoxNewProps & any) => (
    <BoxNew
        borderColor="neutral-subtle"
        background="neutral-soft"
        borderRadius="8"
        borderWidth="1"
        padding={{ xs: '2', sm: '4', md: '6' }}
        {...rest}
    />
);

export default ResponsivePanel;
