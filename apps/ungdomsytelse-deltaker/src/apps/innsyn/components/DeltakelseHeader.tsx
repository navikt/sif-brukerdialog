import { Deltakelse } from '../../../api/types';
import YtelseHeader from '../../../components/ytelse-header/YtelseHeader';
import { Box, HStack } from '@navikt/ds-react';
import { dateFormatter } from '@navikt/sif-common-utils';

interface Props {
    deltakelse: Deltakelse;
}

const DeltakelseHeader = ({ deltakelse }: Props) => {
    return (
        <YtelseHeader
            title="Din ungdomsytelse"
            description={
                <HStack gap="2">
                    <Box>
                        Deltakerperiode startet {dateFormatter.dateShortMonthYear(deltakelse.programPeriode.from)}.
                    </Box>
                    |<Box>x av 265 dager brukt.</Box>
                </HStack>
            }
        />
    );
};

export default DeltakelseHeader;
