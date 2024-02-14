import { Box, Heading, Link, VStack } from '@navikt/ds-react';
import React from 'react';
import { ChevronRightIcon } from '@navikt/aksel-icons';
import { default as NextLink } from 'next/link';
import { Sak } from '../../server/api-models/SakSchema';
import { getAlleHendelserISak } from '../../utils/sakUtils';
import { Process } from '../process';
import ProcessStep from '../process/ProcessStep';
import { getProcessStepsFraSøknadshendelser } from './statusISakUtils';

interface Props {
    sak: Sak;
    visAlleHendelser?: boolean;
}

const StatusISak: React.FunctionComponent<Props> = ({ sak, visAlleHendelser }) => {
    const hendelser = getAlleHendelserISak(sak);
    const processSteps = getProcessStepsFraSøknadshendelser(hendelser);
    const visibleSteps = visAlleHendelser ? processSteps : [...processSteps].splice(-4);
    const finnnesFlereHendelser = visibleSteps.length < processSteps.length;

    return (
        <VStack gap="3">
            <Heading level="2" size="medium">
                Siste hendelser i saken
            </Heading>
            <Box padding="4" className="bg-white">
                <Process>
                    {visibleSteps.map((step, idx) => (
                        <ProcessStep
                            key={idx}
                            completed={step.completed}
                            current={step.current}
                            isLastStep={step.isLastStep}
                            isContinuation={finnnesFlereHendelser && idx === 0}>
                            <Heading size="small" level="3">
                                {step.title}
                            </Heading>
                            {step.content}
                        </ProcessStep>
                    ))}
                </Process>
            </Box>
            {finnnesFlereHendelser && visAlleHendelser === undefined ? (
                <Box className="ml-4">
                    <Link as={NextLink} href={`/sak/${sak.saksnummer}/historikk`}>
                        Se alle hendelser
                        <ChevronRightIcon role="presentation" />
                    </Link>
                </Box>
            ) : null}
        </VStack>
    );
};

export default StatusISak;
