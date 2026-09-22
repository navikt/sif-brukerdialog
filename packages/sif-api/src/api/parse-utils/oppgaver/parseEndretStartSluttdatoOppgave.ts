import { ISODate } from '@sif/utils';
import { BrukerdialogOppgaveDto, EndretSluttdatoDataDto, EndretStartdatoDataDto } from '@navikt/ung-brukerdialog-api';

import {
    EndretSluttdatoOppgave,
    EndretStartdatoOppgave,
    MeldtUtOppgave,
    ParsedOppgavetype,
} from '../../../types/Oppgave';
import { getOppgaveBaseProps } from './oppgaveBase';
import { parseSvarPåVarselRespons } from './oppgaveRespons';

export const lagEndretStartdatoOppgave = (
    oppgave: BrukerdialogOppgaveDto,
    nyStartdato: ISODate,
    forrigeStartdato: ISODate,
): EndretStartdatoOppgave => ({
    ...getOppgaveBaseProps(oppgave),
    parsedOppgavetype: ParsedOppgavetype.BEKREFT_ENDRET_STARTDATO,
    oppgavetypeData: {
        forrigeStartdato,
        nyStartdato,
    },
    respons: parseSvarPåVarselRespons(oppgave.respons),
});

/**
 * Uten en forrige sluttdato er det ikke en endring, men at deltakeren er meldt ut av programmet.
 */
export const lagEndretSluttdatoOppgave = (
    oppgave: BrukerdialogOppgaveDto,
    nySluttdato: ISODate,
    forrigeSluttdato: ISODate | undefined,
): EndretSluttdatoOppgave | MeldtUtOppgave => {
    if (forrigeSluttdato) {
        return {
            ...getOppgaveBaseProps(oppgave),
            parsedOppgavetype: ParsedOppgavetype.BEKREFT_ENDRET_SLUTTDATO,
            oppgavetypeData: {
                forrigeSluttdato,
                nySluttdato,
            },
            respons: parseSvarPåVarselRespons(oppgave.respons),
        };
    }
    return {
        ...getOppgaveBaseProps(oppgave),
        parsedOppgavetype: ParsedOppgavetype.BEKREFT_MELDT_UT,
        oppgavetypeData: {
            sluttdato: nySluttdato,
        },
        respons: parseSvarPåVarselRespons(oppgave.respons),
    };
};

export const parseEndretStartdatoOppgave = (oppgave: BrukerdialogOppgaveDto): EndretStartdatoOppgave => {
    const { forrigeStartdato, nyStartdato } = oppgave.oppgavetypeData as EndretStartdatoDataDto;
    return lagEndretStartdatoOppgave(oppgave, nyStartdato as ISODate, forrigeStartdato as ISODate);
};

export const parseEndretSluttdatoOppgave = (
    oppgave: BrukerdialogOppgaveDto,
): EndretSluttdatoOppgave | MeldtUtOppgave => {
    const { forrigeSluttdato, nySluttdato } = oppgave.oppgavetypeData as EndretSluttdatoDataDto;
    return lagEndretSluttdatoOppgave(oppgave, nySluttdato as ISODate, forrigeSluttdato as ISODate | undefined);
};
