export interface OppgavebekreftelseTekster {
    sidetittel: string;
    oppgavetittel: React.ReactNode;
    harTilbakemeldingSpørsmål: string;
    tilbakemeldingFritekstLabel: string;
}

export interface OppgavebekreftelseDevProps {
    _devKvittering?: boolean;
}
