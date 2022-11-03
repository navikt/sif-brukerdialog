import { YesOrNo } from '@navikt/sif-common-core-ds/lib/types/YesOrNo';
import { jsonSort } from '@navikt/sif-common-core-ds/lib/utils/jsonSort';
import { Arbeidssituasjon, DinSituasjonFormData, SoknadFormField } from '../../../types/SoknadFormData';
import { DinSituasjonApiData, mapDinSituasjonToApiData } from '../mapDinSituasjonToApiData';

describe('mapFormDataToApiData', () => {
    describe('mapDinSituasjonToApiData', () => {
        const mockData: DinSituasjonFormData = {
            erYrkesaktiv: YesOrNo.YES,
            arbeiderINorge: YesOrNo.YES,

            arbeidssituasjon: [Arbeidssituasjon.arbeidstaker],
            harBruktOmsorgsdagerIÅr: YesOrNo.YES,
            antallDagerBruktIÅr: '5',
        };
        it('maps standard formData correctly', () => {
            const expectedResult: DinSituasjonApiData = {
                erYrkesaktiv: true,
                arbeiderINorge: true,
                antallDagerBruktIÅr: 5,
                arbeidssituasjon: [Arbeidssituasjon.arbeidstaker],
            };
            const result = mapDinSituasjonToApiData(mockData);
            expect(JSON.stringify(jsonSort(result))).toEqual(JSON.stringify(jsonSort(expectedResult)));
        });
        it(`maps does not include ${SoknadFormField.antallDagerBruktIÅr} if ${SoknadFormField.harBruktOmsorgsdagerIÅr} === false`, () => {
            const expectedResult: DinSituasjonApiData = {
                erYrkesaktiv: true,
                arbeiderINorge: true,
                arbeidssituasjon: [Arbeidssituasjon.arbeidstaker],
            };
            const result = mapDinSituasjonToApiData({ ...mockData, harBruktOmsorgsdagerIÅr: YesOrNo.NO });
            expect(JSON.stringify(jsonSort(result))).toEqual(JSON.stringify(jsonSort(expectedResult)));
        });
    });
});
