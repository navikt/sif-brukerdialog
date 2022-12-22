import React from 'react';
import Page from '@navikt/sif-common-core-ds/lib/components/page/Page';
import SifGuidePanel from '@navikt/sif-common-core-ds/lib/components/sif-guide-panel/SifGuidePanel';
import { IngenTilgangÅrsak } from '../../types/IngenTilgangÅrsak';

interface Props {
    årsak?: IngenTilgangÅrsak;
}

const IngenTilgangPage = (props: Props) => {
    return (
        <Page title="Ingen tilgang">
            <SifGuidePanel>
                Du har ikke tilgang til denne siden
                <p>Årsak:{props.årsak}</p>
            </SifGuidePanel>
        </Page>
    );
};

export default IngenTilgangPage;
