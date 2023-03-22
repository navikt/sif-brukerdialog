import { Accordion, Ingress } from '@navikt/ds-react';
import React, { ReactNode } from 'react';
import { DateRange, dateRangeToISODateRange } from '@navikt/sif-common-utils/lib';

interface Props<Type extends DateRange> {
    header?: ReactNode;
    perioder: Type[];
    defaultOpen?: boolean;
    renderContent: (periode: Type) => React.ReactNode;
    renderHeader: (periode: Type) => React.ReactNode;
}

function PerioderAccordion<Type extends DateRange>({
    header,
    perioder,
    defaultOpen,
    renderContent,
    renderHeader,
}: Props<Type>) {
    return (
        <>
            {header}
            <div
                style={
                    header
                        ? { borderTop: '2px solid var(--ac-accordion-header-border, var(--a-border-strong)' }
                        : undefined
                }>
                {perioder.length === 1 ? (
                    renderContent(perioder[0])
                ) : (
                    <Accordion style={{ width: '100%' }}>
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
            </div>
        </>
    );
}
export default PerioderAccordion;
