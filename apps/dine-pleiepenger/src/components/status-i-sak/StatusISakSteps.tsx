import { Process, ProcessProps } from '@navikt/ds-react';
import { dateFormatter } from '@navikt/sif-common-utils';

import { ProcessStepData } from '../../types/ProcessStepData';
import { formatSakshendelseTidspunkt } from '../../utils/sakUtils';

interface Props {
    steps: ProcessStepData[];
    isTruncated?: ProcessProps['isTruncated'];
}

const getStatusISakStepStatus = (step: ProcessStepData): 'completed' | 'active' | 'uncompleted' => {
    if (step.current) {
        return 'active';
    } else if (step.completed) {
        return 'completed';
    }
    return 'uncompleted';
};

const StatusISakSteps = ({ steps, isTruncated }: Props) => {
    const getTidspunkt = (step: ProcessStepData): string | undefined => {
        if (step.timestamp) {
            return formatSakshendelseTidspunkt(step.timestamp);
        } else if (step.date) {
            return dateFormatter.compact(step.date);
        }
    };
    return (
        <Process isTruncated={isTruncated}>
            {steps.map((step, idx) => {
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
    );
};

export default StatusISakSteps;
