import { HStack } from '@navikt/ds-react';
import { dateFormatter } from '@navikt/sif-common-utils';
import { DeltakelsePeriode } from '@navikt/ung-common';
import YtelseHeader from '../../../components/ytelse-header/YtelseHeader';

interface Props {
    deltakelse: DeltakelsePeriode;
}

const DeltakelseHeader = ({ deltakelse }: Props) => {
    return (
        <YtelseHeader
            title="Din ungdomsytelse"
            description={
                <HStack gap="2">
                    Deltakerperioden startet {dateFormatter.dateShortMonthYear(deltakelse.programPeriode.from)}.
                </HStack>
            }
        />
    );
};

export default DeltakelseHeader;
