import { BodyLong, Box, ExpansionCard, GuidePanel, Heading, VStack } from '@navikt/ds-react';
import { dateFormatter } from '@navikt/sif-common-utils';
import React from 'react';

interface Props {
    deltakerNavn: string;
    svarfrist: Date;
    løst: boolean;
    children: React.ReactNode;
}

const OppgaveInfoWrapper = ({ deltakerNavn, children, svarfrist, løst }: Props) => {
    const commonText = (
        <>
            <BodyLong spacing>
                Utbetalingen av pengene blir utsatt til du svarer eller til fristen for å svare har gått ut.
            </BodyLong>
            <BodyLong spacing weight="semibold">
                Fristen for å svare er {dateFormatter.full(svarfrist)}.
            </BodyLong>
        </>
    );

    return løst ? (
        <ExpansionCard aria-label="Beskjed fra Nav" size="small">
            <ExpansionCard.Header>
                <ExpansionCard.Title>Oppgaveinformasjon</ExpansionCard.Title>
            </ExpansionCard.Header>
            <ExpansionCard.Content>
                {children}
                {commonText}
            </ExpansionCard.Content>
        </ExpansionCard>
    ) : (
        <GuidePanel>
            <VStack gap="4">
                <Heading level="2" size="medium">
                    Hei {deltakerNavn}
                </Heading>
                <Box maxWidth="90%">
                    {children}
                    {commonText}
                </Box>
            </VStack>
        </GuidePanel>
    );
};
export default OppgaveInfoWrapper;
