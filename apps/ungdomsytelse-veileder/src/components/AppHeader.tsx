import { InternalHeader, Spacer } from '@navikt/ds-react';
import { formaterNavn } from '@navikt/ung-common';
import { useVeileder } from '../context/VeilederContext';

const AppHeader = () => {
    const { veileder } = useVeileder();

    return (
        <InternalHeader>
            <InternalHeader.Title href="/">Nav Veileder - Ungdomsytelse</InternalHeader.Title>
            <Spacer />
            <InternalHeader.User name={formaterNavn({ ...veileder })} />
        </InternalHeader>
    );
};

export default AppHeader;
