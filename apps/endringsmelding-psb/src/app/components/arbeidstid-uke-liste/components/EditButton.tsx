import { Edit } from '@navikt/ds-icons';
import { Button, ButtonProps } from '@navikt/ds-react';
import React from 'react';

const EditButton: React.FunctionComponent<ButtonProps> = ({ ...rest }) => {
    return (
        <Button
            icon={<Edit role="presentation" aria-label={`Endre`} />}
            type="button"
            variant="primary"
            size="small"
            {...rest}
        />
    );
};

export default EditButton;
