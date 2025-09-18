export interface OppgavebekreftelseTekster {
    sidetittel: string;
    oppgavetittel: React.ReactNode;
    kvitteringTekst: React.ReactNode;
    harTilbakemeldingSpørsmål: string;
    tilbakemeldingFritekstLabel: string;
}

export interface OppgavebekreftelseDevProps {
    _devKvittering?: boolean;
}
