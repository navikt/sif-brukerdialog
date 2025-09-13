import { Button, ButtonProps } from '@navikt/ds-react';
import { Delete } from '@navikt/ds-icons';

const DeleteButton = ({ ...rest }: ButtonProps) => {
    return <Button icon={<Delete role="presentation" />} type="button" variant="primary" size="small" {...rest} />;
};

export default DeleteButton;
