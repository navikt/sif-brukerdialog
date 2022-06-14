import { YesOrNo } from '@navikt/sif-common-core/lib/types/YesOrNo';
import { getNumberFromNumberInputValue } from '@navikt/sif-common-formik/lib';
import { SoknadApiData, SoknadApiDataField } from '../../types/SoknadApiData';
import { DinSituasjonFormData } from '../../types/SoknadFormData';

export type DinSituasjonApiData = Pick<
    SoknadApiData,
    | SoknadApiDataField.erYrkesaktiv
    | SoknadApiDataField.arbeiderINorge
    | SoknadApiDataField.arbeidssituasjon
    | SoknadApiDataField.antallDagerBruktEtter1Juli
>;

export const mapDinSituasjonToApiData = (formData: DinSituasjonFormData): DinSituasjonApiData | undefined => {
    const harBruktOmsorgsdagerEtter1Juli = formData.harBruktOmsorgsdagerEtter1Juli === YesOrNo.YES;
    const antallDagerBruktEtter1Juli = getNumberFromNumberInputValue(formData.antallDagerBruktEtter1Juli);

    if (harBruktOmsorgsdagerEtter1Juli && antallDagerBruktEtter1Juli === undefined) {
        return undefined;
    }

    return {
        erYrkesaktiv: formData.erYrkesaktiv === YesOrNo.YES,
        arbeiderINorge: formData.arbeiderINorge === YesOrNo.YES,
        arbeidssituasjon: formData.arbeidssituasjon,
        antallDagerBruktEtter1Juli: harBruktOmsorgsdagerEtter1Juli ? antallDagerBruktEtter1Juli : undefined,
    };
};
