import { captureException, captureMessage } from '@sif/apm';
import { Alert, BodyShort, Button, Heading, HStack, VStack } from '@navikt/ds-react';
import { useState } from 'react';

/**
 * Kun tilgjengelig i dev (ENV !== 'production').
 * Brukes til å generere testdata for Grafana APM-alerts.
 */
const ApmTestPage = () => {
    const [log, setLog] = useState<string[]>([]);

    const addLog = (msg: string) => setLog((prev) => [`${new Date().toISOString()} — ${msg}`, ...prev]);

    const handleCaptureException = () => {
        try {
            throw new Error('Test: captureException via try/catch');
        } catch (e) {
            captureException(e, { context: { source: 'ApmTestPage', type: 'caught' } });
            addLog('captureException sendt');
        }
    };

    const handleCaptureMessage = () => {
        captureMessage('Test: captureMessage med severity error', 'error');
        addLog('captureMessage(error) sendt');
    };

    const handleUncaughtException = () => {
        addLog('Kaster ukfanget exception (siden krasjer — reload nødvendig)');
        setTimeout(() => {
            throw new Error('Test: ukfanget exception — auto-instrumentering');
        }, 100);
    };

    const handleUnhandledRejection = () => {
        addLog('Kaster ukfanget promise rejection');
        Promise.reject(new Error('Test: unhandled promise rejection — auto-instrumentering'));
    };

    const handleApiError = () => {
        captureException(new Error('Test: simulert API-feil — HTTP 500'), {
            context: { source: 'ApmTestPage', type: 'api-error', httpStatus: 500 },
        });
        addLog('Simulert API-feil (HTTP 500) sendt');
    };

    return (
        <VStack gap="8" style={{ maxWidth: '600px', margin: '2rem auto', padding: '0 1rem' }}>
            <Alert variant="warning">
                Denne siden sender reelle APM-hendelser til Grafana. Kun ment for testing av alerts i dev-miljø.
            </Alert>

            <Heading size="large">APM Test</Heading>

            <VStack gap="4">
                <Heading size="small">Fangede feil (captureException / captureMessage)</Heading>
                <HStack gap="3" wrap>
                    <Button variant="secondary" size="small" onClick={handleCaptureException}>
                        captureException
                    </Button>
                    <Button variant="secondary" size="small" onClick={handleCaptureMessage}>
                        captureMessage (error)
                    </Button>
                    <Button variant="secondary" size="small" onClick={handleApiError}>
                        Simulert API 500
                    </Button>
                </HStack>
            </VStack>

            <VStack gap="4">
                <Heading size="small">Auto-instrumentering (ukfangede feil)</Heading>
                <HStack gap="3" wrap>
                    <Button variant="danger" size="small" onClick={handleUncaughtException}>
                        Ukfanget exception (krasjer siden)
                    </Button>
                    <Button variant="secondary" size="small" onClick={handleUnhandledRejection}>
                        Ukfanget promise rejection
                    </Button>
                </HStack>
            </VStack>

            {log.length > 0 && (
                <VStack gap="2">
                    <Heading size="small">Logg</Heading>
                    {log.map((entry, i) => (
                        <BodyShort key={i} size="small" style={{ fontFamily: 'monospace' }}>
                            {entry}
                        </BodyShort>
                    ))}
                </VStack>
            )}
        </VStack>
    );
};

export default ApmTestPage;
