import { BrukerdialogOppgaveDto } from '@navikt/ung-brukerdialog-api';

/**
 * Bosted (m.fl.) har identisk struktur i backend – de skiller seg
 * kun på hvilke enum-typer `ikkeOppfyltÅrsak` og `kilde` har. Generikken bevarer disse typene.
 */
export interface VilkårOppgavetypeDataDto<TÅrsak extends string, TKilde extends string> {
    ikkeOppfyltÅrsak: TÅrsak;
    ikkeOppfyltÅrsakFritekstbeskrivelse?: string;
    kilde: TKilde;
    kildeFritekst?: string;
    varseltekst?: string;
}

export interface ParsedVilkårOppgavetypeData<TÅrsak extends string, TKilde extends string> {
    ikkeOppfyltÅrsak: TÅrsak;
    ikkeOppfyltÅrsakFritekstbeskrivelse?: string;
    kilde: TKilde;
    kildeFritekst?: string;
    varseltekst: string;
}

/**
 * Plukker ut feltene som skal videre til frontend og sikrer at varseltekst finnes.
 * Feltene listes eksplisitt fordi backend sender med felter (datoer m.m.) som ikke skal brukes.
 */
export const parseVilkårOppgavetypeData = <TÅrsak extends string, TKilde extends string>(
    oppgave: BrukerdialogOppgaveDto,
    oppgavetypeData: VilkårOppgavetypeDataDto<TÅrsak, TKilde>,
): ParsedVilkårOppgavetypeData<TÅrsak, TKilde> => {
    const { varseltekst } = oppgavetypeData;
    if (!varseltekst) {
        throw new Error(`Oppgave mangler varseltekst: ${oppgave.oppgaveReferanse}`);
    }
    return {
        ikkeOppfyltÅrsak: oppgavetypeData.ikkeOppfyltÅrsak,
        ikkeOppfyltÅrsakFritekstbeskrivelse: oppgavetypeData.ikkeOppfyltÅrsakFritekstbeskrivelse,
        kilde: oppgavetypeData.kilde,
        kildeFritekst: oppgavetypeData.kildeFritekst,
        varseltekst,
    };
};
