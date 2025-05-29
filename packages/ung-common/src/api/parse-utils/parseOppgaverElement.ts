import { ISODateToDate } from '@navikt/sif-common-utils';
import {
    EndretProgramperiodeDataDto,
    InntektsrapporteringOppgavetypeDataDto,
    KontrollerRegisterinntektOppgavetypeDataDto,
    OppgaveStatus,
    Oppgavetype,
    zDeltakelseOpplysningDto,
} from '@navikt/ung-deltakelse-opplyser-api';
import dayjs from 'dayjs';
import { z } from 'zod';
import {
    EndretProgramperiodeOppgave,
    KorrigertInntektOppgave,
    RapporterInntektOppgave,
    Oppgave,
    EndretProgramperiodeEndringType,
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

export const getEndretProgramperiodeEndringType = (
    oppgavetypeData: EndretProgramperiodeDataDto,
): EndretProgramperiodeEndringType => {
    const { programperiode, forrigeProgramperiode } = oppgavetypeData;

    if (programperiode.fomDato !== forrigeProgramperiode?.fomDato) {
        return EndretProgramperiodeEndringType.ENDRET_STARTDATO;
    }

    return forrigeProgramperiode
        ? EndretProgramperiodeEndringType.ENDRET_SLUTTDATO
        : EndretProgramperiodeEndringType.NY_SLUTTDATO;
};

export const parseOppgaverElement = (oppgaver: zOppgaveElement[]): Oppgave[] => {
    const parsedOppgaver: Oppgave[] = [];
    oppgaver.forEach((oppgave) => {
        const løstDato = oppgave.løstDato ? dayjs.utc(oppgave.løstDato).toDate() : undefined;
        const opprettetDato = dayjs.utc(oppgave.opprettetDato).toDate();
        const svarfrist = dayjs.utc(oppgave.opprettetDato).add(2, 'weeks').toDate();

        switch (oppgave.oppgavetype) {
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
                    bekreftelse: oppgave.bekreftelse,
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
                        programperiode: {
                            fraOgMed: ISODateToDate(endretProgramperiodeData.programperiode.fomDato),
                            tilOgMed: endretProgramperiodeData.programperiode.tomDato
                                ? ISODateToDate(endretProgramperiodeData.programperiode.tomDato)
                                : undefined,
                        },
                        forrigeProgramperiode: endretProgramperiodeData.forrigeProgramperiode
                            ? {
                                  fraOgMed: ISODateToDate(endretProgramperiodeData.forrigeProgramperiode.fomDato),
                                  tilOgMed: endretProgramperiodeData.forrigeProgramperiode.tomDato
                                      ? ISODateToDate(endretProgramperiodeData.forrigeProgramperiode.tomDato)
                                      : undefined,
                              }
                            : undefined,
                        endringType: getEndretProgramperiodeEndringType(endretProgramperiodeData),
                    },
                    bekreftelse: oppgave.bekreftelse,
                };
                parsedOppgaver.push(endretProgramperiodeOppgave);
                return;
            case Oppgavetype.RAPPORTER_INNTEKT:
                const rapporterInntektData = oppgave.oppgavetypeData as InntektsrapporteringOppgavetypeDataDto;
                const rapporterInntektOppgave: RapporterInntektOppgave = {
                    oppgaveReferanse: oppgave.oppgaveReferanse,
                    status: getOppgaveStatusEnum(oppgave.status),
                    opprettetDato,
                    svarfrist,
                    løstDato,
                    oppgavetype: Oppgavetype.RAPPORTER_INNTEKT,
                    oppgavetypeData: {
                        fraOgMed: ISODateToDate(rapporterInntektData.fraOgMed),
                        tilOgMed: ISODateToDate(rapporterInntektData.tilOgMed),
                    },
                };
                parsedOppgaver.push(rapporterInntektOppgave);
                return;

            default:
                throw new Error(`Ukjent oppgavetype: ${oppgave.oppgavetype}`);
        }
    });
    return parsedOppgaver;
};
