import React from 'react';

export enum Slug {
    soknad_om_opplaringspenger = 'arbeids-og-velferdsetaten-nav/soknad-om-opplaeringspenger',
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
