import Barn, { AlderType } from '../components/kalkulerOmsorgsdager/types/Barn';
import Omsorgsprinsipper from '../components/kalkulerOmsorgsdager/types/Omsorgsprinsipper';
import { YesOrNo } from '../components/sif-formik/types';
import { BarnKalkulator } from '../components/kalkulator/Kalkulator';
import dayjs from 'dayjs';

export const getYear = (): number => dayjs().year();

export const erForbiDetTolvteKalenderår = (årFødt: number): boolean => getYear() - årFødt > 12;

export const erForbiDetAttendeKalenderår = (årFødt: number): boolean => getYear() - årFødt > 18;

export const barnetErForbiDetTolvteKalenderårOgIkkeKroniskSykt = (barn: BarnKalkulator): boolean =>
    erForbiDetTolvteKalenderår(barn.årFødt) && barn.kroniskSykt !== undefined && barn.kroniskSykt === YesOrNo.NO;

export const årFødtToAlderType = (årFødt: number): AlderType =>
    erForbiDetTolvteKalenderår(årFødt) ? AlderType.OVER12 : AlderType.UNDER12;

export const borIkkeSammen = (barn: BarnKalkulator): boolean =>
    barn.borSammen !== undefined && barn.borSammen === YesOrNo.NO;

export const excludeChild = (barn: BarnKalkulator): boolean =>
    erForbiDetAttendeKalenderår(barn.årFødt) ||
    barnetErForbiDetTolvteKalenderårOgIkkeKroniskSykt(barn) ||
    borIkkeSammen(barn);

export const includeChild = (barn: BarnKalkulator): boolean => !excludeChild(barn);

export const summerAntallOmsorgsdager = (result: Omsorgsprinsipper): number => {
    const { grunnrett, kroniskSykt, aleneomsorg, aleneomsorgKroniskSyke } = result;
    return (
        grunnrett.normaldager +
        kroniskSykt.normaldager +
        aleneomsorg.normaldager +
        aleneomsorgKroniskSyke.normaldager +
        grunnrett.koronadager +
        kroniskSykt.koronadager +
        aleneomsorg.koronadager +
        aleneomsorgKroniskSyke.koronadager
    );
};

export const mapBarnKalkulatorToBarn = (barn: BarnKalkulator[]): Barn[] => {
    const barnToBeregn: Barn[] = [];
    const filtrertBarn = barn.filter(includeChild);
    filtrertBarn.map((b) =>
        barnToBeregn.push({
            id: b.id,
            alder: årFødtToAlderType(b.årFødt),
            søkerHarAleneomsorgFor: b.aleneOmOmsorgen === YesOrNo.YES,
            kroniskSykt: b.kroniskSykt === YesOrNo.YES,
        }),
    );

    return barnToBeregn;
};
