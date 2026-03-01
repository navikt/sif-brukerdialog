import { Button, HStack } from '@navikt/ds-react';

import { useAvbrytSøknad } from '../hooks/useAvbrytSøknad';

interface SøknadFooterProps {
    avbrytTekst?: string;
    velkommenPath?: string;
    avbrytCallback?: () => void;
}

export const SøknadFooter = ({ avbrytTekst = 'Avbryt', velkommenPath, avbrytCallback }: SøknadFooterProps) => {
    const { avbrytSøknad } = useAvbrytSøknad({ velkommenPath, avbrytCallback });

    return (
        <HStack>
            <Button type="button" variant="tertiary" onClick={avbrytSøknad}>
                {avbrytTekst}
            </Button>
        </HStack>
    );
};
