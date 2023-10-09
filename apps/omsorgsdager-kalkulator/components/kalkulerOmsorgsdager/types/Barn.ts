export enum AlderType {
    UNDER12 = 'under12',
    OVER12 = 'over12',
}

interface Barn {
    kroniskSykt?: boolean;
    alder?: AlderType;
    søkerHarAleneomsorgFor?: boolean;
    id: string;
}

export default Barn;
