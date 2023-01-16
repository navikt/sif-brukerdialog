import { Button, ButtonProps } from '@navikt/ds-react';
import React from 'react';
import EditIcon from './EditIcon';

interface Props extends ButtonProps {
    multiple?: boolean;
}

const EditButton: React.FunctionComponent<Props> = ({ multiple, ...rest }) => {
    return <Button icon={<EditIcon multiple={multiple} />} type="button" variant="primary" size="small" {...rest} />;
};

export default EditButton;
