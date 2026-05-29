import React from 'react';

interface Props {
    slug: string;
    consent?: boolean;
}

const Skyra = ({ slug, consent }: Props) => {
    return (
        <>
            {React.createElement('skyra-survey', {
                slug,
                consent,
            })}
        </>
    );
};

export default Skyra;
