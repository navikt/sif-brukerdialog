import { BodyShort } from '@navikt/ds-react';
import { dateFormatter } from '@navikt/sif-common-utils';
import { OppgaveStatus, Oppgavetype } from '@navikt/ung-deltakelse-opplyser-api-deltaker';
import { AppIntlShape } from '../../../i18n';
import {
    EndretSluttdatoOppgave,
    EndretStartdatoOppgave,
    Oppgave,
    OppgaveBase,
    RapporterInntektOppgave,
} from '../../../types/Oppgave';
import { OppgavebekreftelseTekster } from '../components/oppgavebekreftelse/types';

export const getOppgaveTittel = (oppgave: Oppgave, { text }: AppIntlShape) => {
    switch (oppgave.oppgavetype) {
        case Oppgavetype.BEKREFT_ENDRET_STARTDATO:
            return text(`oppgavetype.${oppgave.oppgavetype}.oppgavetittel`);
        case Oppgavetype.BEKREFT_ENDRET_SLUTTDATO:
            return text(`oppgavetype.${oppgave.oppgavetype}.oppgavetittel`);
        case Oppgavetype.BEKREFT_AVVIK_REGISTERINNTEKT:
            return text('oppgavetype.BEKREFT_AVVIK_REGISTERINNTEKT.oppgavetittel', {
                måned: dateFormatter.monthFullYear(oppgave.oppgavetypeData.fraOgMed),
            });
        case Oppgavetype.RAPPORTER_INNTEKT:
            return text('oppgavetype.RAPPORTER_INNTEKT.oppgavetittel', {
                måned: dateFormatter.monthFullYear(oppgave.oppgavetypeData.fraOgMed),
            });
        case Oppgavetype.SØK_YTELSE:
            return text('oppgavetype.SØK_YTELSE.oppgavetittel');
    }
};
export const getOppgaveSidetittel = (oppgave: Oppgave, { text }: AppIntlShape) => {
    switch (oppgave.oppgavetype) {
        case Oppgavetype.BEKREFT_ENDRET_STARTDATO:
            return text(`oppgavetype.${oppgave.oppgavetype}.sidetittel`);
        case Oppgavetype.BEKREFT_ENDRET_SLUTTDATO:
            return text(`oppgavetype.${oppgave.oppgavetype}.sidetittel`);
        case Oppgavetype.BEKREFT_AVVIK_REGISTERINNTEKT:
            return text('oppgavetype.BEKREFT_AVVIK_REGISTERINNTEKT.sidetittel');
        case Oppgavetype.RAPPORTER_INNTEKT:
            return text('oppgavetype.RAPPORTER_INNTEKT.sidetittel');
        case Oppgavetype.SØK_YTELSE:
            return text('oppgavetype.SØK_YTELSE.sidetittel');
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
        case Oppgavetype.BEKREFT_ENDRET_SLUTTDATO:
            return {
                sidetittel: intl.text(`oppgavetype.${oppgave.oppgavetype}.sidetittel`),
                oppgavetittel: getOppgaveTittel(oppgave, intl),
                harTilbakemeldingSpørsmål: intl.text(`oppgavetype.${oppgave.oppgavetype}.harTilbakemeldingSpørsmål`),
            };

        case Oppgavetype.BEKREFT_AVVIK_REGISTERINNTEKT:
            return {
                sidetittel: intl.text(`oppgavetype.${oppgave.oppgavetype}.sidetittel`),
                oppgavetittel: getOppgaveTittel(oppgave, intl),
                harTilbakemeldingSpørsmål: intl.text(
                    'oppgavetype.BEKREFT_AVVIK_REGISTERINNTEKT.harTilbakemeldingSpørsmål',
                ),
            };
        default:
            throw 'getOppgaveBekreftelseTekster - oppgavetype er ikke bekreftelseoppgave';
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

export const getDokumentTittel = (sidetittel: string) => {
    return `${sidetittel} - Din ungdomsprogramytelse`;
};
