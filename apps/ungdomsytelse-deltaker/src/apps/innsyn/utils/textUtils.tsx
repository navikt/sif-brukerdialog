import {
    EndretProgramperiodeEndringType,
    EndretProgramperiodeOppgave,
    Oppgave,
    Oppgavetype,
    RapporterInntektOppgave,
} from '@navikt/ung-common';
import { AppIntlShape } from '../i18n';
import { BodyShort } from '@navikt/ds-react';
import { OppgavebekreftelseTekster } from '../components/oppgavebekreftelse/Oppgavebekreftelse';
import { dateFormatter } from '@navikt/sif-common-utils';

export const getOppgaveTittel = (oppgave: Oppgave, { text }: AppIntlShape) => {
    switch (oppgave.oppgavetype) {
        case Oppgavetype.BEKREFT_ENDRET_PROGRAMPERIODE:
            return text(`oppgavetype.BEKREFT_ENDRET_PROGRAMPERIODE.${oppgave.oppgavetypeData.endringType}.tittel`);
        case Oppgavetype.BEKREFT_AVVIK_REGISTERINNTEKT:
            return text('oppgavetype.BEKREFT_AVVIK_REGISTERINNTEKT.tittel');
        case Oppgavetype.RAPPORTER_INNTEKT:
            return text('oppgavetype.RAPPORTER_INNTEKT.tittel');
        case Oppgavetype.SØK_YTELSE:
            return text('Oppgavetype.SØK_YTELSE.tittel');
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

const getRapporterInntektOppsummering = (oppgave: RapporterInntektOppgave): React.ReactNode => {
    const { fraOgMed, tilOgMed } = oppgave.oppgavetypeData;
    return `Inntekt kan rapporteres for perioden ${dateFormatter.full(fraOgMed)} til ${dateFormatter.full(tilOgMed)}`;
};

const getEndretProgramperiodeOppsummering = (oppgave: EndretProgramperiodeOppgave): React.ReactNode => {
    const { endringType, forrigeProgramperiode, programperiode } = oppgave.oppgavetypeData;
    // Startdato endret
    if (endringType === EndretProgramperiodeEndringType.ENDRET_STARTDATO) {
        return `Startdato for programperioden din er endret til ${dateFormatter.full(programperiode.fraOgMed)}.`;
    }
    // Sluttdato må være definert for endret_sluttdato endring
    if (programperiode.tilOgMed === undefined) {
        throw new Error('Programperiode må ha en sluttdato når endringstype ikke er ENDRET_STARTDATO');
    }
    // Sluttdato settes første gang
    if (forrigeProgramperiode?.tilOgMed === undefined) {
        return `Sluttdato for programperioden din er satt til ${dateFormatter.full(programperiode.tilOgMed)}.`;
    }
    // Sluttdato er endret
    return `Sluttdato for programperioden din er endret til ${dateFormatter.full(programperiode.tilOgMed)}.`;
};

export const getOppgaveOppsummering = (oppgave: Oppgave): React.ReactNode | undefined => {
    switch (oppgave.oppgavetype) {
        case Oppgavetype.BEKREFT_ENDRET_PROGRAMPERIODE:
            return getEndretProgramperiodeOppsummering(oppgave);
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
        case Oppgavetype.BEKREFT_ENDRET_PROGRAMPERIODE:
            return <BodyShort>Veilederen din har endret perioden du er med i ungdomsprogrammet.</BodyShort>;
        case Oppgavetype.RAPPORTER_INNTEKT:
            return <BodyShort>Du kan nå rapportere inntekt for forrige måned.</BodyShort>;
        default:
            return null;
    }
};
