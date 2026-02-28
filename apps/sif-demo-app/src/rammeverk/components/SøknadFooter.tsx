import { Button, HStack } from '@navikt/ds-react';

import { useAvbrytSøknad } from '../hooks/useAvbrytSøknad';

interface SøknadFooterProps {
    avbrytTekst?: string;
    velkommenPath?: string;
}

export const SøknadFooter = ({ avbrytTekst = 'Avbryt', velkommenPath }: SøknadFooterProps) => {
    const { avbrytSøknad } = useAvbrytSøknad({ velkommenPath });

    return (
        <HStack>
            <Button type="button" variant="tertiary" onClick={avbrytSøknad}>
                {avbrytTekst}
            </Button>
        </HStack>
    );
};
