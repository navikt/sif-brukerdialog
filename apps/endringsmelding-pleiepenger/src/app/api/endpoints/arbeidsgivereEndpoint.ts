import { ArbeidsgiverOrganisasjon } from '@navikt/sif-common-api';
import { DateRange, dateToISODate } from '@navikt/sif-common-utils';
import { ArbeidsgiverForEndring } from '@types';
import { getArbeidsgivereFromArbeidsgiverOrganisasjoner } from '../../utils/initialDataUtils';
import api from '../api';
import { ApiEndpointPsb } from './';

type AAregArbeidsgiver = {
    organisasjoner?: ArbeidsgiverOrganisasjon[];
};

export const arbeidsgivereEndpoint = {
    fetch: async (periode: DateRange): Promise<ArbeidsgiverForEndring[]> => {
        try {
            const { from, to } = periode;
            const { data } = await api.psb.get<AAregArbeidsgiver>(
                ApiEndpointPsb.arbeidsgiver,
                `ytelse=endringsmelding-pleiepenger&fra_og_med=${dateToISODate(from)}&til_og_med=${dateToISODate(to)}`,
            );
            return Promise.resolve(getArbeidsgivereFromArbeidsgiverOrganisasjoner(data.organisasjoner || []));
        } catch (error) {
            return Promise.reject(error);
        }
    },
};
