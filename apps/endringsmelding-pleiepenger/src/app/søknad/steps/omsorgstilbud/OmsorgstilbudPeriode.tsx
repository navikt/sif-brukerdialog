import { Heading, VStack } from '@navikt/ds-react';
import { DateDurationMap, dateFormatter, DateRange, dateRangeUtils } from '@navikt/sif-common-utils';

import OmsorgstilbudMåned, {
    EnkeltdagChangeEvent,
} from '../../../local-sif-common-pleiepenger/components/omsorgstilbud-periode/OmsorgstilbudMåned';

interface Props {
    søknadsperiode: DateRange;
    endredeTilsynsdager?: DateDurationMap;
    opprinneligTilsynsdager: DateDurationMap;
    onEnkeltdagChange?: EnkeltdagChangeEvent;
}

const OmsorgstilbudPeriode = ({
    søknadsperiode,
    opprinneligTilsynsdager,
    endredeTilsynsdager = {},
    onEnkeltdagChange,
}: Props) => {
    const månederISøknadsperiode = dateRangeUtils.getMonthsInDateRange(søknadsperiode);
    return (
        <VStack gap="space-16">
            <Heading level="3" size="medium">
                Søknadsperioden {dateFormatter.dayCompactDate(søknadsperiode.from)} -{' '}
                {dateFormatter.dayCompactDate(søknadsperiode.to)}
            </Heading>

            <VStack gap="space-8">
                {månederISøknadsperiode.map((måned) => {
                    return (
                        <div key={måned.from.toDateString()}>
                            <OmsorgstilbudMåned
                                søknadsperiode={måned}
                                måned={måned}
                                tidOmsorgstilbud={endredeTilsynsdager}
                                tidOmsorgstilbudOpprinnelig={opprinneligTilsynsdager}
                                onEnkeltdagChange={onEnkeltdagChange}
                            />
                        </div>
                    );
                })}
            </VStack>
        </VStack>
    );
};

export default OmsorgstilbudPeriode;
