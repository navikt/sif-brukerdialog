import {
    CheckmarkCircleFillIcon,
    CircleSlashFillIcon,
    CircleSlashIcon,
    HourglassBottomFilledIcon,
    PencilFillIcon,
} from '@navikt/aksel-icons';
import { OppgaveStatus } from '@navikt/ung-common';

interface Props {
    oppgavestatus: OppgaveStatus;
    size?: 'small' | 'medium';
    fill?: boolean;
}

const OppgaveStatusIkon = ({ oppgavestatus, size = 'medium', fill = true }: Props) => {
    const widthHeight = size === 'medium' ? '1.8rem' : '1.4rem';

    switch (oppgavestatus) {
        case OppgaveStatus.ULØST:
            return <PencilFillIcon color="#C95100" width={widthHeight} height={widthHeight} aria-hidden="true" />;
        case OppgaveStatus.LUKKET:
        case OppgaveStatus.LØST:
            return (
                <CheckmarkCircleFillIcon color="#00893c" width={widthHeight} height={widthHeight} aria-hidden="true" />
            );
        case OppgaveStatus.UTLØPT:
            return (
                <HourglassBottomFilledIcon
                    color="#49515e"
                    width={widthHeight}
                    height={widthHeight}
                    aria-hidden="true"
                />
            );
        case OppgaveStatus.AVBRUTT:
            return fill ? (
                <CircleSlashFillIcon color="#49515e" width={widthHeight} height={widthHeight} aria-hidden="true" />
            ) : (
                <CircleSlashIcon color="#49515e" width={widthHeight} height={widthHeight} aria-hidden="true" />
            );
    }
};
export default OppgaveStatusIkon;
