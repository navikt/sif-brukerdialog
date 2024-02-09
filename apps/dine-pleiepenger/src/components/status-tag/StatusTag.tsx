import { Tag } from '@navikt/ds-react';
import React from 'react';

interface Props {
    status: string;
}

const StatusTag: React.FunctionComponent<Props> = ({ status }) => {
    return <Tag variant="info">{status}</Tag>;
};

export default StatusTag;
