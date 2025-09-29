// DEPRECATED: Denne komponenten er utdatert og er erstattet av DateRanegeExpansionCard i komponentbiblioteket
import { Accordion } from '@navikt/ds-react';
import { DateRange, dateRangeToISODateRange, getDateToday, isDateInDateRange } from '@navikt/sif-common-utils';
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

function DateRangeAccordion<Type extends DateRange>({
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
                <Accordion className="w-full" size="medium">
                    {dateRanges.map((dateRange, index) => {
                        return (
                            <Accordion.Item
                                key={dateRangeToISODateRange(dateRange)}
                                data-testid={`dateRangeAccordion_${index}`}
                                defaultOpen={erÅpen(dateRange, defaultOpenState)}>
                                <Accordion.Header data-testid={`dateRangeAccordion_${index}_header`}>
                                    {renderHeader(dateRange)}
                                </Accordion.Header>
                                <Accordion.Content>{renderContent(dateRange)}</Accordion.Content>
                            </Accordion.Item>
                        );
                    })}
                </Accordion>
            )}
        </>
    );
}
export default DateRangeAccordion;
