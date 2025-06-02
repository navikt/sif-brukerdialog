import { Tag } from '@navikt/ds-react';
import { OppgaveStatus } from '@navikt/ung-common';

const OppgaveStatusTag = ({ status }: { status: OppgaveStatus }) => {
    return (
        <Tag variant="info" size="small">
            {status}
        </Tag>
    );
};

export default OppgaveStatusTag;
