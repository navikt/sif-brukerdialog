/* eslint-disable no-case-declarations */
import { ISODateToDate } from '@navikt/sif-common-utils';
import dayjs from 'dayjs';
import {
    EndretSluttdatoDataDto,
    EndretStartdatoDataDto,
    InntektsrapporteringOppgavetypeDataDto,
    KontrollerRegisterinntektOppgavetypeDataDto,
    OppgaveDto,
    OppgaveStatus,
    Oppgavetype,
    SøkYtelseOppgavetypeDataDto,
} from '@navikt/ung-deltakelse-opplyser-api-deltaker';
import {
    EndretSluttdatoOppgave,
    EndretStartdatoOppgave,
    KorrigertInntektOppgave,
    Oppgave,
    OppgaveBase,
    RapporterInntektOppgave,
} from '../../types/Oppgave';

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
        case 'LUKKET':
            return OppgaveStatus.LUKKET;
        default:
            throw new Error(`Ukjent oppgavestatus: ${status}`);
    }
};

const getOppgaveBaseProps = (oppgave: OppgaveDto): Omit<OppgaveBase, 'oppgavetype'> => {
    const løstDato = oppgave.løstDato ? dayjs.utc(oppgave.løstDato).toDate() : undefined;
    const åpnetDato = oppgave.åpnetDato ? dayjs.utc(oppgave.åpnetDato).toDate() : undefined;
    const opprettetDato = dayjs.utc(oppgave.opprettetDato).toDate();
    const svarfrist = oppgave.frist ? dayjs.utc(oppgave.frist).toDate() : ISODateToDate('2099-01-01');
    return {
        oppgaveReferanse: oppgave.oppgaveReferanse,
        status: getOppgaveStatusEnum(oppgave.status),
        opprettetDato,
        frist: svarfrist,
        løstDato,
        åpnetDato,
    };
};

export const parseOppgaverElement = (oppgaver: OppgaveDto[]): Oppgave[] => {
    const parsedOppgaver: Oppgave[] = [];
    oppgaver.forEach((oppgave) => {
        switch (oppgave.oppgavetype) {
            case Oppgavetype.BEKREFT_AVVIK_REGISTERINNTEKT:
                const korrigertInntektData = oppgave.oppgavetypeData as KontrollerRegisterinntektOppgavetypeDataDto;
                const korrigertInntektOppgave: KorrigertInntektOppgave = {
                    ...getOppgaveBaseProps(oppgave),
                    oppgavetype: Oppgavetype.BEKREFT_AVVIK_REGISTERINNTEKT,
                    oppgavetypeData: {
                        ...korrigertInntektData,
                        fraOgMed: ISODateToDate(korrigertInntektData.fraOgMed),
                        tilOgMed: ISODateToDate(korrigertInntektData.tilOgMed),
                    },
                    bekreftelse: oppgave.bekreftelse,
                };
                parsedOppgaver.push(korrigertInntektOppgave);
                return;
            case Oppgavetype.BEKREFT_ENDRET_STARTDATO:
                const { forrigeStartdato, nyStartdato } = oppgave.oppgavetypeData as EndretStartdatoDataDto;
                const endretStartdatoOppgave: EndretStartdatoOppgave = {
                    ...getOppgaveBaseProps(oppgave),
                    oppgavetype: Oppgavetype.BEKREFT_ENDRET_STARTDATO,
                    oppgavetypeData: {
                        forrigeStartdato: ISODateToDate(forrigeStartdato),
                        nyStartdato: ISODateToDate(nyStartdato),
                    },
                    bekreftelse: oppgave.bekreftelse,
                };
                parsedOppgaver.push(endretStartdatoOppgave);
                return;
            case Oppgavetype.BEKREFT_ENDRET_SLUTTDATO:
                const { nySluttdato, forrigeSluttdato } = oppgave.oppgavetypeData as EndretSluttdatoDataDto;
                const endretSluttdatoOppgave: EndretSluttdatoOppgave = {
                    ...getOppgaveBaseProps(oppgave),
                    oppgavetype: Oppgavetype.BEKREFT_ENDRET_SLUTTDATO,
                    oppgavetypeData: {
                        forrigeSluttdato: forrigeSluttdato ? ISODateToDate(forrigeSluttdato) : undefined,
                        nySluttdato: ISODateToDate(nySluttdato),
                    },
                    bekreftelse: oppgave.bekreftelse,
                };
                parsedOppgaver.push(endretSluttdatoOppgave);
                return;
            case Oppgavetype.RAPPORTER_INNTEKT:
                const rapporterInntektData = oppgave.oppgavetypeData as InntektsrapporteringOppgavetypeDataDto;
                const rapporterInntektOppgave: RapporterInntektOppgave = {
                    ...getOppgaveBaseProps(oppgave),
                    oppgavetype: Oppgavetype.RAPPORTER_INNTEKT,
                    oppgavetypeData: {
                        fraOgMed: ISODateToDate(rapporterInntektData.fraOgMed),
                        tilOgMed: ISODateToDate(rapporterInntektData.tilOgMed),
                        rapportertInntekt: rapporterInntektData.rapportertInntekt
                            ? {
                                  arbeidstakerOgFrilansInntekt:
                                      rapporterInntektData.rapportertInntekt.arbeidstakerOgFrilansInntekt,
                              }
                            : undefined,
                    },
                };
                parsedOppgaver.push(rapporterInntektOppgave);
                return;
            case Oppgavetype.SØK_YTELSE:
                const { fomDato } = oppgave.oppgavetypeData as SøkYtelseOppgavetypeDataDto;
                const sendSøknadOppgave: Oppgave = {
                    ...getOppgaveBaseProps(oppgave),
                    oppgavetype: Oppgavetype.SØK_YTELSE,
                    oppgavetypeData: {
                        fomDato: ISODateToDate(fomDato),
                    },
                };
                parsedOppgaver.push(sendSøknadOppgave);
                return;

            default:
                throw new Error(`Ukjent oppgavetype: ${oppgave.oppgavetype}`);
        }
    });
    return parsedOppgaver;
};
