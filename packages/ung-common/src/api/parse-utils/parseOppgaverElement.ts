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
        switch (oppgave.oppgavetype) {
            case Oppgavetype.BEKREFT_ENDRET_STARTDATO:
                const endreStartdatoData = oppgave.oppgavetypeData as EndretStartdatoOppgavetypeDataDto;
                const endretStartdatoOppgave: EndreStartdatoOppgave = {
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
                const endretSluttdatoOppgave: EndreSluttdatoOppgave = {
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
                return;
            case Oppgavetype.BEKREFT_KORRIGERT_INNTEKT:
                const korrigertInntektData = oppgave.oppgavetypeData as KorrigertInntektOppgavetypeDataDto;
                const korrigertInntektOppgave: KorrigertInntektOppgave = {
                    id: oppgave.id,
                    status: getOppgaveStatusEnum(oppgave.status),
                    løstDato: oppgave.løstDato ? ISODateToDate(oppgave.løstDato) : undefined,
                    opprettetDato: ISODateToDate(oppgave.opprettetDato),
                    svarfrist: dayjs(ISODateToDate(oppgave.opprettetDato)).add(2, 'weeks').toDate(),
                    oppgavetype: Oppgavetype.BEKREFT_KORRIGERT_INNTEKT,
                    oppgavetypeData: {
                        inntektFraAinntekt: {
                            arbeidstakerOgFrilansInntekt:
                                korrigertInntektData.inntektFraAinntekt.arbeidstakerOgFrilansInntekt,
                            inntektFraYtelse: korrigertInntektData.inntektFraAinntekt.inntektFraYtelse,
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
