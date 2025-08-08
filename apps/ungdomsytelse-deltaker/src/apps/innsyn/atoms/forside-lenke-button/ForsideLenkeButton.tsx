import { Button } from '@navikt/ds-react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from '@navikt/aksel-icons';
import { AppRoutes } from '../../../../utils/AppRoutes';

const ForsideLenkeButton = () => {
    const navigate = useNavigate();
    return (
        <Button
            as="a"
            href="#"
            onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                navigate(AppRoutes.innsyn);
            }}
            variant="primary"
            icon={<ArrowLeftIcon aria-hidden="true" />}
            iconPosition="left">
            Tilbake til oversikten
        </Button>
    );
};

export default ForsideLenkeButton;
