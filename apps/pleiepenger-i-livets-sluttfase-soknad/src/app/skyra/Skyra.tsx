import React from 'react';

export enum Slug {
    soknad_om_pleiepenger_i_livets_sluttfase = 'arbeids-og-velferdsetaten-nav/soknad-om-pleiepenger-i-livets-sluttfase',
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
