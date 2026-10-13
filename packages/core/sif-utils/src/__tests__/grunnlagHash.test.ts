import { describe, expect, it } from 'vitest';

import { createGrunnlagHash } from '../grunnlagHash';

describe('createGrunnlagHash', () => {
    it('gir lik hash uavhengig av nøkkelrekkefølge', async () => {
        expect(await createGrunnlagHash({ a: 1, b: 2 })).toBe(await createGrunnlagHash({ b: 2, a: 1 }));
    });

    it('gir ulik hash når grunnlaget endres', async () => {
        expect(await createGrunnlagHash({ antallBarn: 0 })).not.toBe(await createGrunnlagHash({ antallBarn: 1 }));
    });

    it('bevarer rekkefølgen i lister', async () => {
        expect(await createGrunnlagHash({ liste: ['a', 'b'] })).not.toBe(
            await createGrunnlagHash({ liste: ['b', 'a'] }),
        );
    });

    it('endrer ikke rekkefølgen i input', async () => {
        const grunnlag = { liste: ['b', 'a'] };
        await createGrunnlagHash(grunnlag);
        expect(grunnlag.liste).toEqual(['b', 'a']);
    });
});
