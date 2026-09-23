import {
    BrukerdialogOppgaveDto,
    InntektsrapporteringOppgavetypeDataDto,
    KontrollerRegisterinntektOppgavetypeDataDto,
} from '@navikt/ung-brukerdialog-api';
import { ISODate } from '@sif/utils';

import { AvvikRegisterinntektOppgave, ParsedOppgavetype, RapporterInntektOppgave } from '../../../types/Oppgave';
import { getOppgaveBaseProps } from './oppgaveBase';
import { parseRapportertInntektRespons, parseSvarPåVarselRespons } from './oppgaveRespons';

export const parseAvvikRegisterinntektOppgave = (oppgave: BrukerdialogOppgaveDto): AvvikRegisterinntektOppgave => {
    const oppgavetypeData = oppgave.oppgavetypeData as KontrollerRegisterinntektOppgavetypeDataDto;
    return {
        ...getOppgaveBaseProps(oppgave),
        parsedOppgavetype: ParsedOppgavetype.BEKREFT_AVVIK_REGISTERINNTEKT,
        oppgavetypeData: {
            ...oppgavetypeData,
            fraOgMed: oppgavetypeData.fraOgMed as ISODate,
            tilOgMed: oppgavetypeData.tilOgMed as ISODate,
            gjelderDelerAvMåned: oppgavetypeData.gjelderDelerAvMåned,
        },
        respons: parseSvarPåVarselRespons(oppgave.respons),
    };
};

export const parseRapporterInntektOppgave = (oppgave: BrukerdialogOppgaveDto): RapporterInntektOppgave => {
    const oppgavetypeData = oppgave.oppgavetypeData as InntektsrapporteringOppgavetypeDataDto;
    return {
        ...getOppgaveBaseProps(oppgave),
        parsedOppgavetype: ParsedOppgavetype.RAPPORTER_INNTEKT,
        oppgavetypeData: {
            fraOgMed: oppgavetypeData.fraOgMed as ISODate,
            tilOgMed: oppgavetypeData.tilOgMed as ISODate,
            gjelderDelerAvMåned: oppgavetypeData.gjelderDelerAvMåned,
        },
        respons: parseRapportertInntektRespons(oppgave.respons),
    };
};
