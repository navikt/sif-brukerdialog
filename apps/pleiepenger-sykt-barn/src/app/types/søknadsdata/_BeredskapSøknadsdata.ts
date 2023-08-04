export interface HarBeredskapSøknadsdata {
    type: 'harBeredskap';
    harBeredskap: true;
    harBeredskap_ekstrainfo?: string;
}

export interface HarIkkeBeredskapSøknadsdata {
    type: 'harIkkeBeredskap';
    harBeredskap: false;
}

export type BeredskapSøknadsdata = HarBeredskapSøknadsdata | HarIkkeBeredskapSøknadsdata;
