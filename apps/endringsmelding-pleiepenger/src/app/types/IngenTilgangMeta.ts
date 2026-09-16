import { UgyldigBarnFormatDetails } from './K9Format';

/** Tilleggsinformasjon som vises til bruker når hen ikke kan bruke søknaden. */
export type IngenTilgangMeta = {
    erArbeidstaker?: boolean;
    erSN?: boolean;
    erFrilanser?: boolean;
    error?: UgyldigBarnFormatDetails;
};
