import { StartdatoSøknadsdata } from '@app/types/Soknadsdata';

import { StartdatoFormValues } from './types';

export const toStartdatoFormValues = (
    søknadsdata: StartdatoSøknadsdata | undefined,
): Partial<StartdatoFormValues> => {
    if (!søknadsdata?.startdato) return {};
    return {
        startdato: søknadsdata.startdato,
    };
};

export const toStartdatoSøknadsdata = (data: StartdatoFormValues): StartdatoSøknadsdata => ({
    startdato: data.startdato!,
});