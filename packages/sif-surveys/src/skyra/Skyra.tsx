import React from 'react';

import { SkyraSlug } from './SkyraSlug';

interface Props {
    slug: SkyraSlug;
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
