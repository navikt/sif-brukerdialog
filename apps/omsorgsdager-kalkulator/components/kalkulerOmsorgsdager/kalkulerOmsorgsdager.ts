import Omsorgsdager from './types/Omsorgsdager';
import Barn, { AlderType } from './types/Barn';
import Omsorgsprinsipper from './types/Omsorgsprinsipper';
import Forelder from './types/Forelder';
import Overføringsdager from './types/Overføringsdager';

export const GRUNNRETTSDAGER_1_2_BARN = 10;
export const GRUNNRETTSDAGER_3_ELLER_FLER_BARN = 15;

export const KRONISK_SYKT_BARN_DAGER = 10;
export const ALENEOMSORG_KRONISK_SYKT_BARN_DAGER: number = KRONISK_SYKT_BARN_DAGER * 2;

export const ALENEOMSORGDAGER_1_2_BARN = 10; // Eller midlertidig aleneomsorg
export const ALENEOMSORGDAGER_3_ELLER_FLERE_BARN = 15; // Eller midlertidig aleneomsorg

export const erPositivtHeltall = (value: number): boolean => {
    if (!value) {
        return true;
    }
    if (value < 0) {
        return false;
    }
    if (value % 1 !== 0) {
        return false;
    }
    return true;
};

const harOmsorg = (barn: Barn): boolean => !!(barn.alder === AlderType.UNDER12 || barn.kroniskSykt);

export const grunnrettsdager = (barn: Barn[], inkluderKoronadager: boolean): Omsorgsdager => {
    const antallTellendeBarn = barn.filter(harOmsorg).length;
    if (antallTellendeBarn === 0) {
        return { normaldager: 0, koronadager: 0 };
    }

    const koronafaktor = inkluderKoronadager ? 1 : 0;

    if (antallTellendeBarn < 3) {
        return {
            normaldager: GRUNNRETTSDAGER_1_2_BARN,
            koronadager: GRUNNRETTSDAGER_1_2_BARN * koronafaktor,
        };
    }
    return {
        normaldager: GRUNNRETTSDAGER_3_ELLER_FLER_BARN,
        koronadager: GRUNNRETTSDAGER_3_ELLER_FLER_BARN * koronafaktor,
    };
};

export const kroniskSyktDager = (barn: Barn[], inkluderKoronadager: boolean): Omsorgsdager => {
    const kroniskOgDeltOmsorg = barn.filter((b) => b.kroniskSykt && !b.søkerHarAleneomsorgFor);
    const dager = KRONISK_SYKT_BARN_DAGER * kroniskOgDeltOmsorg.length;
    const koronafaktor = inkluderKoronadager ? 1 : 0;

    return { normaldager: dager, koronadager: dager * koronafaktor };
};

export const aleneomsorgKroniskSykeDager = (barn: Barn[], inkluderKoronadager: boolean): Omsorgsdager => {
    const kroniskOgAleneomsorg = barn.filter((b) => b.kroniskSykt && b.søkerHarAleneomsorgFor);
    const dager = ALENEOMSORG_KRONISK_SYKT_BARN_DAGER * kroniskOgAleneomsorg.length;
    const koronafaktor = inkluderKoronadager ? 1 : 0;

    return { normaldager: dager, koronadager: dager * koronafaktor };
};

export const aleneomsorgsdager = (barn: Barn[], inkluderKoronadager: boolean): Omsorgsdager => {
    const antallTellendeBarn = barn.filter(harOmsorg).filter((b) => b.søkerHarAleneomsorgFor).length;
    const koronafaktor = inkluderKoronadager ? 1 : 0;

    if (antallTellendeBarn === 0) {
        return { normaldager: 0, koronadager: 0 };
    }
    if (antallTellendeBarn < 3) {
        return {
            normaldager: ALENEOMSORGDAGER_1_2_BARN,
            koronadager: ALENEOMSORGDAGER_1_2_BARN * koronafaktor,
        };
    }
    return {
        normaldager: ALENEOMSORGDAGER_3_ELLER_FLERE_BARN,
        koronadager: ALENEOMSORGDAGER_3_ELLER_FLERE_BARN * koronafaktor,
    };
};

const bareGyldigeDager = (forelder: Forelder): boolean =>
    [
        forelder.normaldager?.dagerTildelt,
        forelder.normaldager?.dagerFått,
        forelder.koronadager?.dagerFått,
        forelder.koronadager?.dagerTildelt,
    ].every((dager) => erPositivtHeltall(dager || 0));

export const effektiveOverføringsdager = (
    { overførteKoronadager, mottatteKoronadager, fordelteNormaldager, mottatteNormaldager }: Overføringsdager,
    grunnrettsdager: number,
    inkluderKoronadager: boolean,
): Omsorgsdager => {
    const dagerMottattEtterGrunnretten =
        mottatteNormaldager > grunnrettsdager ? mottatteNormaldager - grunnrettsdager : 0;

    return {
        koronadager: inkluderKoronadager ? mottatteKoronadager - overførteKoronadager : 0,
        normaldager: dagerMottattEtterGrunnretten - fordelteNormaldager,
    };
};

export const sumOverføringsdager = (foreldre: Forelder[], inkluderKoronadager: boolean): Overføringsdager =>
    foreldre.filter(bareGyldigeDager).reduce(
        (tmpDager, forelder) => ({
            overførteKoronadager: inkluderKoronadager
                ? tmpDager.overførteKoronadager + (forelder.koronadager?.dagerTildelt || 0)
                : 0,
            mottatteKoronadager: inkluderKoronadager
                ? tmpDager.mottatteKoronadager + (forelder.koronadager?.dagerFått || 0)
                : 0,
            mottatteNormaldager: tmpDager.mottatteNormaldager + (forelder.normaldager?.dagerFått || 0),
            fordelteNormaldager: tmpDager.fordelteNormaldager + (forelder.normaldager?.dagerTildelt || 0),
        }),
        {
            overførteKoronadager: 0,
            mottatteKoronadager: 0,
            mottatteNormaldager: 0,
            fordelteNormaldager: 0,
        },
    );

export const beregnOmsorgsdager = (barn: Barn[] = [], inkluderKoronadager: boolean): Omsorgsprinsipper => {
    const barnMinimumUtfylt: Barn[] = barn.filter((b) => b.alder);

    return {
        grunnrett: grunnrettsdager(barnMinimumUtfylt, inkluderKoronadager),
        kroniskSykt: kroniskSyktDager(barnMinimumUtfylt, inkluderKoronadager),
        aleneomsorg: aleneomsorgsdager(barnMinimumUtfylt, inkluderKoronadager),
        aleneomsorgKroniskSyke: aleneomsorgKroniskSykeDager(barnMinimumUtfylt, inkluderKoronadager),
    };
};
