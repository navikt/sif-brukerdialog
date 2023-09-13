export interface HarNattevåkSøknadsdata {
    type: 'harNattevåk';
    harNattevåk: true;
    harNattevåk_ekstrainfo?: string;
}

export interface HarIkkeNattevåkSøknadsdata {
    type: 'harIkkeNattevåk';
    harNattevåk: false;
}

export type NattevåkSøknadsdata = HarNattevåkSøknadsdata | HarIkkeNattevåkSøknadsdata;
