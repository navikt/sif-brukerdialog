import { dateFormatter } from '@navikt/sif-common-utils';
import { OppgaveStatus, Oppgavetype } from '@navikt/ung-deltakelse-opplyser-api-deltaker';
import { AppIntlShape } from '@shared/i18n';
import { EndretSluttdatoOppgave, Oppgave, OppgaveBase } from '@shared/types/Oppgave';

const BEKREFT_NY_SLUTTDATO = 'BEKREFT_NY_SLUTTDATO';

const getSluttdatoTextKey = (oppgave: EndretSluttdatoOppgave) => {
    return oppgave.oppgavetypeData.forrigeSluttdato ? Oppgavetype.BEKREFT_ENDRET_SLUTTDATO : BEKREFT_NY_SLUTTDATO;
};

export const getOppgaveTittel = (
    oppgave: Oppgave,
    { text }: AppIntlShape,
    values?: Record<string, string | number>,
) => {
    switch (oppgave.oppgavetype) {
        case Oppgavetype.BEKREFT_ENDRET_STARTDATO:
            return text(`oppgavetype.${oppgave.oppgavetype}.oppgavetittel`);
        case Oppgavetype.BEKREFT_ENDRET_SLUTTDATO:
            return text(`oppgavetype.${getSluttdatoTextKey(oppgave)}.oppgavetittel`);
        case Oppgavetype.BEKREFT_AVVIK_REGISTERINNTEKT:
            return text('oppgavetype.BEKREFT_AVVIK_REGISTERINNTEKT.oppgavetittel', {
                måned: dateFormatter.monthFullYear(oppgave.oppgavetypeData.fraOgMed),
                ...values,
            });
        case Oppgavetype.RAPPORTER_INNTEKT:
            return text('oppgavetype.RAPPORTER_INNTEKT.oppgavetittel', {
                månedOgÅr: dateFormatter.monthFullYear(oppgave.oppgavetypeData.fraOgMed),
                måned: dateFormatter.month(oppgave.oppgavetypeData.fraOgMed),
            });
        case Oppgavetype.SØK_YTELSE:
            return text('oppgavetype.SØK_YTELSE.oppgavetittel');
    }
};

export const getOppgaveInfo = (oppgave: Oppgave, { text }: AppIntlShape) => {
    switch (oppgave.oppgavetype) {
        case Oppgavetype.BEKREFT_ENDRET_STARTDATO:
            return text(`oppgavetype.BEKREFT_ENDRET_STARTDATO.info`);
        case Oppgavetype.BEKREFT_ENDRET_SLUTTDATO:
            return text(`oppgavetype.${getSluttdatoTextKey(oppgave)}.info`);
        case Oppgavetype.BEKREFT_AVVIK_REGISTERINNTEKT:
            return text('oppgavetype.BEKREFT_AVVIK_REGISTERINNTEKT.info', {
                måned: dateFormatter.month(oppgave.oppgavetypeData.fraOgMed),
            });
        case Oppgavetype.RAPPORTER_INNTEKT:
            return text('oppgavetype.RAPPORTER_INNTEKT.info', {
                måned: dateFormatter.month(oppgave.oppgavetypeData.fraOgMed),
            });
        case Oppgavetype.SØK_YTELSE:
            return text('oppgavetype.SØK_YTELSE.info');
    }
};

const renderDatoOgKlokkeslett = (dato?: Date) => {
    return dato ? dateFormatter.compactWithTime(dato) : '';
};

export const getOppgaveStatusText = (oppgave: OppgaveBase): string => {
    switch (oppgave.status) {
        case OppgaveStatus.LØST:
            return `Sendt inn ${renderDatoOgKlokkeslett(oppgave.løstDato)}`;
        case OppgaveStatus.ULØST:
            return `Frist: ${dateFormatter.full(oppgave.frist)}`;
        case OppgaveStatus.AVBRUTT:
            return 'Oppgave er avbrutt';
        case OppgaveStatus.LUKKET:
            return `Sendt inn ${renderDatoOgKlokkeslett(oppgave.lukketDato)}`;
        case OppgaveStatus.UTLØPT:
            return `Oppgave er utløpt`;
    }
};

export const getDokumentTittel = (sidetittel: string) => {
    return `${sidetittel} - Din ungdomsprogramytelse`;
};
