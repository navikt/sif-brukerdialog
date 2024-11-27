import { BodyShort } from '@navikt/ds-react';

const AppHeader = () => {
    return (
        <header className="bg-limegreen-600 text-white p-3">
            <BodyShort size="medium" weight="semibold">
                NAV Veileder - Ungdomsytelse
            </BodyShort>
        </header>
    );
};

export default AppHeader;
