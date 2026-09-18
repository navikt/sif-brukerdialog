import { ClockDashedIcon } from '@navikt/aksel-icons';
import { ExpansionCard, HStack, VStack } from '@navikt/ds-react';
import { ActionLink } from '@navikt/sif-common-ui';
import { useNavigate } from 'react-router-dom';

import { getSøknadStepRoute } from '../../../config/SøknadRoutes';
import { StepId } from '../../../config/StepId';

export const SingleEditOppsummering = () => {
    const navigate = useNavigate();
    return (
        <VStack gap="space-16">
            <ExpansionCard aria-label="Arbeidstid">
                <ExpansionCard.Header>
                    <HStack wrap={false} gap="space-16" align="center">
                        <div>
                            <ClockDashedIcon aria-hidden fontSize="3rem" />
                        </div>
                        <div>
                            <ExpansionCard.Title>Arbeidstid</ExpansionCard.Title>
                            <ExpansionCard.Description>Ingen endringer registrert</ExpansionCard.Description>
                        </div>
                    </HStack>
                </ExpansionCard.Header>
                <ExpansionCard.Content>
                    <ActionLink onClick={() => navigate(getSøknadStepRoute(StepId.ARBEIDSTID))}>
                        Endre arbeidstid
                    </ActionLink>
                </ExpansionCard.Content>
            </ExpansionCard>

            <ExpansionCard aria-label="Ferie">
                <ExpansionCard.Header>
                    <HStack wrap={false} gap="space-16" align="center">
                        <div>
                            <ClockDashedIcon aria-hidden fontSize="3rem" />
                        </div>
                        <div>
                            <ExpansionCard.Title>Ferie</ExpansionCard.Title>
                            <ExpansionCard.Description>Ingen endringer registrert</ExpansionCard.Description>
                        </div>
                    </HStack>
                </ExpansionCard.Header>
                <ExpansionCard.Content>
                    <ActionLink onClick={() => navigate(getSøknadStepRoute(StepId.LOVBESTEMT_FERIE))}>
                        Endre ferie
                    </ActionLink>
                </ExpansionCard.Content>
            </ExpansionCard>
            <ExpansionCard aria-label="Tid i omsorgstilbud">
                <ExpansionCard.Header>
                    <HStack wrap={false} gap="space-16" align="center">
                        <div>
                            <ClockDashedIcon aria-hidden fontSize="3rem" />
                        </div>
                        <div>
                            <ExpansionCard.Title>Tid i omsorgstilbud</ExpansionCard.Title>
                            <ExpansionCard.Description>Ingen endringer registrert</ExpansionCard.Description>
                        </div>
                    </HStack>
                </ExpansionCard.Header>
                <ExpansionCard.Content>
                    <ActionLink onClick={() => navigate(getSøknadStepRoute(StepId.TILSYNSORDNING))}>
                        Endre tid i omsorgstilbud
                    </ActionLink>
                </ExpansionCard.Content>
            </ExpansionCard>
        </VStack>
    );
};
