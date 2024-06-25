import { YesOrNo } from '@navikt/sif-common-core-ds/src/types/YesOrNo';
import { extractUtenlandsoppholdIPeriodenSøknadsdata } from '../extractUtenlandsoppholdIPeriodenSøknadsdata';
import { UtenlandsoppholdUtvidet } from '@navikt/sif-common-forms-ds';

const utenlandsopphold: UtenlandsoppholdUtvidet = {
    type: 'innenfor_eøs',
    erUtenforEØS: false,
    erSammenMedBarnet: false,
    fom: new Date(),
    tom: new Date(),
    landkode: 'SE',
};
const mock = {
    skalOppholdeSegIUtlandetIPerioden: YesOrNo.YES,
    utenlandsoppholdIPerioden: [utenlandsopphold],
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
