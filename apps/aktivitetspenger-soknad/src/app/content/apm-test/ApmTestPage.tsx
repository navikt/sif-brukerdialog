import { appLogger } from '@sif/apm';
import { Alert, BodyShort, Box, Button, Heading, HStack, Page, VStack } from '@navikt/ds-react';
import { useState } from 'react';

import { AppText, useAppIntl } from '../../i18n';

/**
 * Kun tilgjengelig i dev (ENV !== 'production').
 * Brukes til å generere testdata for Grafana APM-alerts.
 */
const ApmTestPage = () => {
    const [log, setLog] = useState<string[]>([]);
    const { text } = useAppIntl();

    const addLog = (msg: string) => setLog((prev) => [`${new Date().toISOString()} — ${msg}`, ...prev]);

    const handleLogInfo = () => {
        appLogger.logInfo('Test: appLogger.logInfo');
        addLog(text('page.apmTest.logg.logInfoSendt'));
    };

    const handleLogError = () => {
        appLogger.logError('Test: appLogger.logError');
        addLog(text('page.apmTest.logg.logErrorSendt'));
    };

    const handleLogException = () => {
        try {
            throw new Error('Test: appLogger.logException via try/catch');
        } catch (e) {
            appLogger.logException(e, { source: 'ApmTestPage', type: 'caught' });
            addLog(text('page.apmTest.logg.logExceptionSendt'));
        }
    };

    const handleUncaughtException = () => {
        addLog(text('page.apmTest.logg.uncaughtException'));
        setTimeout(() => {
            throw new Error('Test: uncaught exception — auto-instrumentering');
        }, 100);
    };

    const handleUnhandledRejection = () => {
        addLog(text('page.apmTest.logg.uncaughtPromiseRejection'));
        Promise.reject(new Error('Test: unhandled promise rejection — auto-instrumentering'));
    };

    return (
        <Page>
            <Page.Block as="main" width="text" gutters>
                <VStack gap="space-8" paddingBlock="space-8">
                    <Alert variant="warning">
                        <AppText id="page.apmTest.advarsel" />
                    </Alert>

                    <Heading size="large">
                        <AppText id="page.apmTest.tittel" />
                    </Heading>

                    <VStack gap="space-4">
                        <Heading size="small">
                            <AppText id="page.apmTest.appLogger.tittel" />
                        </Heading>
                        <HStack gap="space-4" wrap>
                            <Button variant="secondary" size="small" onClick={handleLogInfo}>
                                <AppText id="page.apmTest.appLogger.logInfo" />
                            </Button>
                            <Button variant="secondary" size="small" onClick={handleLogError}>
                                <AppText id="page.apmTest.appLogger.logError" />
                            </Button>
                            <Button variant="secondary" size="small" onClick={handleLogException}>
                                <AppText id="page.apmTest.appLogger.logException" />
                            </Button>
                        </HStack>
                    </VStack>

                    <VStack gap="space-4">
                        <Heading size="small">
                            <AppText id="page.apmTest.autoInstrumentering.tittel" />
                        </Heading>
                        <HStack gap="space-4" wrap>
                            <Button variant="danger" size="small" onClick={handleUncaughtException}>
                                <AppText id="page.apmTest.autoInstrumentering.uncaughtException" />
                            </Button>
                            <Button variant="secondary" size="small" onClick={handleUnhandledRejection}>
                                <AppText id="page.apmTest.autoInstrumentering.uncaughtPromiseRejection" />
                            </Button>
                        </HStack>
                    </VStack>

                    {log.length > 0 && (
                        <Box background="neutral-soft" padding="space-4" borderRadius="4">
                            <VStack gap="space-2">
                                <Heading size="small">
                                    <AppText id="page.apmTest.logg.tittel" />
                                </Heading>
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
