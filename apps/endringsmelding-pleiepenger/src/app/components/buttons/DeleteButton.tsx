import { Button, ButtonProps } from '@navikt/ds-react';
import React from 'react';
import { Delete } from '@navikt/ds-icons';

const DeleteButton: React.FunctionComponent<ButtonProps> = ({ ...rest }) => {
    return <Button icon={<Delete role="presentation" />} type="button" variant="primary" size="small" {...rest} />;
};

export default DeleteButton;
