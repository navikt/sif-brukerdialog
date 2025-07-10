import { FeltValideringController } from '@navikt/k9-brukerdialog-prosessering-api';
import type { Friteksfelt } from '../types/validerFritekst';

/**
 * Validerer fritekstfelt mot k9-brukerdialog-prosessering-api
 *
 * @param friteksfelt Fritekstfeltet som skal valideres
 * @returns Promise med valideringsresultat
 * @throws Error hvis API-kallet feiler
 */
export const validerFritekst = async (friteksfelt: Friteksfelt) => {
    const response = await FeltValideringController.validerFriteksfelt({
        body: friteksfelt,
    });
    return response.data;
};
