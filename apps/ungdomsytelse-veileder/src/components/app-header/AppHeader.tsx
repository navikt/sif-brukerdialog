import { InternalHeader, Spacer } from '@navikt/ds-react';
import { formaterNavn } from '@navikt/ung-common';
import { useVeileder } from '../../context/VeilederContext';
import { InformationSquareFillIcon } from '@navikt/aksel-icons';
import { useNavigate } from 'react-router-dom';

const AppHeader = () => {
    const { veileder } = useVeileder();
    const iconWidth: string = '1.8rem';

    const navigate = useNavigate();

    return (
        <InternalHeader>
            <InternalHeader.Title href="/">Nav Veileder - Ungdomsytelse</InternalHeader.Title>
            <Spacer />
            <InternalHeader.Button onClick={() => navigate('/informasjon')}>
                <InformationSquareFillIcon width={iconWidth} height={iconWidth} /> Informasjon
            </InternalHeader.Button>
            <InternalHeader.User name={formaterNavn({ ...veileder })} />
        </InternalHeader>
    );
};

export default AppHeader;
