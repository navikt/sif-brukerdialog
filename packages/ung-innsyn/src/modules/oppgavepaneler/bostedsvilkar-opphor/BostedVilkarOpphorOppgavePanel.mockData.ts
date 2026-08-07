import {
    BostedsvilkårIkkeOppfyltÅrsak,
    OppgaveStatus,
    OppgaveType,
    OppgaveYtelsetype,
} from '@navikt/ung-brukerdialog-api';
import { BostedVilkårOpphørOppgave, ParsedOppgavetype } from '@sif/api/ung-brukerdialog';
import { dateToISODate } from '@sif/utils';
import dayjs from 'dayjs';

// ─── Årsak-scenariovarianter ─────────────────────────────────────────────────

export type BostedOpphørÅrsakScenario = BostedsvilkårIkkeOppfyltÅrsak;

export const BOSTED_OPPHØR_ÅRSAK_SCENARIO_OPTIONS: BostedOpphørÅrsakScenario[] = [
    BostedsvilkårIkkeOppfyltÅrsak.IKKE_BOSATTADRESSE_I_TRONDHEIM,
    BostedsvilkårIkkeOppfyltÅrsak.IKKE_BOSTEDSADRESSE_OG_IKKE_FOLKEREGISTRERT_I_TRONDHEIM,
    BostedsvilkårIkkeOppfyltÅrsak.STUDIE_ELLER_ARBEIDSSTED_UTENFOR_TRONDHEIM,
    BostedsvilkårIkkeOppfyltÅrsak.ANNET,
];

export const lagOpphørOppgaveMedÅrsak = (
    base: BostedVilkårOpphørOppgave,
    årsak: BostedOpphørÅrsakScenario,
): BostedVilkårOpphørOppgave => ({
    ...base,
    oppgavetypeData: {
        ...base.oppgavetypeData,
        ikkeOppfyltÅrsak: årsak,
        ikkeOppfyltÅrsakFritekstbeskrivelse:
            årsak === BostedsvilkårIkkeOppfyltÅrsak.ANNET
                ? 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n\nSed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
                : undefined,
    },
});

// ─── Mocks ───────────────────────────────────────────────────────────────────

export const mockBostedVilkårOpphørAKT: BostedVilkårOpphørOppgave = {
    oppgaveReferanse: '3d3e98b5-48e7-42c6-9fc1-e0f78022307f',
    oppgavetype: OppgaveType.BEKREFT_BOSTED,
    parsedOppgavetype: ParsedOppgavetype.BEKREFT_BOSTED_OPPHØR,
    status: OppgaveStatus.ULØST,
    opprettetDato: dayjs().subtract(1, 'days').toDate(),
    frist: dateToISODate(dayjs().add(14, 'days')),
    ytelsetype: OppgaveYtelsetype.AKTIVITETSPENGER,
    oppgavetypeData: {
        ikkeOppfyltÅrsak: BostedsvilkårIkkeOppfyltÅrsak.ANNET,
        ikkeOppfyltÅrsakFritekstbeskrivelse:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n\nSed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        erBosattITrondheim: false,
        fom: dateToISODate(dayjs().subtract(1, 'month')),
    },
};

export const mockBostedVilkårOpphørBesvartAKT: BostedVilkårOpphørOppgave = {
    ...mockBostedVilkårOpphørAKT,
    respons: { type: 'VARSEL_SVAR', harUttalelse: false },
    status: OppgaveStatus.LØST,
    løstDato: dayjs().toDate(),
};
