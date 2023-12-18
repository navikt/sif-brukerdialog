import { YesOrNo } from '@navikt/sif-common-core-ds/src/types/YesOrNo';
import { extractFerieuttakIPeriodenSøknadsdata } from '../extractFerieuttakIPeriodenSøknadsdata';

const mock = {
    skalTaUtFerieIPerioden: YesOrNo.YES,
    ferieuttakIPerioden: [
        {
            from: new Date(),
            to: new Date(),
        },
    ],
};

describe('extractFerieuttakIPeriodenSøknadsdata', () => {
    it('returnerer type skalTaUtFerieSøknadsdata', () => {
        const result = extractFerieuttakIPeriodenSøknadsdata(mock);
        expect(result).toBeDefined();
        expect(result?.type).toEqual('skalTaUtFerieSøknadsdata');
    });

    it('returnerer type skalIkkeTaUtFerieSøknadsdata', () => {
        const result = extractFerieuttakIPeriodenSøknadsdata({
            ...mock,
            skalTaUtFerieIPerioden: YesOrNo.NO,
        });
        expect(result).toBeDefined();
        expect(result?.type).toEqual('skalIkkeTaUtFerieSøknadsdata');
    });

    it('returnerer undefined', () => {
        const result = extractFerieuttakIPeriodenSøknadsdata({
            skalTaUtFerieIPerioden: YesOrNo.YES,
            ferieuttakIPerioden: undefined,
        });
        expect(result).toBeUndefined();
    });
});
