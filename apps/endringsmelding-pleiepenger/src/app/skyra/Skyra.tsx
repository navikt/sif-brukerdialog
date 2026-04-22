import React from 'react';

export enum Slug {
    kvittering_inline = 'arbeids-og-velferdsetaten-nav/endringsmelding-pleiepenger-barn',
}

interface Props {
    slug: Slug;
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
