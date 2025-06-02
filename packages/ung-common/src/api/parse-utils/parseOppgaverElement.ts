import { ISODateToDate } from '@navikt/sif-common-utils';
import {
    EndretProgramperiodeDataDto,
    InntektsrapporteringOppgavetypeDataDto,
    KontrollerRegisterinntektOppgavetypeDataDto,
    OppgaveDto,
    OppgaveStatus,
    Oppgavetype,
    SøkYtelseOppgavetypeDataDto,
} from '@navikt/ung-deltakelse-opplyser-api';
import dayjs from 'dayjs';
import {
    EndretProgramperiodeEndringType,
    EndretProgramperiodeOppgave,
    KorrigertInntektOppgave,
    Oppgave,
    OppgaveBase,
    RapporterInntektOppgave,
} from '../../types';

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

const isoDateErUndefinedEllerILangFremtid = (dato: string | undefined): boolean => {
    return !dato || dayjs(ISODateToDate(dato)).isAfter(dayjs('2099-01-01'));
};

export const getEndretProgramperiodeEndringType = (
    oppgavetypeData: EndretProgramperiodeDataDto,
): EndretProgramperiodeEndringType => {
    const { programperiode, forrigeProgramperiode } = oppgavetypeData;

    const startdatoEndret = programperiode.fomDato !== forrigeProgramperiode?.fomDato;
    const sluttdatoEndret = programperiode.tomDato !== forrigeProgramperiode?.tomDato;

    if (startdatoEndret && sluttdatoEndret) {
        return EndretProgramperiodeEndringType.START_OG_SLUTTDATO_ENDRET;
    }

    if (startdatoEndret) {
        return EndretProgramperiodeEndringType.ENDRET_STARTDATO;
    }

    return isoDateErUndefinedEllerILangFremtid(forrigeProgramperiode.tomDato)
        ? EndretProgramperiodeEndringType.NY_SLUTTDATO
        : EndretProgramperiodeEndringType.ENDRET_SLUTTDATO;
};

const getOppgaveBaseProps = (oppgave: OppgaveDto): Omit<OppgaveBase, 'oppgavetype'> => {
    const løstDato = oppgave.løstDato ? dayjs.utc(oppgave.løstDato).toDate() : undefined;
    const åpnetDato = oppgave.åpnetDato ? dayjs.utc(oppgave.åpnetDato).toDate() : undefined;
    const opprettetDato = dayjs.utc(oppgave.opprettetDato).toDate();
    const svarfrist = dayjs.utc(oppgave.opprettetDato).add(2, 'weeks').toDate(); // TODO
    return {
        oppgaveReferanse: oppgave.oppgaveReferanse,
        status: getOppgaveStatusEnum(oppgave.status),
        opprettetDato,
        svarfrist,
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
            case Oppgavetype.BEKREFT_ENDRET_PROGRAMPERIODE:
                const endretProgramperiodeData = oppgave.oppgavetypeData as EndretProgramperiodeDataDto;
                const endringType = getEndretProgramperiodeEndringType(endretProgramperiodeData);
                const endretProgramperiodeOppgave: EndretProgramperiodeOppgave = {
                    ...getOppgaveBaseProps(oppgave),
                    oppgavetype: Oppgavetype.BEKREFT_ENDRET_PROGRAMPERIODE,
                    ugyldigOppgave: endringType === EndretProgramperiodeEndringType.START_OG_SLUTTDATO_ENDRET,
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
                        endringType,
                    },
                    bekreftelse: oppgave.bekreftelse,
                };
                parsedOppgaver.push(endretProgramperiodeOppgave);
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
