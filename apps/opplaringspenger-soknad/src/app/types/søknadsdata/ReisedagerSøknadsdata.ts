import { Enkeltdato } from '@navikt/sif-common-forms-ds/src';

export interface ReiserUtenforKursdagerSøknadsdata {
    reiserUtenforKursdager: true;
    reisedager: Enkeltdato[];
    reisedagerBeskrivelse: string;
}
export interface ReiserIkkeUtenforKursdagerSøknadsdata {
    reiserUtenforKursdager: false;
}

export type ReisedagerSøknadsdata = ReiserUtenforKursdagerSøknadsdata | ReiserIkkeUtenforKursdagerSøknadsdata;
