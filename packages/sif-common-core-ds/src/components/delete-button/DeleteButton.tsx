import { Button } from '@navikt/ds-react';
import React from 'react';
import Trashcan from './TrashcanSvg';

interface Props {
    ariaLabel: string;
    useTrashcan?: boolean;
    children?: React.ReactNode;
    onClick: (e?: React.SyntheticEvent) => void;
}

const DeleteButton = ({ ariaLabel, useTrashcan = true, onClick, children }: Props) => {
    return useTrashcan ? (
        <>
            <Button
                type="button"
                size="small"
                variant="tertiary"
                onClick={(e) => {
                    e.stopPropagation();
                    onClick(e);
                }}
                aria-label={ariaLabel}>
                <Trashcan size={20} />
            </Button>
        </>
    ) : (
        <Button size="small" variant="tertiary" onClick={onClick} aria-label={ariaLabel}>
            {children || ' Fjern'}
        </Button>
    );
};

export default DeleteButton;
