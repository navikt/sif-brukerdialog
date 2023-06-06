import { mapVirksomhetToVirksomhetApiData } from '@navikt/sif-common-forms-ds/lib/forms/virksomhet/mapVirksomhetToApiData';
import { SelvstendigApiData } from '../../types/søknadApiData/SelvstendigApiData';
import { ArbeidSelvstendigSøknadsdata } from '../../types/søknadsdata/ArbeidSelvstendigSøknadsdata';

export const getSelvstendigApiDataFromSøknadsdata = (selvstendig: ArbeidSelvstendigSøknadsdata): SelvstendigApiData => {
    switch (selvstendig.type) {
        case 'erIkkeSN':
            return {
                harInntektSomSelvstendig: false,
            };

        case 'erSN':
            const { virksomhet, harFlereVirksomheter } = selvstendig;
            const virksomhetApi = mapVirksomhetToVirksomhetApiData('nb', virksomhet, harFlereVirksomheter);
            return {
                harInntektSomSelvstendig: true,
                virksomhet: virksomhetApi,
            };
    }
};
