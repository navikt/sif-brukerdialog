import { Accordion, Ingress } from '@navikt/ds-react';
import React from 'react';
import { DateRange, dateRangeToISODateRange } from '@navikt/sif-common-utils/lib';

interface Props<Type extends DateRange> {
    perioder: Type[];
    defaultOpen?: boolean;
    renderContent: (periode: Type) => React.ReactNode;
    renderHeader: (periode: Type) => React.ReactNode;
}

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
                                defaultOpen={defaultOpen}>
                                <Accordion.Header data-testid={`periode_${index}_header`}>
                                    <Ingress as="span" className="periodeHeader">
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
