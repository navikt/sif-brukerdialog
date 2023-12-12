import Barn, { AlderType } from './types/Barn';
import Omsorgsprinsipper, { BarnResult } from './types/Omsorgsprinsipper';

export const GRUNNRETTSDAGER_1_2_BARN = 10;
export const GRUNNRETTSDAGER_3_ELLER_FLER_BARN = 15;

export const KRONISK_SYKT_BARN_DAGER = 10;
export const ALENEOMSORG_KRONISK_SYKT_BARN_DAGER: number = KRONISK_SYKT_BARN_DAGER * 2;

export const ALENEOMSORGDAGER_1_2_BARN = 10; // Eller midlertidig aleneomsorg
export const ALENEOMSORGDAGER_3_ELLER_FLERE_BARN = 15; // Eller midlertidig aleneomsorg

const harOmsorg = (barn: Barn): boolean => !!(barn.alder === AlderType.UNDER12 || barn.kroniskSykt);

export const grunnrettsdager = (barn: Barn[]): number => {
    const antallTellendeBarn = barn.filter(harOmsorg).length;
    if (antallTellendeBarn === 0) {
        return 0;
    }

    if (antallTellendeBarn < 3) {
        return GRUNNRETTSDAGER_1_2_BARN;
    }
    return GRUNNRETTSDAGER_3_ELLER_FLER_BARN;
};

export const kroniskSyktDagerSumm = (barn: Barn[]): number => {
    const kroniskOgDeltOmsorg = barn.filter((b) => b.kroniskSykt && !b.søkerHarAleneomsorgFor);
    const dager = KRONISK_SYKT_BARN_DAGER * kroniskOgDeltOmsorg.length;

    return dager;
};

export const kroniskSyktDager = (barn: Barn[]): BarnResult[] => {
    const barnResult: BarnResult[] = barn.map((b) => {
        const antallDager = b.kroniskSykt ? KRONISK_SYKT_BARN_DAGER : 0;
        return { antallDager, barnIndex: b.navn };
    });

    return barnResult.filter((b) => b.antallDager !== 0);
};

export const aleneomsorgKroniskSykeDagerSumm = (barn: Barn[]): number => {
    const kroniskOgAleneomsorg = barn.filter((b) => b.kroniskSykt && b.søkerHarAleneomsorgFor);
    const dager = ALENEOMSORG_KRONISK_SYKT_BARN_DAGER * kroniskOgAleneomsorg.length;

    return dager;
};

export const aleneomsorgKroniskSykeDager = (barn: Barn[]): BarnResult[] => {
    const barnResult: BarnResult[] = barn.map((b) => {
        const antallDager = b.kroniskSykt && b.søkerHarAleneomsorgFor ? ALENEOMSORG_KRONISK_SYKT_BARN_DAGER : 0;
        return { antallDager, barnIndex: b.navn };
    });

    return barnResult.filter((b) => b.antallDager !== 0);
};

export const aleneomsorgsdager = (barn: Barn[]): number => {
    const antallTellendeBarn = barn.filter(harOmsorg).filter((b) => b.søkerHarAleneomsorgFor).length;

    if (antallTellendeBarn === 0) {
        return 0;
    }
    if (antallTellendeBarn < 3) {
        return ALENEOMSORGDAGER_1_2_BARN;
    }
    return ALENEOMSORGDAGER_3_ELLER_FLERE_BARN;
};

export const beregnOmsorgsdager = (barn: Barn[] = []): Omsorgsprinsipper => {
    const barnMinimumUtfylt: Barn[] = barn.filter((b) => b.alder);

    return {
        grunnrett: grunnrettsdager(barnMinimumUtfylt),
        kroniskSykt: kroniskSyktDager(barnMinimumUtfylt),
        kroniskSyktSumm: kroniskSyktDagerSumm(barnMinimumUtfylt),
        aleneomsorg: aleneomsorgsdager(barnMinimumUtfylt),
        aleneomsorgKroniskSyke: aleneomsorgKroniskSykeDager(barnMinimumUtfylt),
        aleneomsorgKroniskSykeSumm: aleneomsorgKroniskSykeDagerSumm(barnMinimumUtfylt),
        antallBarn: barnMinimumUtfylt.length,
    };
};
