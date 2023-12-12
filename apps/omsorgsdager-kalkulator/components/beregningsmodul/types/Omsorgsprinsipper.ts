export interface BarnResult {
    antallDager: number;
    barnIndex: number;
}
interface Omsorgsprinsipper {
    grunnrett: number;
    kroniskSykt: BarnResult[];
    kroniskSyktSumm: number;
    aleneomsorgKroniskSyke: BarnResult[];
    aleneomsorgKroniskSykeSumm: number;
    aleneomsorg: number;
    antallBarn: number;
}

export default Omsorgsprinsipper;
