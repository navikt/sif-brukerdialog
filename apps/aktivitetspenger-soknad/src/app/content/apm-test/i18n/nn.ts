import { apmTestPageMessages_nb } from './nb';

export const apmTestPageMessages_nn: Record<keyof typeof apmTestPageMessages_nb, string> = {
    'page.apmTest.advarsel':
        'Denne sida sender reelle APM-hendingar til Grafana. Berre meint for testing av varsel i dev-miljøet.',
    'page.apmTest.tittel': 'APM-test',
    'page.apmTest.appLogger.tittel': 'appLogger (@sif/apm)',
    'page.apmTest.appLogger.logInfo': 'logInfo',
    'page.apmTest.appLogger.logError': 'logError',
    'page.apmTest.appLogger.logException': 'logException',
    'page.apmTest.autoInstrumentering.tittel': 'Autoinstrumentering (ufanga feil)',
    'page.apmTest.autoInstrumentering.uncaughtException': 'uncaught exception (sida krasjar)',
    'page.apmTest.autoInstrumentering.uncaughtPromiseRejection': 'uncaught promise rejection',
    'page.apmTest.logg.tittel': 'Logg',
    'page.apmTest.logg.logInfoSendt': 'logInfo sendt',
    'page.apmTest.logg.logErrorSendt': 'logError sendt',
    'page.apmTest.logg.logExceptionSendt': 'logException sendt',
    'page.apmTest.logg.uncaughtException': 'Kastar uncaught exception (sida krasjar – må lastast på nytt)',
    'page.apmTest.logg.uncaughtPromiseRejection': 'Kastar uncaught promise rejection',
};
