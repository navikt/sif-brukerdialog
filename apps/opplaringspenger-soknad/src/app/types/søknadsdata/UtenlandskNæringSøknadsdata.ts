import { UtenlandskNæring } from '@navikt/sif-common-forms-ds/src/forms/utenlandsk-næring';

export interface HarUtenlandskNæringSøknadsdata {
    type: 'harUtenlandskNæring';
    utenlandskNæring: UtenlandskNæring[];
}

export interface HarIkkeUtenlandskNæringSøknadsdata {
    type: 'harIkkeUtenlandskNæring';
}

export type UtenlandskNæringSøknadsdata = HarUtenlandskNæringSøknadsdata | HarIkkeUtenlandskNæringSøknadsdata;
