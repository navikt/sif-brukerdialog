import { Button, ButtonProps } from '@navikt/ds-react';
import { Edit } from '@navikt/ds-icons';

const EditButton = ({ ...rest }: ButtonProps) => {
    return <Button icon={<Edit role="presentation" />} type="button" variant="primary" size="small" {...rest} />;
};

export default EditButton;
