import { YesOrNo } from '@navikt/sif-common-core-ds/lib/types/YesOrNo';
import { getNumberFromNumberInputValue } from '@navikt/sif-common-formik-ds/lib';
import { SoknadApiData, SoknadApiDataField } from '../../types/SoknadApiData';
import { DinSituasjonFormData } from '../../types/SoknadFormData';

export type DinSituasjonApiData = Pick<
    SoknadApiData,
    | SoknadApiDataField.erYrkesaktiv
    | SoknadApiDataField.arbeiderINorge
    | SoknadApiDataField.arbeidssituasjon
    | SoknadApiDataField.antallDagerBruktIÅr
>;

export const mapDinSituasjonToApiData = (formData: DinSituasjonFormData): DinSituasjonApiData | undefined => {
    const harBruktOmsorgsdagerIÅr = formData.harBruktOmsorgsdagerIÅr === YesOrNo.YES;
    const antallDagerBruktIÅr = getNumberFromNumberInputValue(formData.antallDagerBruktIÅr);

    if (harBruktOmsorgsdagerIÅr && antallDagerBruktIÅr === undefined) {
        return undefined;
    }

    return {
        erYrkesaktiv: formData.erYrkesaktiv === YesOrNo.YES,
        arbeiderINorge: formData.arbeiderINorge === YesOrNo.YES,
        arbeidssituasjon: formData.arbeidssituasjon,
        antallDagerBruktIÅr: harBruktOmsorgsdagerIÅr ? antallDagerBruktIÅr : undefined,
    };
};
