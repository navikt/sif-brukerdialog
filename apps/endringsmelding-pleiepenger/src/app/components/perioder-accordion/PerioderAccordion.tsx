import { Accordion, Ingress } from '@navikt/ds-react';
import React from 'react';
import { DateRange, dateRangeToISODateRange, dateToday, isDateInDateRange } from '@navikt/sif-common-utils/lib';

type ÅpenType = 'all' | 'none' | 'current';
interface Props<Type extends DateRange> {
    perioder: Type[];
    defaultOpen?: ÅpenType;
    renderContent: (periode: Type) => React.ReactNode;
    renderHeader: (periode: Type) => React.ReactNode;
}

const erÅpen = (periode: DateRange, defaultOpen: ÅpenType = 'none') => {
    switch (defaultOpen) {
        case 'all':
            return true;
        case 'none':
            return false;
        case 'current':
            return isDateInDateRange(dateToday, periode);
    }
};

function PerioderAccordion<Type extends DateRange>({
    perioder,
    defaultOpen,
    renderContent,
    renderHeader,
}: Props<Type>) {
    return (
        <>
            {perioder.length === 1 ? (
                renderContent(perioder[0])
            ) : (
                <Accordion className="w-full">
                    {perioder.map((periode, index) => {
                        return (
                            <Accordion.Item
                                key={dateRangeToISODateRange(periode)}
                                data-testid={`periode_${index}`}
                                defaultOpen={erÅpen(periode, defaultOpen)}>
                                <Accordion.Header data-testid={`periode_${index}_header`}>
                                    <Ingress as="div" className="periodeHeader">
                                        {renderHeader(periode)}
                                    </Ingress>
                                </Accordion.Header>
                                <Accordion.Content>{renderContent(periode)}</Accordion.Content>
                            </Accordion.Item>
                        );
                    })}
                </Accordion>
            )}
        </>
    );
}
export default PerioderAccordion;
