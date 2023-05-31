import { OpptjeningUtland } from '@navikt/sif-common-forms-ds/lib/forms/opptjening-utland';
import { guid, ISODateToDate } from '@navikt/sif-common-utils/lib';
import { OpptjeningIUtlandetApiData } from '../../types/søknad-api-data/SøknadApiData';

export const mapOpptjeningIUtlandetApiDataToOpptjeningUtland = ({
    fraOgMed,
    tilOgMed,
    land,
    navn,
    opptjeningType,
}: OpptjeningIUtlandetApiData): OpptjeningUtland => {
    return {
        id: guid(),
        fom: ISODateToDate(fraOgMed),
        tom: ISODateToDate(tilOgMed),
        landkode: land.landkode,
        navn,
        opptjeningType,
    };
};
