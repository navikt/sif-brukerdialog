import { InternalHeader, Spacer } from '@navikt/ds-react';
import { useVeileder } from '../context/VeilederContext';
import { formaterNavn } from '../utils/formaterNavn';

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
