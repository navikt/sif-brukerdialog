import { aktivitetspenger } from '@navikt/k9-brukerdialog-prosessering-api';
import { ISODate } from '@navikt/sif-common-utils';

export type BostedUtland = {
    fraOgMed: ISODate;
    tilOgMed: ISODate;
    landkode: string;
    landnavn: string;
};

export type BostedUtlandApiData = {
    harBoddIUtlandetSiste5År: boolean;
    bostedUtlandSiste5År?: BostedUtland[];
};

export type SøknadApiData = aktivitetspenger.Aktivitetspengersøknad & {
    forutgåendeMedlemskap: BostedUtlandApiData;
};
