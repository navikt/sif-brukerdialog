import { createConfig } from '.';

/**
 * Felles endepunkter som ikke tilhører én ytelse (oppslag, vedlegg, mellomlagring, validering).
 * Genereres fra hele API-et (default.json), men filtreres til disse operasjonene, slik at
 * ytelsesspesifikke typer med samme navn ikke blir med.
 */
export default createConfig({
    apiDocsPath: '',
    outputPath: './src/generated/felles',
    includeOperations: ['/ \\/oppslag\\//', '/ \\/vedlegg/', '/ \\/mellomlagring\\//', '/ \\/valider\\//'],
});
