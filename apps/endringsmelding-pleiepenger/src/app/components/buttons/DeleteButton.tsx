import { TrashIcon } from '@navikt/aksel-icons';
import { Button, ButtonProps } from '@navikt/ds-react';

const DeleteButton = ({ ...rest }: ButtonProps) => {
    return <Button icon={<TrashIcon role="presentation" />} type="button" variant="primary" size="small" {...rest} />;
};

export default DeleteButton;
