import {
    EndretSluttdatoOppgave,
    EndretStartdatoOppgave,
    Oppgave,
    Oppgavetype,
    RapporterInntektOppgave,
} from '@navikt/ung-common';
import { BodyShort } from '@navikt/ds-react';
import { OppgavebekreftelseTekster } from '../components/oppgavebekreftelse/Oppgavebekreftelse';
import { dateFormatter } from '@navikt/sif-common-utils';
import { AppIntlShape } from '../../../i18n';

export const getOppgaveTittel = (oppgave: Oppgave, { text }: AppIntlShape) => {
    switch (oppgave.oppgavetype) {
        case Oppgavetype.BEKREFT_ENDRET_STARTDATO:
            return text(`oppgavetype.${oppgave.oppgavetype}.tittel`);
        case Oppgavetype.BEKREFT_ENDRET_SLUTTDATO:
            return text(`oppgavetype.${oppgave.oppgavetype}.tittel`);
        case Oppgavetype.BEKREFT_AVVIK_REGISTERINNTEKT:
            return text('oppgavetype.BEKREFT_AVVIK_REGISTERINNTEKT.tittel');
        case Oppgavetype.RAPPORTER_INNTEKT:
            return text('oppgavetype.RAPPORTER_INNTEKT.tittel');
        case Oppgavetype.SØK_YTELSE:
            return text('oppgavetype.SØK_YTELSE.tittel');
    }
};

export const getOppgaveInfo = (oppgave: Oppgave, { text }: AppIntlShape) => {
    switch (oppgave.oppgavetype) {
        case Oppgavetype.BEKREFT_ENDRET_STARTDATO:
            return text(`oppgavetype.BEKREFT_ENDRET_STARTDATO.info`);
        case Oppgavetype.BEKREFT_ENDRET_SLUTTDATO:
            return text(`oppgavetype.BEKREFT_ENDRET_SLUTTDATO.info`);
        case Oppgavetype.BEKREFT_AVVIK_REGISTERINNTEKT:
            return text('oppgavetype.BEKREFT_AVVIK_REGISTERINNTEKT.info');
        case Oppgavetype.RAPPORTER_INNTEKT:
            return text('oppgavetype.RAPPORTER_INNTEKT.info');
        case Oppgavetype.SØK_YTELSE:
            return text('oppgavetype.SØK_YTELSE.info');
    }
};

export const getOppgaveBekreftelseTekster = (oppgave: Oppgave, intl: AppIntlShape): OppgavebekreftelseTekster => {
    switch (oppgave.oppgavetype) {
        case Oppgavetype.BEKREFT_ENDRET_STARTDATO:
            return {
                tittel: getOppgaveTittel(oppgave, intl),
                forstårOppgaveSpørsmål: intl.text(`oppgavetype.${oppgave.oppgavetype}.forstårOppgaveSpørsmål`),
            };

        case Oppgavetype.BEKREFT_ENDRET_SLUTTDATO:
            return {
                tittel: getOppgaveTittel(oppgave, intl),
                forstårOppgaveSpørsmål: intl.text(`oppgavetype.${oppgave.oppgavetype}.forstårOppgaveSpørsmål`),
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

const getRapporterInntektOppsummering = (oppgave: RapporterInntektOppgave): React.ReactNode => {
    const { fraOgMed, tilOgMed } = oppgave.oppgavetypeData;
    return `Inntekt kan rapporteres for perioden ${dateFormatter.full(fraOgMed)} til ${dateFormatter.full(tilOgMed)}`;
};

const getEndretStartdatoOppsummering = (oppgave: EndretStartdatoOppgave): React.ReactNode => {
    return (
        <>
            Startdato i ungdomsprogrammet er endret til{' '}
            <strong>{dateFormatter.full(oppgave.oppgavetypeData.nyStartdato)}.</strong>
        </>
    );
};
const getEndretSluttdatoOppsummering = (oppgave: EndretSluttdatoOppgave): React.ReactNode => {
    const { forrigeSluttdato, nySluttdato } = oppgave.oppgavetypeData;
    return forrigeSluttdato ? (
        <>
            Sluttdato i ungdomsprogrammet er endret til <strong>{dateFormatter.full(nySluttdato)}.</strong>
        </>
    ) : (
        <>
            Sluttdato i ungdomsprogrammet er satt til <strong>{dateFormatter.full(nySluttdato)}.</strong>
        </>
    );
};

export const getOppgaveOppsummering = (oppgave: Oppgave): React.ReactNode | undefined => {
    switch (oppgave.oppgavetype) {
        case Oppgavetype.BEKREFT_ENDRET_STARTDATO:
            return getEndretStartdatoOppsummering(oppgave);
        case Oppgavetype.BEKREFT_ENDRET_SLUTTDATO:
            return getEndretSluttdatoOppsummering(oppgave);
        case Oppgavetype.BEKREFT_AVVIK_REGISTERINNTEKT:
            return 'TODO';
        case Oppgavetype.RAPPORTER_INNTEKT:
            return getRapporterInntektOppsummering(oppgave);
        default:
            return null;
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
        case Oppgavetype.BEKREFT_ENDRET_SLUTTDATO:
        case Oppgavetype.BEKREFT_ENDRET_STARTDATO:
            return <BodyShort>{getOppgaveOppsummering(oppgave)}</BodyShort>;
        case Oppgavetype.RAPPORTER_INNTEKT:
            return <BodyShort>Du kan nå rapportere inntekt for forrige måned.</BodyShort>;
        default:
            return null;
    }
};
