import { YesOrNo } from '@navikt/sif-common-core/lib/types/YesOrNo';
import { jsonSort } from '@navikt/sif-common-core/lib/utils/jsonSort';
import { Arbeidssituasjon, DinSituasjonFormData, SoknadFormField } from '../../../types/SoknadFormData';
import { DinSituasjonApiData, mapDinSituasjonToApiData } from '../mapDinSituasjonToApiData';

describe('mapFormDataToApiData', () => {
    describe('mapDinSituasjonToApiData', () => {
        const mockData: DinSituasjonFormData = {
            erYrkesaktiv: YesOrNo.YES,
            arbeiderINorge: YesOrNo.YES,

            arbeidssituasjon: [Arbeidssituasjon.arbeidstaker],
            harBruktOmsorgsdagerEtter1Juli: YesOrNo.YES,
            antallDagerBruktEtter1Juli: '5',
        };
        it('maps standard formData correctly', () => {
            const expectedResult: DinSituasjonApiData = {
                erYrkesaktiv: true,
                arbeiderINorge: true,

                antallDagerBruktEtter1Juli: 5,
                arbeidssituasjon: [Arbeidssituasjon.arbeidstaker],
            };
            const result = mapDinSituasjonToApiData(mockData);
            expect(JSON.stringify(jsonSort(result))).toEqual(JSON.stringify(jsonSort(expectedResult)));
        });
        it(`maps does not include ${SoknadFormField.antallDagerBruktEtter1Juli} if ${SoknadFormField.harBruktOmsorgsdagerEtter1Juli} === false`, () => {
            const expectedResult: DinSituasjonApiData = {
                erYrkesaktiv: true,
                arbeiderINorge: true,
                arbeidssituasjon: [Arbeidssituasjon.arbeidstaker],
            };
            const result = mapDinSituasjonToApiData({ ...mockData, harBruktOmsorgsdagerEtter1Juli: YesOrNo.NO });
            expect(JSON.stringify(jsonSort(result))).toEqual(JSON.stringify(jsonSort(expectedResult)));
        });
    });
});
