import { Box, HGrid } from '@navikt/ds-react';
import { DurationWeekdays, Weekday } from '@navikt/sif-common-utils';

import { TidDag } from './TidDag';

interface Props {
    fasteDager: DurationWeekdays;
}

const TidUkedager = ({ fasteDager }: Props) => {
    return (
        <Box>
            <HGrid columns={{ sm: 5 }} gap={{ sm: 'space-0', xs: 'space-12' }}>
                <TidDag title="Mandag" tid={fasteDager[Weekday.monday] || { hours: '0' }} />
                <TidDag title="Tirsdag" tid={fasteDager[Weekday.tuesday] || { hours: '0' }} />
                <TidDag title="Onsdag" tid={fasteDager[Weekday.wednesday] || { hours: '0' }} />
                <TidDag title="Torsdag" tid={fasteDager[Weekday.thursday] || { hours: '0' }} />
                <TidDag title="Fredag" tid={fasteDager[Weekday.friday] || { hours: '0' }} />
            </HGrid>
        </Box>
    );
};

export default TidUkedager;
