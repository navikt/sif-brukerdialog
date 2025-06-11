import { Button } from '@navikt/ds-react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from '@navikt/aksel-icons';
import { navigateToInnsynForside } from '../../utils/navigateUtils';

const ForsideLenkeButton = () => {
    const navigate = useNavigate();
    return (
        <Button
            as="a"
            href="#"
            onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                navigateToInnsynForside(navigate);
            }}
            variant="primary"
            icon={<ArrowLeftIcon role="presentation" />}
            iconPosition="left">
            Tilbake til oversikten
        </Button>
    );
};

export default ForsideLenkeButton;
