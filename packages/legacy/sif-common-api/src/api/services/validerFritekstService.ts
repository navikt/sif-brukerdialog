import { k9BrukerdialogApiClient } from '../apiClient';
import { InvalidParameterErrorResponse, invalidParameterErrorResponse } from '../types/invalidParameter';

export const validerFritekst = async (value: string): Promise<InvalidParameterErrorResponse | undefined> => {
    try {
        await k9BrukerdialogApiClient.post(`/valider/fritekstfelt`, { verdi: value });
    } catch (e) {
        if (e !== null && typeof e === 'object' && 'response' in e) {
            const err = e as { response: { status: number; data: unknown } };
            if (err.response?.status === 400) {
                const parseResult = invalidParameterErrorResponse.safeParse(err.response.data);
                if (parseResult.success) {
                    return parseResult.data;
                }
            }
        }
    }
};
