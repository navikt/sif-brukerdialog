import { BodyShort, Box, Heading, Link, Switch, VStack } from '@navikt/ds-react';
import React, { useState } from 'react';
import { ChevronRightIcon } from '@navikt/aksel-icons';
import { default as NextLink } from 'next/link';
import { Sak } from '../../server/api-models/SakSchema';
import { formatSøknadshendelseTidspunkt, getAlleHendelserISak } from '../../utils/sakUtils';
import { Process } from '../process';
import ProcessStep from '../process/ProcessStep';
import { getProcessStepsFraSøknadshendelser } from './statusISakUtils';
import { useMessages } from '../../i18n';

interface Props {
    sak: Sak;
    tittel?: string;
    visAlleHendelser?: boolean;
}

const StatusISak: React.FunctionComponent<Props> = ({ sak, visAlleHendelser, tittel }) => {
    const [reverseDirection, setReverseDirection] = useState(false);
    const { text } = useMessages();
    const hendelser = getAlleHendelserISak(sak);
    const processSteps = getProcessStepsFraSøknadshendelser(text, hendelser);

    if (reverseDirection) {
        processSteps.reverse();
    }
    const visibleSteps = visAlleHendelser ? processSteps : [...processSteps].splice(-4);
    const finnnesFlereHendelser = visibleSteps.length < processSteps.length;

    return (
        <VStack gap="3">
            {tittel ? (
                <Heading level="2" size="medium">
                    {tittel}
                </Heading>
            ) : null}

            {visAlleHendelser ? (
                <Box>
                    <Switch
                        checked={reverseDirection}
                        onChange={(e) => {
                            setReverseDirection(e.target.checked);
                        }}>
                        Vis nyeste øverst
                    </Switch>
                </Box>
            ) : null}
            <Box className="bg-white p-6 pb-4 pt-4">
                <Process>
                    {visibleSteps.map((step, idx) => {
                        const headingId = `process-heading-${idx}`;
                        return (
                            <ProcessStep
                                key={idx}
                                completed={step.completed}
                                current={step.current}
                                aria-labelledby={headingId}
                                isLastStep={step.isLastStep}
                                headingId={headingId}
                                isContinuation={finnnesFlereHendelser && idx === 0}>
                                <Heading size="small" level="3" id={`process-heading-${idx}`}>
                                    {step.title}{' '}
                                    {step.timestamp ? (
                                        <BodyShort className="mb-2">
                                            {formatSøknadshendelseTidspunkt(step.timestamp)}
                                        </BodyShort>
                                    ) : null}
                                </Heading>
                                {step.content}
                            </ProcessStep>
                        );
                    })}
                </Process>
            </Box>
            {finnnesFlereHendelser && visAlleHendelser === undefined ? (
                <Box className="ml-4 mb-4">
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
