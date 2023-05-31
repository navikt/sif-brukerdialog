import { mapNormalarbeidstidApiDataToFormValues } from '../mapNormalarbeidstidToFormValues';

describe('mapNormalarbeidstidApiDataToNormalarbeidstidFormData', () => {
    it('returnerer riktig for normalarbeidstid med snitt', () => {
        const result = mapNormalarbeidstidApiDataToFormValues({
            timerPerUkeISnitt: 'PT20H30M',
        });
        expect(result).toBeDefined();
        expect(result?.timerPerUke).toEqual('20,5');
    });
});
