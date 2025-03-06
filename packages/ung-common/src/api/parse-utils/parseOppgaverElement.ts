import { ISODateToDate } from '@navikt/sif-common-utils';
import {
    EndretSluttdatoOppgavetypeDataDto,
    EndretStartdatoOppgavetypeDataDto,
    OppgaveStatus,
    Oppgavetype,
    zDeltakelseOpplysningDto,
} from '@navikt/ung-deltakelse-opplyser-api';
import { z } from 'zod';
import { Oppgave } from '../../types';
import dayjs from 'dayjs';

const zOppgaveElementSchema = zDeltakelseOpplysningDto.shape.oppgaver.element;
type zOppgaveElement = z.infer<typeof zOppgaveElementSchema>;

const getOppgaveStatusEnum = (status: string): OppgaveStatus => {
    switch (status) {
        case 'LØST':
            return OppgaveStatus.LØST;
        case 'ULØST':
            return OppgaveStatus.ULØST;
        default:
            throw new Error(`Ukjent oppgavestatus: ${status}`);
    }
};

export const parseOppgaverElement = (oppgaver: zOppgaveElement[]): Oppgave[] => {
    const parsedOppgaver: Oppgave[] = [];
    oppgaver.forEach((oppgave) => {
        switch (oppgave.oppgavetype) {
            case Oppgavetype.BEKREFT_ENDRET_STARTDATO:
                const endreStartdatoData = oppgave.oppgavetypeData as EndretStartdatoOppgavetypeDataDto;
                const endretStartdatoOppgave: Oppgave = {
                    id: oppgave.id,
                    status: getOppgaveStatusEnum(oppgave.status),
                    løstDato: oppgave.løstDato ? ISODateToDate(oppgave.løstDato) : undefined,
                    opprettetDato: ISODateToDate(oppgave.opprettetDato),
                    oppgavetype: Oppgavetype.BEKREFT_ENDRET_STARTDATO,
                    svarfrist: dayjs(ISODateToDate(oppgave.opprettetDato)).add(2, 'weeks').toDate(),
                    oppgavetypeData: {
                        nyStartdato: ISODateToDate(endreStartdatoData.nyStartdato),
                        veilederRef: endreStartdatoData.veilederRef,
                        meldingFraVeileder: endreStartdatoData.meldingFraVeileder,
                    },
                };
                parsedOppgaver.push(endretStartdatoOppgave);
                return;
            case Oppgavetype.BEKREFT_ENDRET_SLUTTDATO:
                const endreSluttdatoData = oppgave.oppgavetypeData as EndretSluttdatoOppgavetypeDataDto;
                const endretSluttdatoOppgave: Oppgave = {
                    id: oppgave.id,
                    status: getOppgaveStatusEnum(oppgave.status),
                    løstDato: oppgave.løstDato ? ISODateToDate(oppgave.løstDato) : undefined,
                    opprettetDato: ISODateToDate(oppgave.opprettetDato),
                    svarfrist: dayjs(ISODateToDate(oppgave.opprettetDato)).add(2, 'weeks').toDate(),
                    oppgavetype: Oppgavetype.BEKREFT_ENDRET_SLUTTDATO,
                    oppgavetypeData: {
                        nySluttdato: ISODateToDate(endreSluttdatoData.nySluttdato),
                        veilederRef: endreSluttdatoData.veilederRef,
                        meldingFraVeileder: endreSluttdatoData.meldingFraVeileder,
                    },
                };
                parsedOppgaver.push(endretSluttdatoOppgave);
        }
    });
    return parsedOppgaver;
};
