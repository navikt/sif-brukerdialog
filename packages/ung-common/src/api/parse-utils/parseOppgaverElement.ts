import { ISODateToDate } from '@navikt/sif-common-utils';
import {
    EndretProgramperiodeDataDto,
    EndretSluttdatoOppgavetypeDataDto,
    EndretStartdatoOppgavetypeDataDto,
    KontrollerRegisterinntektOppgavetypeDataDto,
    OppgaveStatus,
    Oppgavetype,
    zDeltakelseOpplysningDto,
} from '@navikt/ung-deltakelse-opplyser-api';
import dayjs from 'dayjs';
import { z } from 'zod';
import {
    EndreSluttdatoOppgave,
    EndreStartdatoOppgave,
    EndretProgramperiodeOppgave,
    KorrigertInntektOppgave,
    Oppgave,
} from '../../types';

const zOppgaveElementSchema = zDeltakelseOpplysningDto.shape.oppgaver.element;
type zOppgaveElement = z.infer<typeof zOppgaveElementSchema>;

const getOppgaveStatusEnum = (status: string): OppgaveStatus => {
    switch (status) {
        case 'LØST':
            return OppgaveStatus.LØST;
        case 'ULØST':
            return OppgaveStatus.ULØST;
        case 'AVBRUTT':
            return OppgaveStatus.AVBRUTT;
        case 'UTLØPT':
            return OppgaveStatus.UTLØPT;
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
                    oppgaveReferanse: oppgave.oppgaveReferanse,
                    status: getOppgaveStatusEnum(oppgave.status),
                    opprettetDato,
                    svarfrist,
                    løstDato,
                    oppgavetype: Oppgavetype.BEKREFT_ENDRET_STARTDATO,
                    oppgavetypeData: {
                        nyStartdato: ISODateToDate(endreStartdatoData.nyStartdato),
                    },
                };
                parsedOppgaver.push(endretStartdatoOppgave);
                return;
            case Oppgavetype.BEKREFT_ENDRET_SLUTTDATO:
                const endreSluttdatoData = oppgave.oppgavetypeData as EndretSluttdatoOppgavetypeDataDto;
                const endretSluttdatoOppgave: EndreSluttdatoOppgave = {
                    oppgaveReferanse: oppgave.oppgaveReferanse,
                    status: getOppgaveStatusEnum(oppgave.status),
                    opprettetDato,
                    svarfrist,
                    løstDato,
                    oppgavetype: Oppgavetype.BEKREFT_ENDRET_SLUTTDATO,
                    oppgavetypeData: {
                        nySluttdato: ISODateToDate(endreSluttdatoData.nySluttdato),
                    },
                };
                parsedOppgaver.push(endretSluttdatoOppgave);
                return;
            case Oppgavetype.BEKREFT_AVVIK_REGISTERINNTEKT:
                const korrigertInntektData = oppgave.oppgavetypeData as KontrollerRegisterinntektOppgavetypeDataDto;
                const korrigertInntektOppgave: KorrigertInntektOppgave = {
                    oppgaveReferanse: oppgave.oppgaveReferanse,
                    status: getOppgaveStatusEnum(oppgave.status),
                    opprettetDato,
                    svarfrist,
                    løstDato,
                    oppgavetype: Oppgavetype.BEKREFT_AVVIK_REGISTERINNTEKT,
                    oppgavetypeData: {
                        fraOgMed: ISODateToDate(korrigertInntektData.fraOgMed),
                        tilOgMed: ISODateToDate(korrigertInntektData.tilOgMed),
                        registerinntekt: {
                            arbeidOgFrilansInntekter: korrigertInntektData.registerinntekt.arbeidOgFrilansInntekter,
                            ytelseInntekter: korrigertInntektData.registerinntekt.ytelseInntekter,
                        },
                    },
                };
                parsedOppgaver.push(korrigertInntektOppgave);
                return;
            case Oppgavetype.BEKREFT_ENDRET_PROGRAMPERIODE:
                const endretProgramperiodeData = oppgave.oppgavetypeData as EndretProgramperiodeDataDto;
                const endretProgramperiodeOppgave: EndretProgramperiodeOppgave = {
                    oppgaveReferanse: oppgave.oppgaveReferanse,
                    status: getOppgaveStatusEnum(oppgave.status),
                    opprettetDato,
                    svarfrist,
                    løstDato,
                    oppgavetype: Oppgavetype.BEKREFT_ENDRET_PROGRAMPERIODE,
                    oppgavetypeData: {
                        fraOgMed: ISODateToDate(endretProgramperiodeData.fraOgMed),
                        tilOgMed: endretProgramperiodeData.tilOgMed
                            ? ISODateToDate(endretProgramperiodeData.tilOgMed)
                            : undefined,
                    },
                };
                parsedOppgaver.push(endretProgramperiodeOppgave);
                return;
            default:
                console.error(`Ukjent oppgavetype: ${oppgave.oppgavetype}`);
                throw new Error(`Ukjent oppgavetype: ${oppgave.oppgavetype}`);
        }
    });
    return parsedOppgaver;
};
