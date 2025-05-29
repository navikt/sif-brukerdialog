import { Oppgave, Oppgavetype } from '@navikt/ung-common';
import { AppIntlShape } from '../i18n';
import { BodyShort } from '@navikt/ds-react';
import { OppgavebekreftelseTekster } from '../components/oppgavebekreftelse/Oppgavebekreftelse';

export const getOppgaveTittel = (oppgave: Oppgave, { text }: AppIntlShape) => {
    switch (oppgave.oppgavetype) {
        case Oppgavetype.BEKREFT_ENDRET_PROGRAMPERIODE:
            return text(`oppgavetype.BEKREFT_ENDRET_PROGRAMPERIODE.${oppgave.oppgavetypeData.endringType}.tittel`);
        case Oppgavetype.BEKREFT_AVVIK_REGISTERINNTEKT:
            return text('oppgavetype.BEKREFT_AVVIK_REGISTERINNTEKT.tittel');
        case Oppgavetype.RAPPORTER_INNTEKT:
            return text('oppgavetype.RAPPORTER_INNTEKT.tittel');
        default:
            return '';
    }
};

export const getOppgaveBekreftelseTekster = (oppgave: Oppgave, intl: AppIntlShape): OppgavebekreftelseTekster => {
    switch (oppgave.oppgavetype) {
        case Oppgavetype.BEKREFT_ENDRET_PROGRAMPERIODE:
            return {
                tittel: getOppgaveTittel(oppgave, intl),
                forstårOppgaveSpørsmål: intl.text(
                    `oppgavetype.BEKREFT_ENDRET_PROGRAMPERIODE.${oppgave.oppgavetypeData.endringType}.forstårOppgaveSpørsmål`,
                ),
            };

        case Oppgavetype.BEKREFT_AVVIK_REGISTERINNTEKT:
            return {
                tittel: getOppgaveTittel(oppgave, intl),
                forstårOppgaveSpørsmål: intl.text('oppgavetype.BEKREFT_AVVIK_REGISTERINNTEKT.forstårOppgaveSpørsmål'),
            };
        default:
            throw 'getOppgaveBekreftelseTekster - oppgavetype er ikke bekreftelseoppgave';
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
        case Oppgavetype.BEKREFT_ENDRET_PROGRAMPERIODE:
            return <BodyShort>Veilederen din har endret perioden du er med i ungdomsprogrammet.</BodyShort>;
        case Oppgavetype.RAPPORTER_INNTEKT:
            return <BodyShort>Du kan nå rapportere inntekt for forrige måned.</BodyShort>;
        default:
            return null;
    }
};
