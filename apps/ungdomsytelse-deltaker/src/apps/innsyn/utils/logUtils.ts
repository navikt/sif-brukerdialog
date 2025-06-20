import { DeltakelsePeriode, OppgaveStatus, Oppgavetype } from '@navikt/ung-common';

type DeltakelsePeriodeMeta = {
    harSøkt: boolean;
    antallOppgaver: number;
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
};

const getDeltakelsePeriodeMeta = (deltakelse: DeltakelsePeriode): DeltakelsePeriodeMeta => {
    return {
        harSøkt: deltakelse.søktTidspunkt !== undefined,
        antallOppgaver: deltakelse.oppgaver.length,
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

export const logUtils = {
    getDeltakelsePeriodeMeta,
};
