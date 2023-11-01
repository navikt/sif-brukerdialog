import {
    ALENEOMSORG_KRONISK_SYKT_BARN_DAGER,
    ALENEOMSORGDAGER_1_2_BARN,
    ALENEOMSORGDAGER_3_ELLER_FLERE_BARN,
    GRUNNRETTSDAGER_3_ELLER_FLER_BARN,
    beregnOmsorgsdager,
} from './kalkulerOmsorgsdager';
import Barn, { AlderType } from './types/Barn';

interface OmsorgsdagerExpected {
    grunnrettExpected?: number;
    aleneomsorgExpected?: number;
    kroniskSyktExpected?: number;
    aleneomsorgKroniskSykeExpected?: number;
}

const isNumber = (value: any): boolean => typeof value === 'number';

const assertOmsorgsdager = (
    barn: Barn[],
    {
        grunnrettExpected,
        aleneomsorgExpected,
        kroniskSyktExpected,
        aleneomsorgKroniskSykeExpected,
    }: OmsorgsdagerExpected,
) => {
    const { grunnrett, aleneomsorg, kroniskSykt, aleneomsorgKroniskSyke } = beregnOmsorgsdager(barn);

    if (isNumber(grunnrettExpected)) {
        expect(grunnrett.normaldager).toEqual(grunnrettExpected);
    }
    if (isNumber(aleneomsorgExpected)) {
        expect(aleneomsorg.normaldager).toEqual(aleneomsorgExpected);
    }
    if (isNumber(kroniskSyktExpected)) {
        expect(kroniskSykt.normaldager).toEqual(kroniskSyktExpected);
    }
    if (isNumber(aleneomsorgKroniskSykeExpected)) {
        expect(aleneomsorgKroniskSyke.normaldager).toEqual(aleneomsorgKroniskSykeExpected);
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

        assertOmsorgsdager(barn, {
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
            assertOmsorgsdager(ettBarnOver12, expected);
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

            assertOmsorgsdager(ettBarnUnder12, expected);
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

            assertOmsorgsdager(ettKroniskSyktBarnOver12, expected);
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

            assertOmsorgsdager(barn, { aleneomsorgExpected: ALENEOMSORGDAGER_3_ELLER_FLERE_BARN });
        });
    });
});
