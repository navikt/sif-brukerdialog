import { mapVirksomhetToVirksomhetApiData } from '@navikt/sif-common-forms-ds/lib/forms/virksomhet/mapVirksomhetToApiData';
import { ArbeidSelvstendigSøknadsdata } from '../../types/søknadsdata/ArbeidSelvstendigSøknadsdata';
import { VirksomhetApiData } from '@navikt/sif-common-forms-ds/lib';

export const getSelvstendigApiDataFromSøknadsdata = (
    selvstendig: ArbeidSelvstendigSøknadsdata
): VirksomhetApiData | undefined => {
    switch (selvstendig.type) {
        case 'erIkkeSN':
            return undefined;

        case 'erSN':
            const { virksomhet, harFlereVirksomheter } = selvstendig;
            const virksomhetApi = mapVirksomhetToVirksomhetApiData('nb', virksomhet, harFlereVirksomheter);
            return virksomhetApi;
    }
};
