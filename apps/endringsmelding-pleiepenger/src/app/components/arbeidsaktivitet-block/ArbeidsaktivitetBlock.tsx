import { ArbeidsaktivitetType, Arbeidsgiver } from '@app/types';
import { Box, ExpansionCard, VStack } from '@navikt/ds-react';

import ArbeidsaktivitetBlockHeader from './ArbeidsaktivitetBlockHeader';

interface Props {
    navn: string;
    type: ArbeidsaktivitetType;
    arbeidsgiver?: Arbeidsgiver;
    endret?: { tekst: string };
    erUkjent?: boolean;
    renderAsExpansionCard?: boolean;
    expansionCardDefaultOpen?: boolean;
    children: React.ReactNode;
}

const ArbeidsaktivitetBlock = ({
    navn,
    type,
    arbeidsgiver,
    renderAsExpansionCard,
    expansionCardDefaultOpen = true,
    endret,
    erUkjent,
    children,
}: Props) => {
    const renderHeader = () => {
        return (
            <ArbeidsaktivitetBlockHeader
                type={type}
                navn={navn}
                arbeidsgiver={arbeidsgiver}
                endret={endret}
                erUkjentAktivitet={erUkjent}
            />
        );
    };
    return renderAsExpansionCard ? (
        <ExpansionCard aria-label={navn} defaultOpen={expansionCardDefaultOpen} size="small">
            <ExpansionCard.Header>{renderHeader()}</ExpansionCard.Header>
            <ExpansionCard.Content data-color="accent">{children}</ExpansionCard.Content>
        </ExpansionCard>
    ) : (
        <Box borderRadius="16" borderColor="neutral" borderWidth="1" padding="space-16">
            <VStack gap="space-32">
                {renderHeader()}
                <div>{children}</div>
            </VStack>
        </Box>
    );
};

export default ArbeidsaktivitetBlock;
