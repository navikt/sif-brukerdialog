import {
    BostedsvilkårIkkeOppfyltÅrsak,
    OppgaveStatus,
    OppgaveType,
    OppgaveYtelsetype,
} from '@navikt/ung-brukerdialog-api';
import { BostedVilkårOpphørOppgave, ParsedOppgavetype } from '@sif/api/ung-brukerdialog';
import { dateToISODate } from '@sif/utils';
import dayjs from 'dayjs';

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
