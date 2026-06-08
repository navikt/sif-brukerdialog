import { PlusCircleIcon } from '@navikt/aksel-icons';
import { Button, HStack, Process, ProcessProps } from '@navikt/ds-react';
import { usePagination } from '@navikt/sif-common-hooks';

import { ProcessStepData } from '../../types/ProcessStepData';
import { formatSakshendelseTidspunkt } from '../../utils/sakUtils';

interface Props {
    steps: ProcessStepData[];
    isTruncated?: ProcessProps['isTruncated'];
    pageSize?: number;
}

const getStatusISakStepStatus = (step: ProcessStepData): 'completed' | 'active' | 'uncompleted' => {
    if (step.current) {
        return 'active';
    } else if (step.completed) {
        return 'completed';
    }
    return 'uncompleted';
};

const StatusISakSteps = ({ steps, isTruncated, pageSize }: Props) => {
    const { visibleItems, hasMoreItems, showMoreItems, showAllItems } = usePagination<ProcessStepData>(
        steps,
        pageSize ?? steps.length,
    );

    const getTidspunkt = (step: ProcessStepData): string | undefined => {
        if (step.timestamp) {
            return formatSakshendelseTidspunkt(step.timestamp);
        }
    };

    return (
        <>
            <Process isTruncated={hasMoreItems ? 'end' : isTruncated}>
                {visibleItems.map((step, idx) => {
                    return (
                        <Process.Event
                            key={idx}
                            status={getStatusISakStepStatus(step)}
                            title={step.title}
                            timestamp={getTidspunkt(step)}>
                            {step.content}
                        </Process.Event>
                    );
                })}
            </Process>
            {hasMoreItems && (
                <HStack gap="space-8" marginBlock="space-16 space-0">
                    <Button
                        size="small"
                        variant="tertiary"
                        icon={<PlusCircleIcon role="presentation" aria-hidden={true} />}
                        type="button"
                        onClick={showMoreItems}>
                        Vis flere
                    </Button>
                    <Button
                        size="small"
                        variant="tertiary"
                        icon={<PlusCircleIcon role="presentation" aria-hidden={true} />}
                        type="button"
                        onClick={showAllItems}>
                        Vis alle ({steps.length})
                    </Button>
                </HStack>
            )}
        </>
    );
};

export default StatusISakSteps;
