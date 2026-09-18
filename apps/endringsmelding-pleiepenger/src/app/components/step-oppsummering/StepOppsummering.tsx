import { PencilIcon } from '@navikt/aksel-icons';
import { Bleed, Box, Button, ExpansionCard, HStack, InlineMessage, VStack } from '@navikt/ds-react';
import { ReactNode, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getSøknadStepRoute } from '../../søknad/config/SøknadRoutes';
import { StepId } from '../../søknad/config/StepId';

interface Props {
    tittel: string;
    stepId: StepId;
    icon: ReactNode;
    endret: boolean;
    children: ReactNode;
    endringer?: ReactNode;
    endreLinkTekst: string;
}

export const StepOppsummering = ({ tittel, stepId, children, icon, endreLinkTekst, endret }: Props) => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState<boolean>(true);
    return (
        <ExpansionCard aria-label="Arbeidstid" open={isOpen} onToggle={() => setIsOpen(!isOpen)}>
            <ExpansionCard.Header>
                <HStack wrap={false} gap="space-16" align="center">
                    <Bleed marginBlock="space-0 space-16">{icon}</Bleed>
                    <div>
                        <ExpansionCard.Title>{tittel}</ExpansionCard.Title>
                        {endret && (
                            <ExpansionCard.Description>
                                {/* <HStack gap="space-8"> */}
                                <InlineMessage status="info" as="span">
                                    Endret
                                </InlineMessage>
                                {/* <TagsContainer>{endringer || 'Ingen endringer registrert'}</TagsContainer> */}
                                {/* </HStack> */}
                            </ExpansionCard.Description>
                        )}
                    </div>
                </HStack>
            </ExpansionCard.Header>
            <ExpansionCard.Content>
                <VStack gap="space-16" className="stepOppsummering">
                    <div>{endret ? children : 'Ingen endring registrert'}</div>
                    <Box paddingBlock="space-8 space-0">
                        <Button
                            type="button"
                            variant="secondary"
                            size="small"
                            data-color="accent"
                            onClick={() => navigate(getSøknadStepRoute(stepId))}
                            icon={<PencilIcon role="presentation" />}>
                            {endreLinkTekst}
                        </Button>
                    </Box>
                </VStack>
            </ExpansionCard.Content>
        </ExpansionCard>
    );
};
