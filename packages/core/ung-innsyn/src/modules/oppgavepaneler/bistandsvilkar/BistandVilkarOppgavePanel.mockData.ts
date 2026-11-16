import { BistandVilkårOppgave, ParsedOppgavetype } from '@sif/api/ung-brukerdialog';
import {
    BistandsavklaringKildeType,
    BistandsvilkårIkkeOppfyltÅrsak,
    OppgaveStatus,
    OppgaveType,
    OppgaveYtelsetype,
} from '@sif/ung-brukerdialog-api';
import { dateToISODate } from '@sif/utils';
import dayjs from 'dayjs';

/** Alle årsaker og kilder skal alltid være med i scenario-listene. */
export const BISTAND_ÅRSAK_SCENARIO_OPTIONS = Object.values(BistandsvilkårIkkeOppfyltÅrsak);
export const BISTAND_KILDE_SCENARIO_OPTIONS = Object.values(BistandsavklaringKildeType);

const bortfall = 'Det betyr at du fra 30. november 2026 ikke lenger får aktivitetspenger.';
const ikkeLengerBehovForHjelp = 'ikke lenger trenger hjelp fra Nav til å få jobb eller utdanning.';

/** Varselteksten kommer ferdig formulert fra backend (bekreft_bistand.hbs, opphør). */
const varseltekster = {
    IKKE_14A_VEDTAK:
        'Vi har fått opplysninger om at du fra 30. november 2026 ikke lenger har et vedtak fra Nav om behov for bistand til å komme i arbeid. Du må ha et slikt vedtak for å få aktivitetspenger.',
    KOMMET_I_UTDANNING: `Vi har fått opplysninger om at du har begynt på en utdanning og ${ikkeLengerBehovForHjelp} ${bortfall}`,
    KOMMET_I_ARBEID: `Vi har fått opplysninger om at du har begynt å jobbe og ${ikkeLengerBehovForHjelp} ${bortfall}`,
    ANNET: `Vi har fått opplysninger om at du ${ikkeLengerBehovForHjelp} ${bortfall}`,
    UDEFINERT: `Vi har fått opplysninger om at du ${ikkeLengerBehovForHjelp} ${bortfall}`,
} satisfies Record<BistandsvilkårIkkeOppfyltÅrsak, string>;

export const lagBistandOppgaveMedÅrsak = (
    base: BistandVilkårOppgave,
    årsak: BistandsvilkårIkkeOppfyltÅrsak,
    kilde: BistandsavklaringKildeType,
): BistandVilkårOppgave => ({
    ...base,
    oppgavetypeData: {
        ...base.oppgavetypeData,
        ikkeOppfyltÅrsak: årsak,
        varseltekst: varseltekster[årsak],
        kilde,
        kildeFritekst:
            kilde === BistandsavklaringKildeType.ANNET
                ? 'Vi har fått informasjon fra din XXX.\n\nInformasjonen kom via et brev vi mottok.'
                : undefined,
        ikkeOppfyltÅrsakFritekstbeskrivelse:
            årsak === BistandsvilkårIkkeOppfyltÅrsak.ANNET
                ? 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
                : undefined,
    },
});

// ─── Mocks ───────────────────────────────────────────────────────────────────

export const mockBistandVilkårAKT: BistandVilkårOppgave = {
    oppgaveReferanse: '216abccd-4306-4c50-878f-e7899104f053',
    oppgavetype: OppgaveType.BEKREFT_BISTAND,
    parsedOppgavetype: ParsedOppgavetype.BEKREFT_BISTAND,
    status: OppgaveStatus.ULØST,
    opprettetDato: dayjs().subtract(1, 'days').toDate(),
    frist: dateToISODate(dayjs().add(14, 'days')),
    ytelsetype: OppgaveYtelsetype.AKTIVITETSPENGER,
    oppgavetypeData: {
        ikkeOppfyltÅrsak: BistandsvilkårIkkeOppfyltÅrsak.KOMMET_I_ARBEID,
        kilde: BistandsavklaringKildeType.NAV,
        varseltekst: varseltekster.KOMMET_I_ARBEID,
    },
};

export const mockBistandVilkårBesvartAKT: BistandVilkårOppgave = {
    ...mockBistandVilkårAKT,
    respons: { type: 'VARSEL_SVAR', harUttalelse: false },
    status: OppgaveStatus.LØST,
    løstDato: dayjs().toDate(),
};
