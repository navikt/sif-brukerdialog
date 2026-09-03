import { OppgaveStatus } from '@navikt/ung-brukerdialog-api';
import { DeltakelsePeriode } from '@shared/types/DeltakelsePeriode';
import { Oppgave, ParsedOppgavetype } from '@sif/api/ung-brukerdialog';
import { getDateToday } from '@sif/utils';
import dayjs from 'dayjs';

/**
 * Returnerer true når deltakelsen er inaktiv og avslutningsdatoen har passert.
 */
export const erDeltakelseAvsluttet = (deltakelsePeriode: DeltakelsePeriode): boolean => {
    const avslutningsdato = deltakelsePeriode.programPeriode.to || deltakelsePeriode.periodeMaksDato;
    return deltakelsePeriode.status === 'IKKE_AKTIV' && dayjs(getDateToday()).isAfter(avslutningsdato);
};

/**
 * Returnerer true når dagens dato er lik eller etter deltakelsens startdato.
 */
export const erDeltakelseStartet = (deltakelsePeriode: DeltakelsePeriode): boolean => {
    const today = getDateToday();
    if (dayjs(today).isBefore(deltakelsePeriode.programPeriode.from)) {
        return false;
    }
    return true;
};

export const harRapportertInntekt = (oppgaver: Oppgave[]): boolean => {
    return oppgaver.some(
        (o) =>
            o.parsedOppgavetype === ParsedOppgavetype.RAPPORTER_INNTEKT &&
            o.status !== OppgaveStatus.ULØST &&
            o.respons?.arbeidstakerOgFrilansInntekt !== undefined,
    );
};
