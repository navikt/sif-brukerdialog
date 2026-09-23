export enum KanIkkeSøkeÅrsak {
    UBEHANDLET_FØRSTEGANGSSØKNAD = 'UBEHANDLET_FØRSTEGANGSSØKNAD',
    UBEHANDLET_ANDREGANGSSØKNAD = 'UBEHANDLET_ANDREGANGSSØKNAD',
    UTENFOR_SØKNADSVINDU = 'UTENFOR_SØKNADSVINDU',
    ANNET = 'ANNET',
}

export const getKanIkkeSøkeÅrsak = (
    harInnsyn: boolean | undefined,
    harUbehandletSøknad: boolean | undefined,
): KanIkkeSøkeÅrsak => {
    if (harUbehandletSøknad && !harInnsyn) {
        return KanIkkeSøkeÅrsak.UBEHANDLET_FØRSTEGANGSSØKNAD;
    }
    if (harUbehandletSøknad && harInnsyn) {
        return KanIkkeSøkeÅrsak.UBEHANDLET_ANDREGANGSSØKNAD;
    }
    if (!harUbehandletSøknad && harInnsyn) {
        return KanIkkeSøkeÅrsak.UTENFOR_SØKNADSVINDU;
    }
    return KanIkkeSøkeÅrsak.ANNET;
};
