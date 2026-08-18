import {
    BostedsvilkårIkkeOppfyltÅrsak,
    OppgaveStatus,
    OppgaveType,
    OppgaveYtelsetype,
} from '@navikt/ung-brukerdialog-api';
import { BostedVilkårPeriodeOppgave, ParsedOppgavetype } from '@sif/api/ung-brukerdialog';
import { dateToISODate } from '@sif/utils';
import dayjs from 'dayjs';

export const BOSTED_ÅRSAK_SCENARIO_OPTIONS: BostedsvilkårIkkeOppfyltÅrsak[] = [
    BostedsvilkårIkkeOppfyltÅrsak.IKKE_BOSATTADRESSE_I_TRONDHEIM,
    BostedsvilkårIkkeOppfyltÅrsak.IKKE_BOSTEDSADRESSE_OG_IKKE_FOLKEREGISTRERT_I_TRONDHEIM,
    BostedsvilkårIkkeOppfyltÅrsak.STUDIE_ELLER_ARBEIDSSTED_UTENFOR_TRONDHEIM,
    BostedsvilkårIkkeOppfyltÅrsak.ANNET,
];

export const lagOppgaveMedÅrsak = (
    base: BostedVilkårPeriodeOppgave,
    årsak: BostedsvilkårIkkeOppfyltÅrsak,
): BostedVilkårPeriodeOppgave => ({
    ...base,
    oppgavetypeData: {
        ...base.oppgavetypeData,
        ikkeOppfyltÅrsak: årsak,
        ikkeOppfyltÅrsakFritekstbeskrivelse:
            årsak === BostedsvilkårIkkeOppfyltÅrsak.ANNET
                ? 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
                : undefined,
    },
});

// ─── Mocks ───────────────────────────────────────────────────────────────────

export const mockBostedVilkårAKT: BostedVilkårPeriodeOppgave = {
    oppgaveReferanse: '3d3e98b5-48e7-42c6-9fc1-e0f78022307f',
    oppgavetype: OppgaveType.BEKREFT_BOSTED,
    parsedOppgavetype: ParsedOppgavetype.BEKREFT_BOSTED,
    status: OppgaveStatus.ULØST,
    opprettetDato: dayjs().subtract(1, 'days').toDate(),
    frist: dateToISODate(dayjs().add(14, 'days')),
    ytelsetype: OppgaveYtelsetype.AKTIVITETSPENGER,
    oppgavetypeData: {
        ikkeOppfyltÅrsak: BostedsvilkårIkkeOppfyltÅrsak.IKKE_BOSATTADRESSE_I_TRONDHEIM,
        ikkeOppfyltÅrsakFritekstbeskrivelse: undefined,
        erBosattITrondheim: false,
        periode: {
            from: dateToISODate(dayjs().subtract(1, 'month')),
            to: dateToISODate(dayjs().add(1, 'month')),
        },
    },
};

export const mockBostedVilkårBesvartAKT: BostedVilkårPeriodeOppgave = {
    ...mockBostedVilkårAKT,
    respons: { type: 'VARSEL_SVAR', harUttalelse: false },
    status: OppgaveStatus.LØST,
    løstDato: dayjs().toDate(),
};
