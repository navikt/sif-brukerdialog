import { SoknadApiData, SoknadApiDataField } from '../../types/SoknadApiData';
import { MottakerFormData } from '../../types/SoknadFormData';

export type MottakerApiData = Pick<SoknadApiData, SoknadApiDataField.mottakerFnr | SoknadApiDataField.mottakerNavn>;

export const mapMottakerToApiData = ({ fnrMottaker, navnMottaker }: MottakerFormData): MottakerApiData => {
    return {
        mottakerFnr: fnrMottaker,
        mottakerNavn: navnMottaker,
    };
};
