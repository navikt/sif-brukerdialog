export enum KanIkkeSøkeÅrsak {
    IKKE_INNSYN_UBEHANDLET_SØKNAD = 'IKKE_INNSYN_UBEHANDLET_SØKNAD',
    INNSYN_UBEHANDLET_SØKNAD = 'INNSYN_UBEHANDLET_SØKNAD',
    ANNET = 'ANNET',
}

export const getKanIkkeSøkeÅrsak = (
    harInnsyn: boolean | undefined,
    harUbehandletSøknad: boolean | undefined,
): KanIkkeSøkeÅrsak => {
    if (harUbehandletSøknad && !harInnsyn) {
        return KanIkkeSøkeÅrsak.IKKE_INNSYN_UBEHANDLET_SØKNAD;
    }
    if (!harUbehandletSøknad && harInnsyn) {
        return KanIkkeSøkeÅrsak.INNSYN_UBEHANDLET_SØKNAD;
    }
    return KanIkkeSøkeÅrsak.ANNET;
};
