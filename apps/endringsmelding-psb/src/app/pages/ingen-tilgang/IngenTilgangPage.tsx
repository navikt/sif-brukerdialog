import React from 'react';
import Page from '@navikt/sif-common-core-ds/lib/components/page/Page';
import SifGuidePanel from '@navikt/sif-common-core-ds/lib/components/sif-guide-panel/SifGuidePanel';

const IngenTilgangPage = () => {
    return (
        <Page title="Ingen tilgang">
            <SifGuidePanel>Du har ikke tilgang til denne siden</SifGuidePanel>
        </Page>
    );
};

export default IngenTilgangPage;
