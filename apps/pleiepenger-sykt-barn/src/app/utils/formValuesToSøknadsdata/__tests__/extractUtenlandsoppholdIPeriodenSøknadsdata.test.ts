import { YesOrNo } from '@navikt/sif-common-core-ds/src/types/YesOrNo';
import { extractUtenlandsoppholdIPeriodenSøknadsdata } from '../extractUtenlandsoppholdIPeriodenSøknadsdata';

const mock = {
    skalOppholdeSegIUtlandetIPerioden: YesOrNo.YES,
    utenlandsoppholdIPerioden: [
        {
            fom: new Date(),
            tom: new Date(),
            landkode: 'SE',
        },
    ],
};

describe('extractUtenlandsoppholdIPeriodenSøknadsdata', () => {
    it('returnerer type skalOppholdeSegIUtlandet', () => {
        const result = extractUtenlandsoppholdIPeriodenSøknadsdata(mock);
        expect(result).toBeDefined();
        expect(result?.type).toEqual('skalOppholdeSegIUtlandet');
    });

    it('returnerer type skalIkkeOppholdeSegIUtlandet', () => {
        const result = extractUtenlandsoppholdIPeriodenSøknadsdata({
            ...mock,
            skalOppholdeSegIUtlandetIPerioden: YesOrNo.NO,
        });
        expect(result).toBeDefined();
        expect(result?.type).toEqual('skalIkkeOppholdeSegIUtlandet');
    });

    it('returnerer undefined', () => {
        const result = extractUtenlandsoppholdIPeriodenSøknadsdata({
            skalOppholdeSegIUtlandetIPerioden: YesOrNo.YES,
            utenlandsoppholdIPerioden: undefined,
        });
        expect(result).toBeUndefined();
    });
});
