import { FeltValideringController, Friteksfelt } from '@navikt/k9-brukerdialog-prosessering-api';

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
