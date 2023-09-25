import { UtenlandskNæring } from '@navikt/sif-common-forms-ds/lib/forms/utenlandsk-næring';

export interface HarUtenlandskNæringSøknadsdata {
    type: 'harUtenlandskNæring';
    utenlandskNæring: UtenlandskNæring[];
}

export interface HarIkkeUtenlandskNæringSøknadsdata {
    type: 'harIkkeUtenlandskNæring';
}

export type UtenlandskNæringSøknadsdata = HarUtenlandskNæringSøknadsdata | HarIkkeUtenlandskNæringSøknadsdata;
