import { InternalHeader, Spacer } from '@navikt/ds-react';

const AppHeader = () => {
    return (
        <InternalHeader>
            <InternalHeader.Title href="/">Nav Veileder - Ungdomsytelse</InternalHeader.Title>
            <Spacer />
            <InternalHeader.User name="Navn Veiledersen" />
        </InternalHeader>
    );
};

export default AppHeader;
