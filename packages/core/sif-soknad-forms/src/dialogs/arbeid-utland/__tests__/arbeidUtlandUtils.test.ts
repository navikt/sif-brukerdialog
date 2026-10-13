import { YesOrNo } from '@sif/rhf';
import { describe, expect, it } from 'vitest';

import type { ArbeidUtlandFormValues } from '../ArbeidUtlandDialogForm';
import { arbeidUtlandUtils } from '../arbeidUtlandUtils';

const formValues: ArbeidUtlandFormValues = {
    fom: '2024-01-01',
    tom: '2024-01-31',
    landkode: 'SWE',
    jobbetIPerioden: YesOrNo.YES,
    utenlandskNasjonalId: '123456',
};

describe('arbeidUtlandUtils', () => {
    it('setter jobb og ID for periode med jobb i EØS/EFTA-land', () => {
        const result = arbeidUtlandUtils.formValuesToArbeidUtland(formValues, 'periodeMedJobb', 'nb', 'id');

        expect(result).toMatchObject({
            id: 'id',
            jobbetIPerioden: true,
            utenlandskNasjonalId: '123456',
        });
    });

    it('nullstiller ID når brukeren ikke jobbet i perioden', () => {
        const result = arbeidUtlandUtils.formValuesToArbeidUtland(
            { ...formValues, jobbetIPerioden: YesOrNo.NO },
            'generell',
            'nb',
            'id',
        );

        expect(result).toMatchObject({
            jobbetIPerioden: false,
            utenlandskNasjonalId: undefined,
        });
    });

    it('nullstiller ID utenfor EØS/EFTA', () => {
        const result = arbeidUtlandUtils.formValuesToArbeidUtland(
            { ...formValues, landkode: 'USA' },
            'generell',
            'nb',
            'id',
        );

        expect(result.utenlandskNasjonalId).toBeUndefined();
    });
});
