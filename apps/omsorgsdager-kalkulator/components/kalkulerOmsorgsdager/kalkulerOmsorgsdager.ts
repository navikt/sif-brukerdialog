import Omsorgsdager from './types/Omsorgsdager';
import Barn, { AlderType } from './types/Barn';
import Omsorgsprinsipper from './types/Omsorgsprinsipper';

export const GRUNNRETTSDAGER_1_2_BARN = 10;
export const GRUNNRETTSDAGER_3_ELLER_FLER_BARN = 15;

export const KRONISK_SYKT_BARN_DAGER = 10;
export const ALENEOMSORG_KRONISK_SYKT_BARN_DAGER: number = KRONISK_SYKT_BARN_DAGER * 2;

export const ALENEOMSORGDAGER_1_2_BARN = 10; // Eller midlertidig aleneomsorg
export const ALENEOMSORGDAGER_3_ELLER_FLERE_BARN = 15; // Eller midlertidig aleneomsorg

const harOmsorg = (barn: Barn): boolean => !!(barn.alder === AlderType.UNDER12 || barn.kroniskSykt);

export const grunnrettsdager = (barn: Barn[]): Omsorgsdager => {
    const antallTellendeBarn = barn.filter(harOmsorg).length;
    if (antallTellendeBarn === 0) {
        return { normaldager: 0 };
    }

    if (antallTellendeBarn < 3) {
        return {
            normaldager: GRUNNRETTSDAGER_1_2_BARN,
        };
    }
    return {
        normaldager: GRUNNRETTSDAGER_3_ELLER_FLER_BARN,
    };
};

export const kroniskSyktDager = (barn: Barn[]): Omsorgsdager => {
    const kroniskOgDeltOmsorg = barn.filter((b) => b.kroniskSykt && !b.søkerHarAleneomsorgFor);
    const dager = KRONISK_SYKT_BARN_DAGER * kroniskOgDeltOmsorg.length;

    return { normaldager: dager };
};

export const aleneomsorgKroniskSykeDager = (barn: Barn[]): Omsorgsdager => {
    const kroniskOgAleneomsorg = barn.filter((b) => b.kroniskSykt && b.søkerHarAleneomsorgFor);
    const dager = ALENEOMSORG_KRONISK_SYKT_BARN_DAGER * kroniskOgAleneomsorg.length;

    return { normaldager: dager };
};

export const aleneomsorgsdager = (barn: Barn[]): Omsorgsdager => {
    const antallTellendeBarn = barn.filter(harOmsorg).filter((b) => b.søkerHarAleneomsorgFor).length;

    if (antallTellendeBarn === 0) {
        return { normaldager: 0 };
    }
    if (antallTellendeBarn < 3) {
        return {
            normaldager: ALENEOMSORGDAGER_1_2_BARN,
        };
    }
    return {
        normaldager: ALENEOMSORGDAGER_3_ELLER_FLERE_BARN,
    };
};

export const beregnOmsorgsdager = (barn: Barn[] = []): Omsorgsprinsipper => {
    const barnMinimumUtfylt: Barn[] = barn.filter((b) => b.alder);

    return {
        grunnrett: grunnrettsdager(barnMinimumUtfylt),
        kroniskSykt: kroniskSyktDager(barnMinimumUtfylt),
        aleneomsorg: aleneomsorgsdager(barnMinimumUtfylt),
        aleneomsorgKroniskSyke: aleneomsorgKroniskSykeDager(barnMinimumUtfylt),
    };
};
