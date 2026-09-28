import { Button, Heading, VStack } from '@navikt/ds-react';
import { ReactNode } from 'react';

interface Props {
    tittel: ReactNode;
    children: ReactNode;
    endre?: {
        label: ReactNode;
        onClick: () => void;
    };
}

const OppsummeringBlokk = ({ tittel, children, endre }: Props) => (
    <VStack gap="space-16">
        <Heading level="2" size="medium">
            {tittel}
        </Heading>
        {children}
        {endre && (
            <div>
                <Button type="button" variant="secondary" size="small" onClick={endre.onClick}>
                    {endre.label}
                </Button>
            </div>
        )}
    </VStack>
);

export default OppsummeringBlokk;
