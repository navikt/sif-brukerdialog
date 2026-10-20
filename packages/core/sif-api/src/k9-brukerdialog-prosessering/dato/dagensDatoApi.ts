import { aktivitetspenger } from '@sif/k9-brukerdialog-prosessering-api';
import type { ISODate } from '@sif/utils';

import { handleApiError } from '../../shared/errorHandlers';
import { zISODate } from '../../shared/zDateSchemas';

const dagensDatoSchema = aktivitetspenger.zDagensDatoResponse.extend({
    dato: zISODate,
});

export const hentDagensDato = async (): Promise<ISODate> => {
    try {
        const response = await aktivitetspenger.DatoController.dagensDato();
        return dagensDatoSchema.parse(response.data).dato;
    } catch (e) {
        throw handleApiError(e, 'hentDagensDato');
    }
};
