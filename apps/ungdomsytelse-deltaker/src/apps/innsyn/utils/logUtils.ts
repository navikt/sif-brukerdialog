import { ungdomsytelse } from '@navikt/k9-brukerdialog-prosessering-api';
import { OppgaveStatus } from '@navikt/ung-brukerdialog-api';
import { DeltakelsePeriode } from '@shared/types/DeltakelsePeriode';
import { BekreftelseOppgave, Oppgave, ParsedOppgavetype, SøkYtelseOppgave } from '@shared/types/Oppgave';
import { UtvidetKontonummerInfo } from '@sif/api/ung-deltaker';
import { HarKontonummerEnum } from '@søknad/steg/oppsummering/oppsummeringUtils';
import dayjs from 'dayjs';

type DeltakelsePeriodeMeta = {
    harSøkt: boolean;
    harStartet: boolean;
    erAvsluttet: boolean;
    antallOppgaverTotalt: number;
    antallLøsteOppgaver: number;
    antallUløsteOppgaver: number;
    antallAvbrutteOppgaver: number;
    harSluttdato: boolean;
    antallEndretStartdatoOppgaver: number;
    antallEndretSluttdatoOppgaver: number;
    antallAvvikInntektOppgaver: number;
    antallRapporterInntektOppgaver: number;
    antallSøkYtelseOppgaver: number;
    antallDagerSidenStartdato: number;
    antallDagerMellomInnmeldtOgSøknad?: number;
};

const getDeltakelsePeriodeMeta = (deltakelse: DeltakelsePeriode, oppgaver: Oppgave[]): DeltakelsePeriodeMeta => {
    const harSøkt = deltakelse.søktTidspunkt !== undefined;
    const harStartet = dayjs(deltakelse.programPeriode.from).isBefore(dayjs());
    const erAvsluttet = dayjs(deltakelse.programPeriode.to).isBefore(dayjs());

    const søkYtelseOppgave = oppgaver.find((oppgave) => oppgave.oppgavetype === ParsedOppgavetype.SØK_YTELSE);
    return {
        harSøkt,
        harStartet,
        erAvsluttet,
        antallDagerSidenStartdato: harStartet ? 0 : dayjs(deltakelse.programPeriode.from).diff(dayjs(), 'day'),
        antallDagerMellomInnmeldtOgSøknad: søkYtelseOppgave
            ? dayjs(deltakelse.søktTidspunkt).diff(søkYtelseOppgave.opprettetDato, 'day')
            : undefined,
        antallOppgaverTotalt: oppgaver.length,
        antallLøsteOppgaver: oppgaver.filter((oppgave) => oppgave.status === OppgaveStatus.LØST).length,
        antallUløsteOppgaver: oppgaver.filter((oppgave) => oppgave.status === OppgaveStatus.ULØST).length,
        antallAvbrutteOppgaver: oppgaver.filter((oppgave) => oppgave.status === OppgaveStatus.AVBRUTT).length,
        harSluttdato: deltakelse.programPeriode.to !== undefined,
        antallEndretStartdatoOppgaver: oppgaver.filter(
            (oppgave) => oppgave.oppgavetype === ParsedOppgavetype.BEKREFT_ENDRET_STARTDATO,
        ).length,
        antallEndretSluttdatoOppgaver: oppgaver.filter(
            (oppgave) => oppgave.oppgavetype === ParsedOppgavetype.BEKREFT_ENDRET_SLUTTDATO,
        ).length,
        antallAvvikInntektOppgaver: oppgaver.filter(
            (oppgave) => oppgave.oppgavetype === ParsedOppgavetype.BEKREFT_AVVIK_REGISTERINNTEKT,
        ).length,
        antallRapporterInntektOppgaver: oppgaver.filter(
            (oppgave) => oppgave.oppgavetype === ParsedOppgavetype.RAPPORTER_INNTEKT,
        ).length,
        antallSøkYtelseOppgaver: oppgaver.filter((oppgave) => oppgave.oppgavetype === ParsedOppgavetype.SØK_YTELSE)
            .length,
    };
};

const getSøknadInnsendingMeta = (
    deltakelse: DeltakelsePeriode,
    oppgave: SøkYtelseOppgave,
    {
        antallBarn,
        barnStemmer,
        kontonummerStemmer,
        kontonummerOppslagInfo,
    }: {
        antallBarn: number;
        barnStemmer: boolean;
        kontonummerStemmer?: boolean;
        kontonummerOppslagInfo: UtvidetKontonummerInfo;
    },
    oppgaver: Oppgave[],
) => {
    const meta = getDeltakelsePeriodeMeta(deltakelse, oppgaver);
    const { harKontonummer } = kontonummerOppslagInfo;
    return {
        harBarn: antallBarn > 0,
        barnStemmer,
        harKontonummer,
        kontonummerStemmer: harKontonummer === HarKontonummerEnum.JA ? kontonummerStemmer : undefined,
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

export const getOppgaveBekreftelseMeta = (
    oppgave: BekreftelseOppgave,
    uttalelse: ungdomsytelse.UngdomsytelseOppgaveUttalelseDto,
) => {
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
