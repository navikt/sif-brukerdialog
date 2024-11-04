import { axiosConfig } from '@navikt/sif-common-api/src/api/apiClient';
import { getK9SakInnsynEnv } from '@navikt/sif-common-env';
import axios from 'axios';
import { getPerioderISøknadsperiodeHvorInstitusjonIkkeErGyldig } from '../søknad/steps/kurs/kursStepUtils';
import { Opplæringsinstitusjon } from '../types/Opplæringsinstitusjon';
import { getTillattSøknadsperiode } from '../utils/søknadsperiodeUtils';

export const k9SakApiClient = axios.create({
    ...axiosConfig,
    baseURL: getK9SakInnsynEnv().K9_SAK_INNSYN_FRONTEND_PATH,
});

export const opplæringsinstitusjonService = {
    fetch: async (): Promise<Opplæringsinstitusjon[]> => {
        const gyldigSøknadsperiode = getTillattSøknadsperiode();
        const response = await k9SakApiClient.get(`/k9sak/opplaringsinstitusjoner`);
        return response.data
            .map((institusjon) => {
                return {
                    ...institusjon,
                    ugyldigePerioder: getPerioderISøknadsperiodeHvorInstitusjonIkkeErGyldig(
                        institusjon.periode!,
                        gyldigSøknadsperiode,
                    ),
                };
            })
            .sort((a, b) => a.navn.localeCompare(b.navn));
    },
};
