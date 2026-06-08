import { PencilIcon } from '@navikt/aksel-icons';
import { Button, ButtonProps } from '@navikt/ds-react';

const EditButton = ({ ...rest }: ButtonProps) => {
    return <Button icon={<PencilIcon role="presentation" />} type="button" variant="primary" size="small" {...rest} />;
};

export default EditButton;
