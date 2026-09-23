import {
    BekreftOpphorVedMaksdatoOppgavetypeDataDto,
    BrukerdialogOppgaveDto,
    SøkYtelseOppgavetypeDataDto,
} from '@navikt/ung-brukerdialog-api';
import { ISODate } from '@sif/utils';

import { OpphorVedMaksdatoOppgave, ParsedOppgavetype, SøkYtelseOppgave } from '../../../types/Oppgave';
import { getOppgaveBaseProps } from './oppgaveBase';
import { parseSvarPåVarselRespons } from './oppgaveRespons';

export const parseSøkYtelseOppgave = (oppgave: BrukerdialogOppgaveDto): SøkYtelseOppgave => {
    const { fomDato } = oppgave.oppgavetypeData as SøkYtelseOppgavetypeDataDto;
    return {
        ...getOppgaveBaseProps(oppgave),
        parsedOppgavetype: ParsedOppgavetype.SØK_YTELSE,
        oppgavetypeData: {
            fomDato: fomDato as ISODate,
        },
    };
};

export const parseOpphørVedMaksdatoOppgave = (oppgave: BrukerdialogOppgaveDto): OpphorVedMaksdatoOppgave => {
    const { maxDato, sluttdato } = oppgave.oppgavetypeData as BekreftOpphorVedMaksdatoOppgavetypeDataDto;
    return {
        ...getOppgaveBaseProps(oppgave),
        parsedOppgavetype: ParsedOppgavetype.BEKREFT_OPPHOR_VED_MAKSDATO,
        oppgavetypeData: {
            sluttdato: sluttdato as ISODate,
            maksdato: maxDato as ISODate,
        },
        respons: parseSvarPåVarselRespons(oppgave.respons),
    };
};
