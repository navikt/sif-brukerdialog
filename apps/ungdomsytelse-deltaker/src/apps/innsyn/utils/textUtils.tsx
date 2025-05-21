import { Oppgave, Oppgavetype } from '@navikt/ung-common';
import { AppIntlShape } from '../i18n';
import { BodyShort } from '@navikt/ds-react';

export const getOppgaveTittel = (oppgavetype: Oppgavetype, { text }: AppIntlShape) => {
    switch (oppgavetype) {
        case Oppgavetype.BEKREFT_ENDRET_PROGRAMPERIODE:
            return text('oppgavetype.BEKREFT_ENDRET_PROGRAMPERIODE.tittel');
        case Oppgavetype.BEKREFT_AVVIK_REGISTERINNTEKT:
            return text('oppgavetype.BEKREFT_AVVIK_REGISTERINNTEKT.tittel');
        default:
            return '';
    }
};

export const getOppgaveBeskrivelse = (oppgave: Oppgave) => {
    if (oppgave.status !== 'ULØST') {
        return null;
    }

    switch (oppgave.oppgavetype) {
        case Oppgavetype.BEKREFT_AVVIK_REGISTERINNTEKT:
            return (
                <BodyShort>
                    Det er forskjell mellom det du har oppgitt i lønn og det arbeidsgiveren din har rapportert til oss.
                    Utbetalingen settes på vent til vi har fått svar av deg.
                </BodyShort>
            );
        default:
            return <BodyShort>Veilederen din har endret perioden du er med i ungdomsprogrammet.</BodyShort>;
    }
};
