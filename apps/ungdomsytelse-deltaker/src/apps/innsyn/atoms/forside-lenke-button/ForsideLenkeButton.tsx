import { ArrowLeftIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';
import { AppRoutes } from '@shared/utils/AppRoutes';
import { useNavigate } from 'react-router-dom';

import { AppText } from '../../../../i18n';

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
            <AppText id="forsideLenkeButton.tekst" />
        </Button>
    );
};

export default ForsideLenkeButton;
