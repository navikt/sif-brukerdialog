import { BoxNew, BoxNewProps } from '@navikt/ds-react';

const BorderBox = (props: BoxNewProps) => {
    return (
        <BoxNew
            background="neutral-soft"
            borderRadius="xlarge"
            borderColor="neutral-subtle"
            borderWidth="2"
            className="p-8 pt-8 pb-14 items-center w-full"
            {...props}
        />
    );
};

export default BorderBox;
