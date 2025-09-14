import { getK9BrukerdialogApiClient } from '../k9BrukerdialogApiClient';
import { InvalidParameterErrorResponse, invalidParameterErrorResponseSchema } from '../types/invalidParameter';

export const validerFritekst = async (value: string): Promise<InvalidParameterErrorResponse | undefined> => {
    try {
        await getK9BrukerdialogApiClient().post(`/valider/fritekstfelt`, { verdi: value });
    } catch (e) {
        if (e.response?.status === 400) {
            const parseResult = invalidParameterErrorResponseSchema.safeParse(e.response.data);
            if (parseResult.success) {
                return parseResult.data;
            }
        }
    }
};
