import { OppgaveResponsDto, RapportertInntektDto, SvarPåVarselDto } from '@navikt/ung-brukerdialog-api';

import { RapportertInntektRespons, SvarPåVarselRespons } from '../../../types/Oppgave';

const erSvarPåVarsel = (respons: OppgaveResponsDto): respons is OppgaveResponsDto & SvarPåVarselDto =>
    respons.type === 'VARSEL_SVAR';

const erRapportertInntekt = (respons: OppgaveResponsDto): respons is OppgaveResponsDto & RapportertInntektDto =>
    respons.type === 'RAPPORTERT_INNTEKT';

export const parseSvarPåVarselRespons = (respons?: OppgaveResponsDto): SvarPåVarselRespons | undefined => {
    if (!respons || !erSvarPåVarsel(respons)) {
        return undefined;
    }
    return {
        type: 'VARSEL_SVAR',
        harUttalelse: respons.harUttalelse,
        uttalelseFraBruker: respons.uttalelseFraBruker,
    };
};

export const parseRapportertInntektRespons = (respons?: OppgaveResponsDto): RapportertInntektRespons | undefined => {
    if (!respons || !erRapportertInntekt(respons)) {
        return undefined;
    }
    return {
        type: 'RAPPORTERT_INNTEKT',
        arbeidstakerOgFrilansInntekt: respons.arbeidstakerOgFrilansInntekt,
        fraOgMed: respons.fraOgMed,
        tilOgMed: respons.tilOgMed,
    };
};
