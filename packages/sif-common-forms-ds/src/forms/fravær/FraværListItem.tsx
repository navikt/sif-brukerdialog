import React from 'react';
import { ActionLink } from '@navikt/sif-common-ui';

interface Props {
    title: string;
    onEdit?: () => void;
}

const FraværListItem: React.FunctionComponent<Props> = ({ title, onEdit }: Props) => {
    return (
        <div style={{ padding: '.5rem 0' }}>
            <div>{onEdit ? <ActionLink onClick={() => onEdit()}>{title}</ActionLink> : <>{title}</>}</div>
        </div>
    );
};

export default FraværListItem;
