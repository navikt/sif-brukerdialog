import { OpptjeningIUtlandetApi } from '../../types/søknadApiData/SøknadApiData';
import { OpptjeningUtlandSøknadsdata } from '../../types/søknadsdata/OpptjeningUtlandSøknadsdata';
import { dateToISODate } from '@navikt/sif-common-utils';
import { getCountryName } from '@navikt/sif-common-formik-ds';

export const getOpptjeningUtlandApiDataFromSøknadsdata = (
    locale: string,
    opptjeningUtlandSøknadsdata: OpptjeningUtlandSøknadsdata,
): OpptjeningIUtlandetApi[] => {
    switch (opptjeningUtlandSøknadsdata.type) {
        case 'harIkkeOpptjeningUtland':
            return [];
        case 'harOpptjeningUtland': {
            const apiData: OpptjeningIUtlandetApi[] = opptjeningUtlandSøknadsdata.opptjeningUtland.map(
                (opptjening) => ({
                    navn: opptjening.navn,
                    opptjeningType: opptjening.opptjeningType,
                    land: {
                        landnavn: getCountryName(opptjening.landkode, locale),
                        landkode: opptjening.landkode,
                    },
                    fraOgMed: dateToISODate(opptjening.fom),
                    tilOgMed: dateToISODate(opptjening.tom),
                }),
            );
            return apiData;
        }
    }
};
