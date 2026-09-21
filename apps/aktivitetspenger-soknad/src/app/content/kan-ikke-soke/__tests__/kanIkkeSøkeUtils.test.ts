import { getKanIkkeSøkeÅrsak, KanIkkeSøkeÅrsak } from '../kanIkkeSøkeUtils';

describe('getKanIkkeSøkeÅrsak', () => {
    it('skal returnere UBEHANDLET_FØRSTEGANGSSØKNAD når søkeren har en ubehandlet søknad, men ikke innsyn', () => {
        expect(getKanIkkeSøkeÅrsak(false, true)).toBe(KanIkkeSøkeÅrsak.UBEHANDLET_FØRSTEGANGSSØKNAD);
    });

    it('skal returnere UBEHANDLET_ANDREGANGSSØKNAD når søkeren har både innsyn og en ubehandlet søknad', () => {
        expect(getKanIkkeSøkeÅrsak(true, true)).toBe(KanIkkeSøkeÅrsak.UBEHANDLET_ANDREGANGSSØKNAD);
    });

    it('skal returnere UTENFOR_SØKNADSVINDU når søkeren har innsyn, men ingen ubehandlet søknad', () => {
        expect(getKanIkkeSøkeÅrsak(true, false)).toBe(KanIkkeSøkeÅrsak.UTENFOR_SØKNADSVINDU);
    });

    it('skal returnere ANNET når søkeren verken har innsyn eller en ubehandlet søknad', () => {
        expect(getKanIkkeSøkeÅrsak(false, false)).toBe(KanIkkeSøkeÅrsak.ANNET);
    });

    it('skal behandle udefinerte verdier som falsy, på samme måte som false', () => {
        expect(getKanIkkeSøkeÅrsak(undefined, undefined)).toBe(KanIkkeSøkeÅrsak.ANNET);
    });
});
