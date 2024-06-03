import { Accordion, Ingress } from '@navikt/ds-react';
import React from 'react';
import { DateRange, dateRangeToISODateRange, getDateToday, isDateInDateRange } from '@navikt/sif-common-utils';

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
                <Accordion className="w-full">
                    {dateRanges.map((dateRange, index) => {
                        return (
                            <Accordion.Item
                                key={dateRangeToISODateRange(dateRange)}
                                data-testid={`dateRangeAccordion_${index}`}
                                defaultOpen={erÅpen(dateRange, defaultOpenState)}>
                                <Accordion.Header data-testid={`dateRangeAccordion_${index}_header`}>
                                    <Ingress as="div" className="periodeHeader">
                                        {renderHeader(dateRange)}
                                    </Ingress>
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
