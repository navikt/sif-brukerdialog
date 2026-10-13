import { OppgaveStatus } from '@navikt/ung-brukerdialog-api';
import { useAnalyticsInstance } from '@sif/analytics';
import { ParsedOppgavetype } from '@sif/api/ung-brukerdialog';

/**
 * Egne hendelser for oppgaver. Nav-taksonomiens skjema-hendelser brukes ikke, siden en oppgave ikke er et skjemaforløp
 * og hendelsene ellers ville blandes med søknadens skjema-hendelser. Brukes i Metabase – oppdater spørringene ved endring.
 */
export enum OppgaveAnalyticsEvent {
    vist = 'oppgave vist',
    besvart = 'oppgave besvart',
    avbrutt = 'oppgave avbrutt',
}

/** Ekstra metadata ved besvart oppgave. Logg aldri fritekst fra bruker. */
export type OppgaveBesvartMetadata = {
    harUttalelse?: boolean;
};

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
        logOppgaveBesvart: (oppgavetype: ParsedOppgavetype, metadata?: OppgaveBesvartMetadata) =>
            logOppgave(OppgaveAnalyticsEvent.besvart, oppgavetype, metadata),
        logOppgaveAvbrutt: (oppgavetype: ParsedOppgavetype) => logOppgave(OppgaveAnalyticsEvent.avbrutt, oppgavetype),
    };
};
