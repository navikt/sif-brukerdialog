import ActionLink from '@navikt/sif-common-core-ds/src/atoms/action-link/ActionLink';
import React from 'react';

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
