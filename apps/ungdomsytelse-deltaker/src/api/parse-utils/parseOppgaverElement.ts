/* eslint-disable no-case-declarations */
import { DateRange } from '@navikt/sif-common-formik-ds';
import { isISODate, ISODateToDate, OpenDateRange } from '@navikt/sif-common-utils';
import {
    EndretPeriodeDataDto,
    EndretSluttdatoDataDto,
    EndretStartdatoDataDto,
    InntektsrapporteringOppgavetypeDataDto,
    KontrollerRegisterinntektOppgavetypeDataDto,
    OppgaveDto,
    OppgaveStatus,
    Oppgavetype,
    PeriodeEndringType,
    SøkYtelseOppgavetypeDataDto,
} from '@navikt/ung-deltakelse-opplyser-api-deltaker';
import dayjs from 'dayjs';

import {
    AvvikRegisterinntektOppgave,
    EndretSluttdatoOppgave,
    EndretStartdatoOppgave,
    EndretStartOgSluttdatoOppgave,
    FjernetPeriodeOppgave,
    MeldtUtOppgave,
    Oppgave,
    ParsedOppgaveBase,
    ParsedOppgavetype,
    RapporterInntektOppgave,
} from '../../types/Oppgave';
import { getSisteDatoEnKanSvare } from '../../utils/svarfristUtils';

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

const getOppgaveBaseProps = (oppgave: OppgaveDto): Omit<ParsedOppgaveBase, 'oppgavetype'> => {
    const løstDato = oppgave.løstDato ? dayjs.utc(oppgave.løstDato).toDate() : undefined;
    const åpnetDato = oppgave.åpnetDato ? dayjs.utc(oppgave.åpnetDato).toDate() : undefined;
    const opprettetDato = dayjs.utc(oppgave.opprettetDato).toDate();
    const svarfrist = oppgave.frist ? dayjs.utc(oppgave.frist).toDate() : ISODateToDate('2099-01-01');
    return {
        oppgaveReferanse: oppgave.oppgaveReferanse,
        status: getOppgaveStatusEnum(oppgave.status),
        opprettetDato,
        sisteDatoEnKanSvare: getSisteDatoEnKanSvare(svarfrist),
        løstDato,
        åpnetDato,
    };
};

const getEndretSluttdatoOppgave = (
    oppgave: OppgaveDto,
    nySluttdato: string,
    forrigeSluttdato: string | undefined,
): EndretSluttdatoOppgave | MeldtUtOppgave => {
    if (forrigeSluttdato) {
        return {
            ...getOppgaveBaseProps(oppgave),
            oppgavetype: ParsedOppgavetype.BEKREFT_ENDRET_SLUTTDATO,
            oppgavetypeData: {
                forrigeSluttdato: ISODateToDate(forrigeSluttdato),
                nySluttdato: ISODateToDate(nySluttdato),
            },
            bekreftelse: oppgave.bekreftelse,
        };
    }
    return {
        ...getOppgaveBaseProps(oppgave),
        oppgavetype: ParsedOppgavetype.BEKREFT_MELDT_UT,
        oppgavetypeData: {
            sluttdato: ISODateToDate(nySluttdato),
        },
        bekreftelse: oppgave.bekreftelse,
    };
};

const getEndretStartdatoOppgave = (
    oppgave: OppgaveDto,
    nyStartdato: string,
    forrigeStartdato: string,
): EndretStartdatoOppgave => ({
    ...getOppgaveBaseProps(oppgave),
    oppgavetype: ParsedOppgavetype.BEKREFT_ENDRET_STARTDATO,
    oppgavetypeData: {
        forrigeStartdato: ISODateToDate(forrigeStartdato),
        nyStartdato: ISODateToDate(nyStartdato),
    },
    bekreftelse: oppgave.bekreftelse,
});

const getOppgaveFraEndretPeriodeOppgave = (oppgave: OppgaveDto): Oppgave => {
    const { endringer, forrigePeriode, nyPeriode } = oppgave.oppgavetypeData as EndretPeriodeDataDto;

    /** Endret startdato */
    if (
        endringer.length === 1 &&
        endringer.includes(PeriodeEndringType.ENDRET_STARTDATO) &&
        nyPeriode &&
        forrigePeriode
    ) {
        return getEndretStartdatoOppgave(oppgave, nyPeriode.fom, forrigePeriode.fom);
    }
    /** Endret sluttdato */
    if (
        endringer.length === 1 &&
        endringer.includes(PeriodeEndringType.ENDRET_SLUTTDATO) &&
        nyPeriode?.tom !== undefined
    ) {
        return getEndretSluttdatoOppgave(oppgave, nyPeriode.tom, forrigePeriode?.tom);
    }
    /** Fjernet periode */
    if (endringer.length === 1 && endringer.includes(PeriodeEndringType.FJERNET_PERIODE)) {
        const fjernetPeriodeOppgave: FjernetPeriodeOppgave = {
            ...getOppgaveBaseProps(oppgave),
            oppgavetype: ParsedOppgavetype.BEKREFT_FJERNET_PERIODE,
            bekreftelse: oppgave.bekreftelse,
        };
        return fjernetPeriodeOppgave;
    }
    /** Endret start- og sluttdato */
    if (
        endringer.length === 2 &&
        endringer.includes(PeriodeEndringType.ENDRET_STARTDATO) &&
        endringer.includes(PeriodeEndringType.ENDRET_SLUTTDATO) &&
        forrigePeriode &&
        nyPeriode
    ) {
        const endretStartOgSluttdatoOppgave: EndretStartOgSluttdatoOppgave = {
            ...getOppgaveBaseProps(oppgave),
            oppgavetype: ParsedOppgavetype.BEKREFT_ENDRET_START_OG_SLUTTDATO,
            oppgavetypeData: {
                forrigePeriode: mapPeriodeDtoToOpenDateRange(forrigePeriode),
                nyPeriode: mapPeriodeDtoToDateRange(nyPeriode),
            },
            bekreftelse: oppgave.bekreftelse,
        };
        return endretStartOgSluttdatoOppgave;
    }

    throw new Error(`Kan ikke lage oppgave fra endret periode oppgave med endringer: ${endringer.join(', ')}`);
};

export const parseOppgaverElement = (oppgaver: OppgaveDto[]): Oppgave[] => {
    const parsedOppgaver: Oppgave[] = [];
    oppgaver.forEach((oppgave) => {
        switch (oppgave.oppgavetype) {
            case Oppgavetype.BEKREFT_ENDRET_STARTDATO:
                const { forrigeStartdato, nyStartdato } = oppgave.oppgavetypeData as EndretStartdatoDataDto;
                parsedOppgaver.push(getEndretStartdatoOppgave(oppgave, nyStartdato, forrigeStartdato));
                return;
            case Oppgavetype.BEKREFT_ENDRET_SLUTTDATO:
                const { nySluttdato, forrigeSluttdato } = oppgave.oppgavetypeData as EndretSluttdatoDataDto;
                parsedOppgaver.push(getEndretSluttdatoOppgave(oppgave, nySluttdato, forrigeSluttdato));
                return;
            case Oppgavetype.BEKREFT_ENDRET_PERIODE:
                parsedOppgaver.push(getOppgaveFraEndretPeriodeOppgave(oppgave));
                return;

            case Oppgavetype.BEKREFT_AVVIK_REGISTERINNTEKT:
                const avvikRegisterinntektData = oppgave.oppgavetypeData as KontrollerRegisterinntektOppgavetypeDataDto;
                const avvikRegisterinntektOppgave: AvvikRegisterinntektOppgave = {
                    ...getOppgaveBaseProps(oppgave),
                    oppgavetype: ParsedOppgavetype.BEKREFT_AVVIK_REGISTERINNTEKT,
                    oppgavetypeData: {
                        ...avvikRegisterinntektData,
                        fraOgMed: ISODateToDate(avvikRegisterinntektData.fraOgMed),
                        tilOgMed: ISODateToDate(avvikRegisterinntektData.tilOgMed),
                        gjelderDelerAvMåned: avvikRegisterinntektData.gjelderDelerAvMåned,
                    },
                    bekreftelse: oppgave.bekreftelse,
                };
                parsedOppgaver.push(avvikRegisterinntektOppgave);
                return;

            case Oppgavetype.RAPPORTER_INNTEKT:
                const rapporterInntektData = oppgave.oppgavetypeData as InntektsrapporteringOppgavetypeDataDto;
                const rapporterInntektOppgave: RapporterInntektOppgave = {
                    ...getOppgaveBaseProps(oppgave),
                    oppgavetype: ParsedOppgavetype.RAPPORTER_INNTEKT,
                    oppgavetypeData: {
                        fraOgMed: ISODateToDate(rapporterInntektData.fraOgMed),
                        tilOgMed: ISODateToDate(rapporterInntektData.tilOgMed),
                        rapportertInntekt: rapporterInntektData.rapportertInntekt
                            ? {
                                  arbeidstakerOgFrilansInntekt:
                                      rapporterInntektData.rapportertInntekt.arbeidstakerOgFrilansInntekt,
                              }
                            : undefined,
                        gjelderDelerAvMåned: rapporterInntektData.gjelderDelerAvMåned,
                    },
                };
                parsedOppgaver.push(rapporterInntektOppgave);
                return;

            case Oppgavetype.SØK_YTELSE:
                const { fomDato } = oppgave.oppgavetypeData as SøkYtelseOppgavetypeDataDto;
                const sendSøknadOppgave: Oppgave = {
                    ...getOppgaveBaseProps(oppgave),
                    oppgavetype: ParsedOppgavetype.SØK_YTELSE,
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

const mapPeriodeDtoToOpenDateRange = (periode: { fom: string; tom?: string }): OpenDateRange => {
    if (periode.fom && !isISODate(periode.fom)) {
        throw new Error(`Ugyldig datoformat for fom i periode: ${periode.fom}`);
    }
    if (periode.tom && !isISODate(periode.tom)) {
        throw new Error(`Ugyldig datoformat for tom i periode: ${periode.tom}`);
    }
    return {
        from: ISODateToDate(periode.fom),
        to: periode.tom ? ISODateToDate(periode.tom) : undefined,
    };
};

const mapPeriodeDtoToDateRange = (periode: { fom: string; tom?: string }): DateRange => {
    if (periode.fom && !isISODate(periode.fom)) {
        throw new Error(`Ugyldig datoformat for fom i periode: ${periode.fom}`);
    }
    if (!periode.tom) {
        throw new Error(`Tom-dato er undefined for perioden`);
    }
    if (periode.tom && !isISODate(periode.tom)) {
        throw new Error(`Ugyldig datoformat for tom i periode: ${periode.tom}`);
    }
    return {
        from: ISODateToDate(periode.fom),
        to: ISODateToDate(periode.tom),
    };
};
