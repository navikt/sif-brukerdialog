import { AppEnvKey } from '../../../env.schema';
import { appEnv } from '../../utils/appEnv';
import { personaliaApiDataSchema } from '../schemas/personaliaSchema';
import { PersonaliaApiData } from '../types';

export const personaliaService = {
    fetch: async (): Promise<PersonaliaApiData | undefined> => {
        try {
            const response = await fetch(appEnv[AppEnvKey.SIF_PUBLIC_PERSONALIA_URL]);
            if (!response.ok) {
                throw new Error(`Failed to fetch personalia: ${response.status}`);
            }
            const json = await response.json();
            return await personaliaApiDataSchema.parse(json);
        } catch (e) {
            console.log(e);
            return undefined;
        }
    },
};
