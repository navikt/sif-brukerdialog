import React from 'react';

export enum Slug {
    prod_rapporterInntekt = 'arbeids-og-velferdsetaten-nav/ungdomsprorgramytelsen-rapportere-inntekt',
    test_rapporterInntekt = 'arbeids-og-velferdsetaten-nav/test-rapportering-av-inntekt',
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
