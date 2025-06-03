import { Button } from '@navikt/ds-react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from '@navikt/aksel-icons';
import { EnvKey } from '@navikt/sif-common-env';
import { getAppEnv } from '../../../../utils/appEnv';

const ForsideLenkeButton = () => {
    const navigate = useNavigate();
    return (
        <Button
            as="a"
            href="#"
            onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                navigate(getAppEnv()[EnvKey.PUBLIC_PATH]);
            }}
            variant="primary"
            icon={<ArrowLeftIcon />}
            iconPosition="left">
            Tilbake til oversikten
        </Button>
    );
};

export default ForsideLenkeButton;
