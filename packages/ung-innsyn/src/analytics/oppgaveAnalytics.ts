import { OppgaveStatus } from '@navikt/ung-brukerdialog-api';
import { useAnalyticsInstance } from '@sif/analytics';
import { ParsedOppgavetype } from '@sif/api/ung-brukerdialog';

/** Felles hendelsesnavn for oppgaver. Brukes i Metabase – oppdater spørringene der ved endring. */
export enum OppgaveAnalyticsEvent {
    vist = 'skjema åpnet',
    besvart = 'skjema fullført',
    kansellert = 'oppgave kansellert',
}

export const useOppgaveAnalytics = () => {
    const { logCustom } = useAnalyticsInstance();
    const logOppgave = (
        event: OppgaveAnalyticsEvent,
        oppgavetype: ParsedOppgavetype,
        metadata?: Record<string, unknown>,
    ) => logCustom(event, { oppgavetype, ...metadata });

    return {
        logOppgaveVist: (oppgavetype: ParsedOppgavetype, oppgavestatus: OppgaveStatus) =>
            logOppgave(OppgaveAnalyticsEvent.vist, oppgavetype, { oppgavestatus }),
        logOppgaveBesvart: (oppgavetype: ParsedOppgavetype) => logOppgave(OppgaveAnalyticsEvent.besvart, oppgavetype),
        logOppgaveKansellert: (oppgavetype: ParsedOppgavetype) =>
            logOppgave(OppgaveAnalyticsEvent.kansellert, oppgavetype),
    };
};
