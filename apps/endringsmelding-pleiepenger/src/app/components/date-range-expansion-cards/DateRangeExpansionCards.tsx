import { ExpansionCard, VStack } from '@navikt/ds-react';
import {
    dateFormatter,
    DateRange,
    dateRangeToISODateRange,
    getDateToday,
    isDateInDateRange,
} from '@navikt/sif-common-utils';
import React from 'react';

type State = 'all' | 'none' | 'current';

interface Props<Type extends DateRange> {
    dateRanges: Type[];
    defaultOpenState?: State;
    renderContent: (periode: Type) => React.ReactNode;
    renderHeader: (periode: Type) => React.ReactNode;
}

const erÅpen = (periode: DateRange, defaultOpenState: State = 'none') => {
    switch (defaultOpenState) {
        case 'all':
            return true;
        case 'none':
            return false;
        case 'current':
            return isDateInDateRange(getDateToday(), periode);
    }
};

function DateRangeExpansionCards<Type extends DateRange>({
    dateRanges,
    defaultOpenState,
    renderContent,
    renderHeader,
}: Props<Type>) {
    return (
        <>
            {dateRanges.length === 1 ? (
                renderContent(dateRanges[0])
            ) : (
                <VStack gap="4">
                    {dateRanges.map((dateRange, index) => {
                        const ariaLabel = `${dateFormatter.full(dateRange.from)} - ${dateFormatter.full(dateRange.to)}`;
                        return (
                            <ExpansionCard
                                size="small"
                                aria-label={ariaLabel}
                                key={dateRangeToISODateRange(dateRange)}
                                data-testid={`dateRangeAccordion_${index}`}
                                defaultOpen={erÅpen(dateRange, defaultOpenState)}>
                                <ExpansionCard.Header data-testid={`dateRangeAccordion_${index}_header`}>
                                    <ExpansionCard.Title size="small">{renderHeader(dateRange)}</ExpansionCard.Title>
                                </ExpansionCard.Header>
                                <ExpansionCard.Content data-color="accent">
                                    {renderContent(dateRange)}
                                </ExpansionCard.Content>
                            </ExpansionCard>
                        );
                    })}
                </VStack>
            )}
        </>
    );
}
export default DateRangeExpansionCards;
