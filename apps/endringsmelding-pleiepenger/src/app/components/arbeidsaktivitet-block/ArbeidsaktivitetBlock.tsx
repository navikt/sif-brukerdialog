import { ArbeidsaktivitetType, ArbeidsgiverMedAnsettelseperioder } from '@app/types';
import { Box, ExpansionCard, VStack } from '@navikt/ds-react';

import AnsettelsesperioderInfo from './AnsettelsesperioderInfo';
import ArbeidsaktivitetBlockHeader from './ArbeidsaktivitetBlockHeader';

interface Props {
    navn: string;
    type: ArbeidsaktivitetType;
    arbeidsgiver?: ArbeidsgiverMedAnsettelseperioder;
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
    const renderHeader = (inkluderAnsettelsesperioder: boolean) => {
        return (
            <ArbeidsaktivitetBlockHeader
                type={type}
                navn={navn}
                arbeidsgiver={arbeidsgiver}
                endret={endret}
                erUkjentAktivitet={erUkjent}
                inkluderAnsettelsesperioder={inkluderAnsettelsesperioder}
            />
        );
    };

    const renderAnsettelsesperioder = () => {
        return arbeidsgiver ? <AnsettelsesperioderInfo ansettelsesperioder={arbeidsgiver.ansettelsesperioder} /> : null;
    };
    return renderAsExpansionCard ? (
        <ExpansionCard aria-label={navn} defaultOpen={expansionCardDefaultOpen} size="small">
            <ExpansionCard.Header>{renderHeader(false)}</ExpansionCard.Header>
            <ExpansionCard.Content data-color="accent">
                <VStack gap="space-32">
                    {renderAnsettelsesperioder()}
                    {children}
                </VStack>
            </ExpansionCard.Content>
        </ExpansionCard>
    ) : (
        <Box borderRadius="16" borderColor="neutral" borderWidth="1" padding="space-16">
            <VStack gap="space-32">
                {renderHeader(true)}
                <div>{children}</div>
            </VStack>
        </Box>
    );
};

export default ArbeidsaktivitetBlock;
