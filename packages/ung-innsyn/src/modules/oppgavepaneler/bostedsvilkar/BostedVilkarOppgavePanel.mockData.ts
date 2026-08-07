import {
    BostedsvilkårIkkeOppfyltÅrsak,
    OppgaveStatus,
    OppgaveType,
    OppgaveYtelsetype,
} from '@navikt/ung-brukerdialog-api';
import { BostedVilkårOppgave, ParsedOppgavetype } from '@sif/api/ung-brukerdialog';
import { dateToISODate } from '@sif/utils';
import dayjs from 'dayjs';

export const mockBostedVilkårAKT: BostedVilkårOppgave = {
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

export const mockBostedVilkårBesvartAKT: BostedVilkårOppgave = {
    ...mockBostedVilkårAKT,
    respons: { type: 'VARSEL_SVAR', harUttalelse: false },
    status: OppgaveStatus.LØST,
    løstDato: dayjs().toDate(),
};
