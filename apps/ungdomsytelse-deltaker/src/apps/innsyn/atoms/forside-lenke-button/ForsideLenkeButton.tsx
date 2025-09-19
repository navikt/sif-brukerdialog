import { ArrowLeftIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';
import { AppRoutes } from '@shared/utils/AppRoutes';
import { useNavigate } from 'react-router-dom';

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
