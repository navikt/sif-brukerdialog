import { OpptjeningIUtlandetApiData } from '../../types/søknad-api-data/SøknadApiData';
import { OpptjeningUtlandSøknadsdata } from '../../types/søknadsdata/OpptjeningUtlandSøknadsdata';
import { getCountryName } from '@navikt/sif-common-formik-ds/src';
import { dateToISODate } from '@navikt/sif-common-utils';

export const getOpptjeningIUtlandetSøknadsdata = (
    locale: string,
    opptjeningUtland?: OpptjeningUtlandSøknadsdata,
): OpptjeningIUtlandetApiData[] => {
    if (opptjeningUtland?.type === 'harOpptjeningUtland') {
        const apiData: OpptjeningIUtlandetApiData[] = opptjeningUtland.opptjeningUtland.map((opptjening) => ({
            navn: opptjening.navn,
            opptjeningType: opptjening.opptjeningType,
            land: {
                landnavn: getCountryName(opptjening.landkode, locale),
                landkode: opptjening.landkode,
            },
            fraOgMed: dateToISODate(opptjening.fom),
            tilOgMed: dateToISODate(opptjening.tom),
        }));

        return apiData;
    }

    return [];
};
