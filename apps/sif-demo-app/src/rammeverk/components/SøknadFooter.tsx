import { Button, HStack } from '@navikt/ds-react';

interface SøknadFooterProps {
    onAvbryt: () => void;
}

export const SøknadFooter = ({ onAvbryt }: SøknadFooterProps) => {
    return (
        <HStack>
            <Button type="button" variant="tertiary" onClick={onAvbryt}>
                Avbryt
            </Button>
        </HStack>
    );
};
