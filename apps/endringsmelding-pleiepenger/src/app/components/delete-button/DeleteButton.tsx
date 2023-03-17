import { Delete } from '@navikt/ds-icons';
import { Button, ButtonProps } from '@navikt/ds-react';
import React from 'react';

const DeleteButton: React.FunctionComponent<ButtonProps> = ({ ...rest }) => {
    return (
        <Button
            icon={<Delete role="presentation" aria-label={`Fjern`} />}
            type="button"
            variant="primary"
            size="small"
            {...rest}
        />
    );
};

export default DeleteButton;
