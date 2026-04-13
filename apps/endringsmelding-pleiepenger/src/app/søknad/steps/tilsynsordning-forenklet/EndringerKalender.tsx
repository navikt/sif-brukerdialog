import { Box, Heading, VStack } from '@navikt/ds-react';
import {
    DateDurationMap,
    dateFormatter,
    DateRange,
    dateRangeToISODateRange,
    dateRangeUtils,
} from '@navikt/sif-common-utils';

import TidsbrukKalender from '../../../local-sif-common-pleiepenger/components/tidsbruk-kalender/TidsbrukKalender';
import { oppdaterDagerMedOmsorgstilbudIPeriode } from '../tilsynsordning/tilsynsordningStepUtils';
import { TilsynsordningPeriodeData } from './types';

interface Props {
    tidsrom: DateRange;
    endringer: TilsynsordningPeriodeData[];
}

export const EndringerKalender = ({ tidsrom, endringer }: Props) => {
    let endredeTilsynsdager: DateDurationMap = {};

    endringer.forEach((endring) => {
        const dagerIPeriode = oppdaterDagerMedOmsorgstilbudIPeriode({
            periode: endring.periode,
            tidFasteDager: endring.tidFasteDager,
        });
        endredeTilsynsdager = {
            ...endredeTilsynsdager,
            ...dagerIPeriode,
        };
    });

    const månederIPeriode = dateRangeUtils
        .getMonthsInDateRange(tidsrom)
        .filter(dateRangeUtils.dateRangeIncludesWeekdays);

    return (
        <VStack gap="space-16">
            {månederIPeriode.map((måned) => {
                return (
                    <Box
                        key={dateRangeToISODateRange(måned)}
                        borderColor="neutral-subtle"
                        borderRadius="4"
                        borderWidth="1"
                        padding="space-8"
                        paddingInline="space-16"
                        background="neutral-soft">
                        <VStack gap="space-4" paddingBlock="space-4 space-0">
                            <Heading level="5" size="xsmall">
                                {dateFormatter.MonthFullYear(måned.from)}
                            </Heading>
                            <TidsbrukKalender
                                måned={måned}
                                dagerMedTid={endredeTilsynsdager}
                                skjulTommeDagerIListe={false}
                                visOpprinneligTid={false}
                                skjulUkerMedKunUtilgjengeligeDager={true}
                            />
                        </VStack>
                    </Box>
                );
            })}
        </VStack>
    );
};
