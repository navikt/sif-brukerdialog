import { SlettDeltakerÅrsak } from '../types/SlettDeltakerÅrsaker';
import { Utmeldingsårsak } from '../types/Utmeldingsårsaker';
import { AppHendelse, useAnalyticsInstance } from './analytics';

// Map event to payload shape for type safety.
export type AppEventPayloads = {
    [AppHendelse.startdatoEndret]: { endring: number };
    [AppHendelse.sluttdatoSattFørsteGang]: { årsak: Utmeldingsårsak };
    [AppHendelse.aktivDeltakerSlettet]: { årsak: SlettDeltakerÅrsak };
    [AppHendelse.sluttdatoEndret]: void;
    [AppHendelse.deltakerSlettet]: void;
    [AppHendelse.deltakerRegistrert]: void;
    [AppHendelse.søkerOppDeltaker]: void;
    [AppHendelse.finnDeltakerIkkeTilgang]: void;
    [AppHendelse.finnDeltakerIkkeFunnet]: void;
    [AppHendelse.finnDeltakerApiFeil]: void;
    [AppHendelse.registrertDeltakerFunnet]: void;
    [AppHendelse.nyDeltakerFunnet]: void;
    [AppHendelse.togglerDarkMode]: { mode: boolean };
    [AppHendelse.viserInformasjon]: void;
};

export function useAppEventLogger() {
    const { logAppHendelse } = useAnalyticsInstance();
    function log<E extends keyof AppEventPayloads>(event: E, payload?: AppEventPayloads[E]) {
        // payload may be void for many events; cast safe for underlying logger
        return logAppHendelse(event, payload as any);
    }
    return { log };
}
