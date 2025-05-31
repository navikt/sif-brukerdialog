import { CheckmarkCircleFillIcon } from '@navikt/aksel-icons';
import { BodyShort, Box, BoxNew, Heading, HGrid, Show, VStack } from '@navikt/ds-react';
import { dateFormatter } from '@navikt/sif-common-utils';

interface Props {
    mottatt: Date;
}

const SøknadMottattOppgavePanel = ({ mottatt }: Props) => (
    <BoxNew
        borderColor="neutral-subtle"
        background="neutral-soft"
        borderRadius="8"
        borderWidth="1"
        className="w-full"
        padding="4">
        <HGrid columns="3rem auto" gap="2" className="w-full" align="center">
            <Show above="sm">
                <Box paddingInline="2 3">
                    <CheckmarkCircleFillIcon
                        fill="red"
                        color="#00893c"
                        width="2rem"
                        height="2rem"
                        aria-label="Gjennomført ikon"
                    />
                </Box>
            </Show>
            <VStack gap="1">
                <Heading level="3" size="small">
                    Søknad for ungdoms&shy;program&shy;ytelsen
                </Heading>
                <BodyShort className="text-text-subtle">Mottatt {dateFormatter.compact(mottatt)}</BodyShort>
            </VStack>
        </HGrid>
    </BoxNew>
);

export default SøknadMottattOppgavePanel;
