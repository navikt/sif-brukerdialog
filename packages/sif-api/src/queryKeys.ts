export const sifApiQueryKeys = {
    kontonummer: ['kontonummer'] as const,
    søker: ['søker'] as const,
    barn: ['barn'] as const,
    arbeidsgivere: ['arbeidsgivere'] as const,
    validerFritekst: ['validerFritekst'] as const,
    vedlegg: ['vedlegg'] as const,
    mellomlagring: ['mellomlagring'] as const,
    oppgaver: ['oppgaver'] as const,
    sisteGyldigeVedtakForAktørId: (aktørId: string) => ['sisteGyldigeVedtakForAktørId', aktørId] as const,
} as const;
