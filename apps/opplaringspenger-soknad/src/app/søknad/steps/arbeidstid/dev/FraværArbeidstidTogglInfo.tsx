import { Bleed, BodyLong, Box, Tag } from '@navikt/ds-react';

import { useSøknadContext } from '../../../context/hooks/useSøknadContext';

const FraværArbeidstidToggleInfo = () => {
    const {
        state: { spørOmFraværFraJobb },
    } = useSøknadContext();
    return (
        <Bleed marginInline="space-32">
            <Box
                background="brand-beige-moderate"
                padding="space-16"
                paddingInline="space-32"
                marginBlock="space-16 space-48"
                borderRadius="16">
                <Tag variant="strong" data-color="warning">
                    Featur: Fravær fra arbeid
                </Tag>
                <BodyLong>
                    {spørOmFraværFraJobb ? 'Togglet til å spørre om fravær' : 'Togglet til å spørre om arbeidstid'}. Du
                    må starte ny søknad for å bytte til vanlig versjon som spør om arbeidstid.
                </BodyLong>
            </Box>
        </Bleed>
    );
};

export default FraværArbeidstidToggleInfo;
