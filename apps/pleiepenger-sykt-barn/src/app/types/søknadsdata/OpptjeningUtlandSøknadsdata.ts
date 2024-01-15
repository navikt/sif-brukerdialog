import { OpptjeningUtland } from '@navikt/sif-common-forms-ds/src/forms/opptjening-utland';

export interface HarOpptjeningUtlandSøknadsdata {
    type: 'harOpptjeningUtland';
    opptjeningUtland: OpptjeningUtland[];
}

export interface HarIkkeOpptjeningUtlandSøknadsdata {
    type: 'harIkkeOpptjeningUtland';
}

export type OpptjeningUtlandSøknadsdata = HarOpptjeningUtlandSøknadsdata | HarIkkeOpptjeningUtlandSøknadsdata;
