import { Accordion, Ingress } from '@navikt/ds-react';
import React from 'react';
import { DateRange, dateRangeToISODateRange } from '@navikt/sif-common-utils/lib';

interface Props<Type extends DateRange> {
    perioder: Type[];
    renderContent: (periode: Type) => React.ReactNode;
    renderHeader: (periode: Type) => React.ReactNode;
}

function PerioderAccordion<Type extends DateRange>({ perioder, renderContent, renderHeader }: Props<Type>) {
    return (
        <div style={{ borderTop: '2px solid var(--ac-accordion-header-border, var(--a-border-strong)' }}>
            <Accordion style={{ width: '100%' }}>
                {perioder.map((periode, index) => {
                    return (
                        <Accordion.Item
                            key={dateRangeToISODateRange(periode)}
                            data-testid={`periode_${index}`}
                            defaultOpen={true}>
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
        </div>
    );
}
export default PerioderAccordion;
