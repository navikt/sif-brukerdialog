import { AktivitetVilkårOppgave, ParsedOppgavetype } from '@sif/api/ung-brukerdialog';
import {
    AktivitetsavklaringKildeType,
    AktivitetsvilkåretIkkeOppfyltÅrsak,
    OppgaveStatus,
    OppgaveType,
    OppgaveYtelsetype,
} from '@sif/ung-brukerdialog-api';
import { dateToISODate } from '@sif/utils';
import dayjs from 'dayjs';

/** Alle årsaker og kilder skal alltid være med i scenario-listene. */
export const AKTIVITET_ÅRSAK_SCENARIO_OPTIONS = Object.values(AktivitetsvilkåretIkkeOppfyltÅrsak);
export const AKTIVITET_KILDE_SCENARIO_OPTIONS = Object.values(AktivitetsavklaringKildeType);

/** Varselteksten kommer ferdig formulert fra backend. */
const mockVarseltekst = 'Mock av varseltekst fra backend for aktivitetsvilkåret.';

export const lagAktivitetOppgaveMedÅrsak = (
    base: AktivitetVilkårOppgave,
    årsak: AktivitetsvilkåretIkkeOppfyltÅrsak,
    kilde: AktivitetsavklaringKildeType,
): AktivitetVilkårOppgave => ({
    ...base,
    oppgavetypeData: {
        ...base.oppgavetypeData,
        ikkeOppfyltÅrsak: årsak,
        kilde,
        kildeFritekst:
            kilde === AktivitetsavklaringKildeType.ANNET
                ? 'Vi har fått informasjon fra din XXX.\n\nInformasjonen kom via et brev vi mottok.'
                : undefined,
        ikkeOppfyltÅrsakFritekstbeskrivelse:
            årsak === AktivitetsvilkåretIkkeOppfyltÅrsak.ANNET
                ? 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
                : undefined,
    },
});

// ─── Mocks ───────────────────────────────────────────────────────────────────

export const mockAktivitetVilkårAKT: AktivitetVilkårOppgave = {
    oppgaveReferanse: '3c9e1f2a-7b4d-4e6a-9c1b-2d3e4f5a6b7c',
    oppgavetype: OppgaveType.BEKREFT_AKTIVITET,
    parsedOppgavetype: ParsedOppgavetype.BEKREFT_AKTIVITET,
    status: OppgaveStatus.ULØST,
    opprettetDato: dayjs().subtract(1, 'days').toDate(),
    frist: dateToISODate(dayjs().add(14, 'days')),
    ytelsetype: OppgaveYtelsetype.AKTIVITETSPENGER,
    oppgavetypeData: {
        ikkeOppfyltÅrsak: AktivitetsvilkåretIkkeOppfyltÅrsak.ANNET,
        kilde: AktivitetsavklaringKildeType.NAV,
        varseltekst: mockVarseltekst,
    },
};

export const mockAktivitetVilkårBesvartAKT: AktivitetVilkårOppgave = {
    ...mockAktivitetVilkårAKT,
    respons: { type: 'VARSEL_SVAR', harUttalelse: false },
    status: OppgaveStatus.LØST,
    løstDato: dayjs().toDate(),
};
