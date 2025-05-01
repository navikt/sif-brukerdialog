import { HStack } from '@navikt/ds-react';
import { dateFormatter } from '@navikt/sif-common-utils';
import YtelseHeader from './ytelse-header/YtelseHeader';

interface Props {
    deltakelsePeriode;
}

const DeltakelseHeader = ({ deltakelsePeriode }: Props) => {
    return (
        <YtelseHeader
            title="Din ungdomsprogramytelse"
            description={
                <HStack gap="2">
                    Deltakerperioden startet {dateFormatter.dateShortMonthYear(deltakelsePeriode.programPeriode.from)}.
                </HStack>
            }
        />
    );
};

export default DeltakelseHeader;
