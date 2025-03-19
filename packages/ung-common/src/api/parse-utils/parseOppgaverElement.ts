import { ISODateToDate } from '@navikt/sif-common-utils';
import {
    EndretSluttdatoOppgavetypeDataDto,
    EndretStartdatoOppgavetypeDataDto,
    KorrigertInntektOppgavetypeDataDto,
    OppgaveStatus,
    Oppgavetype,
    zDeltakelseOpplysningDto,
} from '@navikt/ung-deltakelse-opplyser-api';
import dayjs from 'dayjs';
import { z } from 'zod';
import { EndreSluttdatoOppgave, EndreStartdatoOppgave, KorrigertInntektOppgave, Oppgave } from '../../types';

const zOppgaveElementSchema = zDeltakelseOpplysningDto.shape.oppgaver.element;
type zOppgaveElement = z.infer<typeof zOppgaveElementSchema>;

const getOppgaveStatusEnum = (status: string): OppgaveStatus => {
    switch (status) {
        case 'LØST':
            return OppgaveStatus.LØST;
        case 'ULØST':
            return OppgaveStatus.ULØST;
        case 'KANSELLERT':
            return OppgaveStatus.KANSELLERT;
        default:
            throw new Error(`Ukjent oppgavestatus: ${status}`);
    }
};

export const parseOppgaverElement = (oppgaver: zOppgaveElement[]): Oppgave[] => {
    const parsedOppgaver: Oppgave[] = [];
    oppgaver.forEach((oppgave) => {
        const løstDato = oppgave.løstDato ? dayjs.utc(oppgave.løstDato).toDate() : undefined;
        const opprettetDato = dayjs.utc(oppgave.opprettetDato).toDate();
        const svarfrist = dayjs.utc(oppgave.opprettetDato).add(2, 'weeks').toDate();

        switch (oppgave.oppgavetype) {
            case Oppgavetype.BEKREFT_ENDRET_STARTDATO:
                const endreStartdatoData = oppgave.oppgavetypeData as EndretStartdatoOppgavetypeDataDto;
                const endretStartdatoOppgave: EndreStartdatoOppgave = {
                    id: oppgave.id,
                    status: getOppgaveStatusEnum(oppgave.status),
                    opprettetDato,
                    svarfrist,
                    løstDato,
                    oppgavetype: Oppgavetype.BEKREFT_ENDRET_STARTDATO,
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
                const endretSluttdatoOppgave: EndreSluttdatoOppgave = {
                    id: oppgave.id,
                    status: getOppgaveStatusEnum(oppgave.status),
                    opprettetDato,
                    svarfrist,
                    løstDato,
                    oppgavetype: Oppgavetype.BEKREFT_ENDRET_SLUTTDATO,
                    oppgavetypeData: {
                        nySluttdato: ISODateToDate(endreSluttdatoData.nySluttdato),
                        veilederRef: endreSluttdatoData.veilederRef,
                        meldingFraVeileder: endreSluttdatoData.meldingFraVeileder,
                    },
                };
                parsedOppgaver.push(endretSluttdatoOppgave);
                return;
            case Oppgavetype.BEKREFT_KORRIGERT_INNTEKT:
                const korrigertInntektData = oppgave.oppgavetypeData as KorrigertInntektOppgavetypeDataDto;
                const korrigertInntektOppgave: KorrigertInntektOppgave = {
                    id: oppgave.id,
                    status: getOppgaveStatusEnum(oppgave.status),
                    opprettetDato,
                    svarfrist,
                    løstDato,
                    oppgavetype: Oppgavetype.BEKREFT_KORRIGERT_INNTEKT,
                    oppgavetypeData: {
                        inntektFraAinntekt: {
                            arbeidsgivere: korrigertInntektData.inntektFraAinntekt.arbeidsgivere,
                            ytelser: korrigertInntektData.inntektFraAinntekt.ytelser,
                        },
                        periodeForInntekt: {
                            fraOgMed: ISODateToDate(korrigertInntektData.periodeForInntekt.fraOgMed),
                            tilOgMed: ISODateToDate(korrigertInntektData.periodeForInntekt.tilOgMed),
                        },
                        inntektFraDeltaker: korrigertInntektData.inntektFraDeltaker,
                    },
                };
                parsedOppgaver.push(korrigertInntektOppgave);
                return;
        }
    });
    return parsedOppgaver;
};
