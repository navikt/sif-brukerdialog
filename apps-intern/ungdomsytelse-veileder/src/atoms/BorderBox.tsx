import { Box, BoxNewProps } from '@navikt/ds-react';

const BorderBox = (props: BoxNewProps) => {
    return (
        <Box
            background="neutral-soft"
            borderRadius="16"
            borderColor="neutral-subtle"
            borderWidth="2"
            className="p-8 pt-8 pb-14 items-center w-full"
            {...props}
        />
    );
};

export default BorderBox;
