import { Button, ButtonProps } from '@navikt/ds-react';
import React from 'react';
import { Edit } from '@navikt/ds-icons';

const EditButton: React.FunctionComponent<ButtonProps> = ({ ...rest }) => {
    return <Button icon={<Edit role="presentation" />} type="button" variant="primary" size="small" {...rest} />;
};

export default EditButton;
