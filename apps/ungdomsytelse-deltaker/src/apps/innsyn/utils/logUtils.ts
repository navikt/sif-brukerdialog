import { UngdomsytelseOppgaveUttalelseDto } from '@navikt/k9-brukerdialog-prosessering-api';
import {
    BekreftelseOppgave,
    DeltakelsePeriode,
    OppgaveStatus,
    Oppgavetype,
    SøkYtelseOppgave,
} from '@navikt/ung-common';
import dayjs from 'dayjs';

export enum LogMetaInfoType {
    SØKNAD_SENDT = 'søknad sendt',
    OPPGAVEBEKREFTELSE_SENDT = 'oppgavebekreftelse sendt',
    INNTEKT_RAPPORTERT = 'inntekt rapportert',
}

type DeltakelsePeriodeMeta = {
    harSøkt: boolean;
    harStartet: boolean;
    erAvsluttet: boolean;
    antallOppgaverTotalt: number;
    antallLøsteOppgaver: number;
    antallUløsteOppgaver: number;
    antallAvbrutteOppgaver: number;
    antallLukkedeOppgaver: number;
    harSluttdato: boolean;
    antallEndretStartdatoOppgaver: number;
    antallEndretSluttdatoOppgaver: number;
    antallAvvikInntektOppgaver: number;
    antallRapporterInntektOppgaver: number;
    antallSøkYtelseOppgaver: number;
    antallDagerSidenStartdato: number;
    antallDagerMellomInnmeldtOgSøknad?: number;
};

const getDeltakelsePeriodeMeta = (deltakelse: DeltakelsePeriode): DeltakelsePeriodeMeta => {
    const harSøkt = deltakelse.søktTidspunkt !== undefined;
    const harStartet = harSøkt && dayjs(deltakelse.programPeriode.from).isBefore(dayjs());
    const erAvsluttet = harSøkt && dayjs(deltakelse.programPeriode.to).isAfter(dayjs());

    const søkYtelseOppgave = deltakelse.oppgaver.find((oppgave) => oppgave.oppgavetype === Oppgavetype.SØK_YTELSE);
    return {
        harSøkt,
        harStartet,
        erAvsluttet,
        antallDagerSidenStartdato: harStartet ? 0 : dayjs(deltakelse.programPeriode.from).diff(dayjs(), 'day'),
        antallDagerMellomInnmeldtOgSøknad: søkYtelseOppgave
            ? dayjs(deltakelse.søktTidspunkt).diff(søkYtelseOppgave.opprettetDato, 'day')
            : undefined,
        antallOppgaverTotalt: deltakelse.oppgaver.length,
        antallLøsteOppgaver: deltakelse.oppgaver.filter((oppgave) => oppgave.status === OppgaveStatus.LØST).length,
        antallUløsteOppgaver: deltakelse.oppgaver.filter((oppgave) => oppgave.status === OppgaveStatus.ULØST).length,
        antallAvbrutteOppgaver: deltakelse.oppgaver.filter((oppgave) => oppgave.status === OppgaveStatus.AVBRUTT)
            .length,
        antallLukkedeOppgaver: deltakelse.oppgaver.filter((oppgave) => oppgave.status === OppgaveStatus.LUKKET).length,
        harSluttdato: deltakelse.programPeriode.to !== undefined,
        antallEndretStartdatoOppgaver: deltakelse.oppgaver.filter(
            (oppgave) => oppgave.oppgavetype === Oppgavetype.BEKREFT_ENDRET_STARTDATO,
        ).length,
        antallEndretSluttdatoOppgaver: deltakelse.oppgaver.filter(
            (oppgave) => oppgave.oppgavetype === Oppgavetype.BEKREFT_ENDRET_SLUTTDATO,
        ).length,
        antallAvvikInntektOppgaver: deltakelse.oppgaver.filter(
            (oppgave) => oppgave.oppgavetype === Oppgavetype.BEKREFT_AVVIK_REGISTERINNTEKT,
        ).length,
        antallRapporterInntektOppgaver: deltakelse.oppgaver.filter(
            (oppgave) => oppgave.oppgavetype === Oppgavetype.RAPPORTER_INNTEKT,
        ).length,
        antallSøkYtelseOppgaver: deltakelse.oppgaver.filter((oppgave) => oppgave.oppgavetype === Oppgavetype.SØK_YTELSE)
            .length,
    };
};

const getSøknadInnsendingMeta = (
    deltakelse: DeltakelsePeriode,
    oppgave: SøkYtelseOppgave,
    {
        antallBarn,
        barnStemmer,
        harKontonummer,
        kontonummerStemmer,
    }: {
        antallBarn: number;
        barnStemmer: boolean;
        harKontonummer: boolean;
        kontonummerStemmer: boolean;
    },
) => {
    const meta = getDeltakelsePeriodeMeta(deltakelse);
    return {
        harBarn: antallBarn > 0,
        barnStemmer,
        harKontonummer,
        kontonummerStemmer,
        harStartet: meta.harStartet,
        harSluttdato: meta.harSluttdato,
        antallOppgaverTotalt: meta.antallOppgaverTotalt,
        antallEndretStartdatoOppgaver: meta.antallEndretStartdatoOppgaver,
        antallEndretSluttdatoOppgaver: meta.antallEndretSluttdatoOppgaver,
        antallSøkYtelseOppgaver: meta.antallSøkYtelseOppgaver,
        antallDagerMellomOpprettetOgBesvart: dayjs().diff(oppgave.opprettetDato, 'day'),
        antallMinutterMellomOpprettetOgBesvart: dayjs().diff(oppgave.opprettetDato, 'minute'),
    };
};

export const getOppgaveBekreftelseMeta = (oppgave: BekreftelseOppgave, uttalelse: UngdomsytelseOppgaveUttalelseDto) => {
    return {
        oppgavetype: oppgave.oppgavetype,
        antallDagerMellomOpprettetOgBesvart: dayjs().diff(oppgave.opprettetDato, 'day'),
        antallMinutterMellomOpprettetOgBesvart: dayjs().diff(oppgave.opprettetDato, 'minutes'),
        harUttalelse: uttalelse.harUttalelse,
    };
};

export const logUtils = {
    getDeltakelsePeriodeMeta,
    getSøknadInnsendingMeta,
    getOppgaveBekreftelseMeta,
};
