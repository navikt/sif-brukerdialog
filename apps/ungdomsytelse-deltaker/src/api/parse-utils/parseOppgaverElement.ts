/* eslint-disable no-case-declarations */
import { DateRange } from '@navikt/sif-common-formik-ds';
import { isISODate, ISODateToDate, OpenDateRange } from '@navikt/sif-common-utils';
import {
    BrukerdialogOppgaveDto,
    EndretPeriodeDataDto,
    EndretSluttdatoDataDto,
    EndretStartdatoDataDto,
    InntektsrapporteringOppgavetypeDataDto,
    KontrollerRegisterinntektOppgavetypeDataDto,
    OppgaveStatus,
    OppgaveType,
    PeriodeEndringType,
    SøkYtelseOppgavetypeDataDto,
} from '@navikt/ung-brukerdialog-api';
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
        default:
            throw new Error(`Ukjent oppgavestatus: ${status}`);
    }
};

const getOppgaveBaseProps = (oppgave: BrukerdialogOppgaveDto): Omit<ParsedOppgaveBase, 'oppgavetype'> => {
    const løstDato = oppgave.løstDato ? dayjs.utc(oppgave.løstDato).toDate() : undefined;
    const opprettetDato = dayjs.utc(oppgave.opprettetDato).toDate();
    const svarfrist = oppgave.frist ? dayjs.utc(oppgave.frist).toDate() : ISODateToDate('2099-01-01');
    return {
        oppgaveReferanse: oppgave.oppgaveReferanse,
        status: getOppgaveStatusEnum(oppgave.status),
        opprettetDato,
        sisteDatoEnKanSvare: getSisteDatoEnKanSvare(svarfrist),
        løstDato,
    };
};

const getEndretSluttdatoOppgave = (
    oppgave: BrukerdialogOppgaveDto,
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
            respons: oppgave.respons,
        };
    }
    return {
        ...getOppgaveBaseProps(oppgave),
        oppgavetype: ParsedOppgavetype.BEKREFT_MELDT_UT,
        oppgavetypeData: {
            sluttdato: ISODateToDate(nySluttdato),
        },
        respons: oppgave.respons,
    };
};

const getEndretStartdatoOppgave = (
    oppgave: BrukerdialogOppgaveDto,
    nyStartdato: string,
    forrigeStartdato: string,
): EndretStartdatoOppgave => ({
    ...getOppgaveBaseProps(oppgave),
    oppgavetype: ParsedOppgavetype.BEKREFT_ENDRET_STARTDATO,
    oppgavetypeData: {
        forrigeStartdato: ISODateToDate(forrigeStartdato),
        nyStartdato: ISODateToDate(nyStartdato),
    },
    respons: oppgave.respons,
});

const getOppgaveFraEndretPeriodeOppgave = (oppgave: BrukerdialogOppgaveDto): Oppgave => {
    const { endringer, forrigePeriode, nyPeriode } = oppgave.oppgavetypeData as EndretPeriodeDataDto;

    /** Endret startdato */
    if (
        endringer.length === 1 &&
        endringer.includes(PeriodeEndringType.ENDRET_STARTDATO) &&
        nyPeriode &&
        nyPeriode.fomDato !== undefined &&
        forrigePeriode &&
        forrigePeriode.fomDato !== undefined
    ) {
        return getEndretStartdatoOppgave(oppgave, nyPeriode.fomDato, forrigePeriode.fomDato);
    }
    /** Endret sluttdato */
    if (
        endringer.length === 1 &&
        endringer.includes(PeriodeEndringType.ENDRET_SLUTTDATO) &&
        nyPeriode?.tomDato !== undefined
    ) {
        return getEndretSluttdatoOppgave(oppgave, nyPeriode.tomDato, forrigePeriode?.tomDato);
    }
    /** Fjernet periode */
    if (endringer.length === 1 && endringer.includes(PeriodeEndringType.FJERNET_PERIODE)) {
        const fjernetPeriodeOppgave: FjernetPeriodeOppgave = {
            ...getOppgaveBaseProps(oppgave),
            oppgavetype: ParsedOppgavetype.BEKREFT_FJERNET_PERIODE,
            respons: oppgave.respons,
        };
        return fjernetPeriodeOppgave;
    }
    /** Endret start- og sluttdato */
    if (
        endringer.length === 2 &&
        endringer.includes(PeriodeEndringType.ENDRET_STARTDATO) &&
        endringer.includes(PeriodeEndringType.ENDRET_SLUTTDATO) &&
        forrigePeriode &&
        forrigePeriode.fomDato !== undefined &&
        nyPeriode &&
        nyPeriode.fomDato !== undefined &&
        nyPeriode.tomDato !== undefined
    ) {
        const endretStartOgSluttdatoOppgave: EndretStartOgSluttdatoOppgave = {
            ...getOppgaveBaseProps(oppgave),
            oppgavetype: ParsedOppgavetype.BEKREFT_ENDRET_START_OG_SLUTTDATO,
            oppgavetypeData: {
                forrigePeriode: mapPeriodeDtoToOpenDateRange({
                    fomDato: forrigePeriode.fomDato,
                    tomDato: forrigePeriode.tomDato,
                }),
                nyPeriode: mapPeriodeDtoToDateRange({
                    fomDato: nyPeriode.fomDato,
                    tomDato: nyPeriode.tomDato,
                }),
            },
            respons: oppgave.respons,
        };
        return endretStartOgSluttdatoOppgave;
    }

    throw new Error(`Kan ikke lage oppgave fra endret periode oppgave med endringer: ${endringer.join(', ')}`);
};

export const parseOppgaverElement = (oppgaver: BrukerdialogOppgaveDto[]): Oppgave[] => {
    const parsedOppgaver: Oppgave[] = [];
    oppgaver.forEach((oppgave) => {
        switch (oppgave.oppgavetype) {
            case OppgaveType.BEKREFT_ENDRET_STARTDATO:
                const { forrigeStartdato, nyStartdato } = oppgave.oppgavetypeData as EndretStartdatoDataDto;
                parsedOppgaver.push(getEndretStartdatoOppgave(oppgave, nyStartdato, forrigeStartdato));
                return;
            case OppgaveType.BEKREFT_ENDRET_SLUTTDATO:
                const { nySluttdato, forrigeSluttdato } = oppgave.oppgavetypeData as EndretSluttdatoDataDto;
                parsedOppgaver.push(getEndretSluttdatoOppgave(oppgave, nySluttdato, forrigeSluttdato));
                return;
            case OppgaveType.BEKREFT_ENDRET_PERIODE:
                parsedOppgaver.push(getOppgaveFraEndretPeriodeOppgave(oppgave));
                return;

            case OppgaveType.BEKREFT_AVVIK_REGISTERINNTEKT:
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
                    respons: oppgave.respons,
                };
                parsedOppgaver.push(avvikRegisterinntektOppgave);
                return;

            case OppgaveType.RAPPORTER_INNTEKT:
                const rapporterInntektData = oppgave.oppgavetypeData as InntektsrapporteringOppgavetypeDataDto;
                const rapporterInntektOppgave: RapporterInntektOppgave = {
                    ...getOppgaveBaseProps(oppgave),
                    oppgavetype: ParsedOppgavetype.RAPPORTER_INNTEKT,
                    oppgavetypeData: {
                        fraOgMed: ISODateToDate(rapporterInntektData.fraOgMed),
                        tilOgMed: ISODateToDate(rapporterInntektData.tilOgMed),

                        // rapportertInntekt: rapporterInntektData.rapportertInntekt
                        //     ? {
                        //           arbeidstakerOgFrilansInntekt:
                        //               rapporterInntektData.rapportertInntekt.arbeidstakerOgFrilansInntekt,
                        //       }
                        //     : undefined,
                        gjelderDelerAvMåned: rapporterInntektData.gjelderDelerAvMåned,
                    },
                    respons: oppgave.respons,
                };
                parsedOppgaver.push(rapporterInntektOppgave);
                return;

            case OppgaveType.SØK_YTELSE:
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

const mapPeriodeDtoToOpenDateRange = (periode: { fomDato: string; tomDato?: string }): OpenDateRange => {
    if (periode.fomDato && !isISODate(periode.fomDato)) {
        throw new Error(`Ugyldig datoformat for fom i periode: ${periode.fomDato}`);
    }
    if (periode.fomDato && !isISODate(periode.fomDato)) {
        throw new Error(`Ugyldig datoformat for tom i periode: ${periode.fomDato}`);
    }
    return {
        from: ISODateToDate(periode.fomDato),
        to: periode.fomDato ? ISODateToDate(periode.fomDato) : undefined,
    };
};

const mapPeriodeDtoToDateRange = (periode: { fomDato: string; tomDato?: string }): DateRange => {
    if (periode.fomDato && !isISODate(periode.fomDato)) {
        throw new Error(`Ugyldig datoformat for fom i periode: ${periode.fomDato}`);
    }
    if (!periode.fomDato) {
        throw new Error(`Tom-dato er undefined for perioden`);
    }
    if (periode.fomDato && !isISODate(periode.fomDato)) {
        throw new Error(`Ugyldig datoformat for tom i periode: ${periode.fomDato}`);
    }
    return {
        from: ISODateToDate(periode.fomDato),
        to: ISODateToDate(periode.fomDato),
    };
};
