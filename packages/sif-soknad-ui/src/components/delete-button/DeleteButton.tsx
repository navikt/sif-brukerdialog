import { Button } from '@navikt/ds-react';
import React from 'react';

import { SifSoknadUiText } from '../../i18n';
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
        <Button size="small" variant="tertiary" onClick={onClick} aria-label={ariaLabel} type="button">
            {children || (
                <>
                    {' '}
                    <SifSoknadUiText id="@sifSoknadUi.deleteButton.removeLabel" />
                </>
            )}
        </Button>
    );
};

export default DeleteButton;
