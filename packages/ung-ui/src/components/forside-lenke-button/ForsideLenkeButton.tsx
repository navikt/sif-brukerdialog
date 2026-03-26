import { ArrowLeftIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';
import { UngUiText } from '@ui/i18n';
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
                navigate('/');
            }}
            variant="primary"
            icon={<ArrowLeftIcon aria-hidden="true" />}
            iconPosition="left">
            <UngUiText id="forsideLenkeButton.tekst" />
        </Button>
    );
};

export default ForsideLenkeButton;
