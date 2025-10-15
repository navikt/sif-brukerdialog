import { Process } from '@navikt/ds-react';
import { ProcessStepData } from '../process/ProcessStep';
import { formatSakshendelseTidspunkt } from '../../utils/sakUtils';
import { CheckmarkHeavyIcon, CircleFillIcon } from '@navikt/aksel-icons';

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
const getBullet = (step: ProcessStepData): React.ReactNode | undefined => {
    if (step.current) {
        return <CircleFillIcon style={{ width: '1rem', height: '1rem' }} />;
    } else if (step.completed) {
        return <CheckmarkHeavyIcon />;
    } else return '';
};

const StatusISakSteps = ({ steps }: Props) => {
    return (
        <Process>
            {steps.map((step, idx) => {
                return (
                    <Process.Event
                        key={idx}
                        status={getStatusISakStepStatus(step)}
                        bullet={getBullet(step)}
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
