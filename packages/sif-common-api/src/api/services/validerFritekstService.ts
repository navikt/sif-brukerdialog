import { k9BrukerdialogApiClient } from '../apiClient';
import { invalidParameterErrorResponse, InvalidParameterErrorResponse } from '../types/invalidParameter';

export const validerFritekst = async (value: string): Promise<InvalidParameterErrorResponse | undefined> => {
    try {
        await k9BrukerdialogApiClient.post(`/valider/fritekstfelt`, { verdi: value });
    } catch (e) {
        if (e.response?.status === 400) {
            const parseResult = invalidParameterErrorResponse.safeParse(e.response.data);
            if (parseResult.success) {
                return parseResult.data;
            }
        }
    }
};
