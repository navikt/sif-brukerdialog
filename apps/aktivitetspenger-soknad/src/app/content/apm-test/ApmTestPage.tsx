import { appLogger } from '@sif/apm';
import { Alert, BodyShort, Box, Button, Heading, HStack, Page, VStack } from '@navikt/ds-react';
import { useState } from 'react';

/**
 * Kun tilgjengelig i dev (ENV !== 'production').
 * Brukes til å generere testdata for Grafana APM-alerts.
 */
const ApmTestPage = () => {
    const [log, setLog] = useState<string[]>([]);

    const addLog = (msg: string) => setLog((prev) => [`${new Date().toISOString()} — ${msg}`, ...prev]);

    const handleLogInfo = () => {
        appLogger.logInfo('Test: appLogger.logInfo', { source: 'ApmTestPage' });
        addLog('logInfo sendt');
    };

    const handleLogError = () => {
        appLogger.logError('Test: appLogger.logError', { source: 'ApmTestPage' });
        addLog('logError sendt');
    };

    const handleLogException = () => {
        try {
            throw new Error('Test: appLogger.logException via try/catch');
        } catch (e) {
            appLogger.logException(e, { source: 'ApmTestPage', type: 'caught' });
            addLog('logException sendt');
        }
    };

    const handleUncaughtException = () => {
        addLog('Kaster uncaught exception (siden krasjer — reload nødvendig)');
        setTimeout(() => {
            throw new Error('Test: uncaught exception — auto-instrumentering');
        }, 100);
    };

    const handleUnhandledRejection = () => {
        addLog('Kaster uncaught promise rejection');
        Promise.reject(new Error('Test: unhandled promise rejection — auto-instrumentering'));
    };

    return (
        <Page>
            <Page.Block as="main" width="text" gutters>
                <VStack gap="space-8" paddingBlock="space-8">
                    <Alert variant="warning">
                        Denne siden sender reelle APM-hendelser til Grafana. Kun ment for testing av alerts i dev-miljø.
                    </Alert>

                    <Heading size="large">APM Test</Heading>

                    <VStack gap="space-4">
                        <Heading size="small">appLogger (@sif/apm)</Heading>
                        <HStack gap="space-4" wrap>
                            <Button variant="secondary" size="small" onClick={handleLogInfo}>
                                logInfo
                            </Button>
                            <Button variant="secondary" size="small" onClick={handleLogError}>
                                logError
                            </Button>
                            <Button variant="secondary" size="small" onClick={handleLogException}>
                                logException
                            </Button>
                        </HStack>
                    </VStack>

                    <VStack gap="space-4">
                        <Heading size="small">Auto-instrumentering (ukfangede feil)</Heading>
                        <HStack gap="space-4" wrap>
                            <Button variant="danger" size="small" onClick={handleUncaughtException}>
                                uncaught exception (krasjer siden)
                            </Button>
                            <Button variant="secondary" size="small" onClick={handleUnhandledRejection}>
                                uncaught promise rejection
                            </Button>
                        </HStack>
                    </VStack>

                    {log.length > 0 && (
                        <Box background="neutral-soft" padding="space-4" borderRadius="4">
                            <VStack gap="space-2">
                                <Heading size="small">Logg</Heading>
                                {log.map((entry, i) => (
                                    <BodyShort key={i} size="small" as="code">
                                        {entry}
                                    </BodyShort>
                                ))}
                            </VStack>
                        </Box>
                    )}
                </VStack>
            </Page.Block>
        </Page>
    );
};

export default ApmTestPage;
