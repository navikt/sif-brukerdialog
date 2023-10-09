import {
    ALENEOMSORG_KRONISK_SYKT_BARN_DAGER,
    ALENEOMSORGDAGER_1_2_BARN,
    ALENEOMSORGDAGER_3_ELLER_FLERE_BARN,
    GRUNNRETTSDAGER_3_ELLER_FLER_BARN,
    beregnOmsorgsdager,
    effektiveOverføringsdager,
    sumOverføringsdager,
} from './kalkulerOmsorgsdager';
import Barn, { AlderType } from './types/Barn';
import OmsorgsdagerForm from './types/OmsorgsdagerForm';
import Forelder from './types/Forelder';

interface OmsorgsdagerExpected {
    grunnrettExpected?: number;
    aleneomsorgExpected?: number;
    kroniskSyktExpected?: number;
    aleneomsorgKroniskSykeExpected?: number;
}

const isNumber = (value: any): boolean => typeof value === 'number';

const assertOmsorgsdagerInnenforKorona = (
    barn: Barn[],
    {
        grunnrettExpected,
        aleneomsorgExpected,
        kroniskSyktExpected,
        aleneomsorgKroniskSykeExpected,
    }: OmsorgsdagerExpected,
) => {
    const { grunnrett, aleneomsorg, kroniskSykt, aleneomsorgKroniskSyke } = beregnOmsorgsdager(barn, true);

    if (isNumber(grunnrettExpected)) {
        expect(grunnrett.normaldager).toEqual(grunnrettExpected);
        expect(grunnrett.koronadager).toEqual(grunnrettExpected);
    }
    if (isNumber(aleneomsorgExpected)) {
        expect(aleneomsorg.normaldager).toEqual(aleneomsorgExpected);
        expect(aleneomsorg.koronadager).toEqual(aleneomsorgExpected);
    }
    if (isNumber(kroniskSyktExpected)) {
        expect(kroniskSykt.normaldager).toEqual(kroniskSyktExpected);
        expect(kroniskSykt.koronadager).toEqual(kroniskSyktExpected);
    }
    if (isNumber(aleneomsorgKroniskSykeExpected)) {
        expect(aleneomsorgKroniskSyke.normaldager).toEqual(aleneomsorgKroniskSykeExpected);
        expect(aleneomsorgKroniskSyke.koronadager).toEqual(aleneomsorgKroniskSykeExpected);
    }
};

const assertOmsorgsdagerUtenforKorona = (
    barn: Barn[],
    {
        grunnrettExpected,
        aleneomsorgExpected,
        kroniskSyktExpected,
        aleneomsorgKroniskSykeExpected,
    }: OmsorgsdagerExpected,
) => {
    const { grunnrett, aleneomsorg, kroniskSykt, aleneomsorgKroniskSyke } = beregnOmsorgsdager(barn, false);

    if (isNumber(grunnrettExpected)) {
        expect(grunnrett.normaldager).toEqual(grunnrettExpected);
        expect(grunnrett.koronadager).toEqual(0);
    }
    if (isNumber(aleneomsorgExpected)) {
        expect(aleneomsorg.normaldager).toEqual(aleneomsorgExpected);
        expect(aleneomsorg.koronadager).toEqual(0);
    }
    if (isNumber(kroniskSyktExpected)) {
        expect(kroniskSykt.normaldager).toEqual(kroniskSyktExpected);
        expect(kroniskSykt.koronadager).toEqual(0);
    }
    if (isNumber(aleneomsorgKroniskSykeExpected)) {
        expect(aleneomsorgKroniskSyke.normaldager).toEqual(aleneomsorgKroniskSykeExpected);
        expect(aleneomsorgKroniskSyke.koronadager).toEqual(0);
    }
};

describe('omsorgsdager', () => {
    test('3 barn derav ett man har aleneomsorg for og er kronisk sykt', () => {
        const barn: Barn[] = [
            {
                søkerHarAleneomsorgFor: true,
                kroniskSykt: true,
                alder: AlderType.UNDER12,
                id: '1',
            },
            {
                alder: AlderType.UNDER12,
                id: '2',
            },
            {
                alder: AlderType.UNDER12,
                id: '3',
            },
        ];

        assertOmsorgsdagerInnenforKorona(barn, {
            grunnrettExpected: GRUNNRETTSDAGER_3_ELLER_FLER_BARN,
            aleneomsorgExpected: ALENEOMSORGDAGER_1_2_BARN,
            kroniskSyktExpected: 0,
            aleneomsorgKroniskSykeExpected: ALENEOMSORG_KRONISK_SYKT_BARN_DAGER,
        });

        assertOmsorgsdagerUtenforKorona(barn, {
            grunnrettExpected: GRUNNRETTSDAGER_3_ELLER_FLER_BARN,
            aleneomsorgExpected: ALENEOMSORGDAGER_1_2_BARN,
            kroniskSyktExpected: 0,
            aleneomsorgKroniskSykeExpected: ALENEOMSORG_KRONISK_SYKT_BARN_DAGER,
        });
    });

    describe('Bruker har aleneomsorg for barn', () => {
        test('får ikke aleneomsorgsdager hvis over 12', () => {
            const ettBarnOver12: Barn[] = [
                {
                    alder: AlderType.OVER12,
                    søkerHarAleneomsorgFor: true,
                    id: '1',
                },
            ];

            const expected = { aleneomsorgExpected: 0 };
            assertOmsorgsdagerInnenforKorona(ettBarnOver12, expected);
            assertOmsorgsdagerUtenforKorona(ettBarnOver12, expected);
        });

        test('får aleneomsorgsdager hvis under 12', () => {
            const ettBarnUnder12: Barn[] = [
                {
                    alder: AlderType.UNDER12,
                    søkerHarAleneomsorgFor: true,
                    id: '3',
                },
            ];

            const expected = { aleneomsorgExpected: ALENEOMSORGDAGER_1_2_BARN };
            assertOmsorgsdagerInnenforKorona(ettBarnUnder12, expected);
            assertOmsorgsdagerUtenforKorona(ettBarnUnder12, expected);
        });

        test('får aleneomsorgsdager hvis kronisk over 12', () => {
            const ettKroniskSyktBarnOver12: Barn[] = [
                {
                    alder: AlderType.OVER12,
                    kroniskSykt: true,
                    søkerHarAleneomsorgFor: true,
                    id: '2',
                },
            ];

            const expected = { aleneomsorgExpected: ALENEOMSORGDAGER_1_2_BARN };
            assertOmsorgsdagerUtenforKorona(ettKroniskSyktBarnOver12, expected);
            assertOmsorgsdagerInnenforKorona(ettKroniskSyktBarnOver12, expected);
        });

        test('får ekstra aleneomsorgsdager hvis man har 3 barn eller mer', () => {
            const barn: Barn[] = [
                {
                    søkerHarAleneomsorgFor: true,
                    alder: AlderType.UNDER12,
                    id: '1',
                },
                {
                    søkerHarAleneomsorgFor: true,
                    alder: AlderType.UNDER12,
                    id: '2',
                },
                {
                    søkerHarAleneomsorgFor: true,
                    alder: AlderType.UNDER12,
                    id: '3',
                },
            ];

            assertOmsorgsdagerInnenforKorona(barn, { aleneomsorgExpected: ALENEOMSORGDAGER_3_ELLER_FLERE_BARN });
            assertOmsorgsdagerUtenforKorona(barn, { aleneomsorgExpected: ALENEOMSORGDAGER_3_ELLER_FLERE_BARN });
        });
    });

    test('Overførte koronadager legges rett til i totalen', () => {
        const overføringsdager: Forelder[] = [
            {
                id: '1',
                koronadager: {
                    dagerTildelt: 10,
                    dagerFått: 20,
                },
            },
            {
                id: '2',
                koronadager: {
                    dagerTildelt: 5,
                    dagerFått: 7,
                },
            },
        ];

        const inkluderKoronadager = true;
        const dager = effektiveOverføringsdager(
            sumOverføringsdager(overføringsdager, inkluderKoronadager),
            10,
            inkluderKoronadager,
        );

        expect(dager.koronadager).toEqual(12);
    });

    test('Man får mellomlegget av tildelte dager og grunnretten, dersom tildelte dager er større enn grunnretten', () => {
        const barn: Barn[] = [
            {
                id: '1',
                alder: AlderType.UNDER12,
            },
        ];
        const mottattFlereDagerEnnGrunnrett: Forelder[] = [
            {
                id: '1',
                normaldager: {
                    dagerFått: 6,
                },
            },
            {
                id: '2',
                normaldager: {
                    dagerFått: 6,
                },
            },
        ];

        const inkluderKoronadager = false;
        const { grunnrett } = beregnOmsorgsdager(barn, inkluderKoronadager);
        const overførteNormaldager_flere = effektiveOverføringsdager(
            sumOverføringsdager(mottattFlereDagerEnnGrunnrett, inkluderKoronadager),
            grunnrett.normaldager,
            inkluderKoronadager,
        );
        expect(overførteNormaldager_flere.normaldager).toEqual(2);

        const mottattFærreDagerEnnGrunnrett = [
            {
                id: '1',
                normaldager: {
                    dagerFått: 8,
                },
            },
        ];

        const overførteNormaldager_færre = effektiveOverføringsdager(
            sumOverføringsdager(mottattFærreDagerEnnGrunnrett, inkluderKoronadager),
            grunnrett.normaldager,
            inkluderKoronadager,
        );
        expect(overførteNormaldager_færre.normaldager).toEqual(0);
    });

    test('Fordelte dager trekkes fra', () => {
        const ettBarnUnder12: Barn[] = [{ id: '3943339a-b27f-4e25-bcb3-a33581c71232', alder: AlderType.UNDER12 }];
        const fordeltMerEnnMottatt = [
            {
                id: '695d5c9b-dbb2-4c74-810a-7aff411d123d',
                normaldager: { dagerFått: 3, dagerTildelt: 8 },
                koronadager: { dagerFått: 2, dagerTildelt: 4 },
            },
        ];

        const inkluderKoronadager = true;
        const { grunnrett } = beregnOmsorgsdager(ettBarnUnder12, inkluderKoronadager);
        const overføringsdager = effektiveOverføringsdager(
            sumOverføringsdager(fordeltMerEnnMottatt, inkluderKoronadager),
            grunnrett.normaldager,
            inkluderKoronadager,
        );
        expect(overføringsdager.normaldager).toEqual(-8);
        expect(overføringsdager.koronadager).toEqual(-2);
    });

    test('Ignorerer forelder som ikke bare har positive heltall som input', () => {
        const inputverdier: OmsorgsdagerForm = {
            barn: [{ id: '1', alder: AlderType.UNDER12 }],
            foreldre: [
                {
                    id: '1',
                    normaldager: { dagerFått: -1, dagerTildelt: 3 },
                    koronadager: { dagerFått: 10, dagerTildelt: 0 },
                },
                {
                    id: '2',
                    normaldager: { dagerFått: 0, dagerTildelt: 0 },
                    koronadager: { dagerFått: 5, dagerTildelt: 0 },
                },
            ],
        };

        const inkluderKoronadager = true;
        const { grunnrett } = beregnOmsorgsdager(inputverdier.barn, inkluderKoronadager);
        const overføringsdager = effektiveOverføringsdager(
            sumOverføringsdager(inputverdier.foreldre, inkluderKoronadager),
            grunnrett.normaldager,
            inkluderKoronadager,
        );

        expect(overføringsdager.normaldager).toEqual(0);
        expect(overføringsdager.koronadager).toEqual(5);
    });

    test('Overføringsdager beregnes selv om ingen barn er gyldig utfylt', () => {
        const ingenBarnUtfylt: OmsorgsdagerForm = {
            barn: [{ id: '1' }],
            foreldre: [
                {
                    id: '1',
                    normaldager: {
                        dagerTildelt: 0,
                        dagerFått: 5,
                    },
                    koronadager: {
                        dagerTildelt: 0,
                        dagerFått: 10,
                    },
                },
            ],
        };

        const inkluderKoronadager = true;
        const { grunnrett } = beregnOmsorgsdager(ingenBarnUtfylt.barn, inkluderKoronadager);
        const overføringsdager = effektiveOverføringsdager(
            sumOverføringsdager(ingenBarnUtfylt.foreldre, inkluderKoronadager),
            grunnrett.normaldager,
            inkluderKoronadager,
        );

        expect(overføringsdager.normaldager).toEqual(5);
        expect(overføringsdager.koronadager).toEqual(10);
    });
});
