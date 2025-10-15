import { Process } from '@navikt/ds-react';
import { ProcessStepData } from '../process/ProcessStep';
import { formatSakshendelseTidspunkt } from '../../utils/sakUtils';

interface Props {
    steps: ProcessStepData[];
}

const getStatusISakStepStatus = (step: ProcessStepData): 'completed' | 'active' | 'uncompleted' => {
    if (step.current) {
        return 'active';
    } else if (step.completed) {
        return 'completed';
    }
    return 'uncompleted';
};

const StatusISakSteps = ({ steps }: Props) => {
    return (
        <Process>
            {steps.map((step, idx) => {
                return (
                    <Process.Event
                        key={idx}
                        status={getStatusISakStepStatus(step)}
                        title={step.title}
                        timestamp={step.timestamp ? formatSakshendelseTidspunkt(step.timestamp) : undefined}>
                        {step.content}
                    </Process.Event>
                );
            })}
        </Process>
    );
};

export default StatusISakSteps;
