import { commonRequestHeader } from '@sif/api';

import { SøknadApiData } from '../types/SoknadApiData';

export const sendSøknad = async (data: SøknadApiData): Promise<any> => {
    const response = await fetch('/sif-demo/api/aktivitetspenger/soknad/innsending', {
        method: 'POST',
        headers: {
            ...commonRequestHeader,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error(`sendSøknad feilet med status ${response.status}`);
    }
};
