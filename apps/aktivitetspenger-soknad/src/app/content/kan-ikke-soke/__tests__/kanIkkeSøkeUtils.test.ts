import { getKanIkkeSøkeÅrsak, KanIkkeSøkeÅrsak } from '../kanIkkeSøkeUtils';

describe('getKanIkkeSøkeÅrsak', () => {
    it('skal returnere IKKE_INNSYN_UBEHANDLET_SØKNAD når søkeren har en ubehandlet søknad, men ikke innsyn', () => {
        expect(getKanIkkeSøkeÅrsak(false, true)).toBe(KanIkkeSøkeÅrsak.IKKE_INNSYN_UBEHANDLET_SØKNAD);
    });

    it('skal returnere INNSYN_UBEHANDLET_SØKNAD når søkeren har innsyn, men ingen ubehandlet søknad', () => {
        expect(getKanIkkeSøkeÅrsak(true, false)).toBe(KanIkkeSøkeÅrsak.INNSYN_UBEHANDLET_SØKNAD);
    });

    it('skal returnere ANNET når søkeren har både innsyn og en ubehandlet søknad', () => {
        expect(getKanIkkeSøkeÅrsak(true, true)).toBe(KanIkkeSøkeÅrsak.ANNET);
    });

    it('skal returnere ANNET når søkeren verken har innsyn eller en ubehandlet søknad', () => {
        expect(getKanIkkeSøkeÅrsak(false, false)).toBe(KanIkkeSøkeÅrsak.ANNET);
    });

    it('skal returnere ANNET når begge verdiene er udefinert', () => {
        expect(getKanIkkeSøkeÅrsak(undefined, undefined)).toBe(KanIkkeSøkeÅrsak.ANNET);
    });

    it('skal behandle udefinert harInnsyn som "har ikke innsyn"', () => {
        expect(getKanIkkeSøkeÅrsak(undefined, true)).toBe(KanIkkeSøkeÅrsak.IKKE_INNSYN_UBEHANDLET_SØKNAD);
    });

    it('skal behandle udefinert harUbehandletSøknad som "har ikke ubehandlet søknad"', () => {
        expect(getKanIkkeSøkeÅrsak(true, undefined)).toBe(KanIkkeSøkeÅrsak.INNSYN_UBEHANDLET_SØKNAD);
    });
});
