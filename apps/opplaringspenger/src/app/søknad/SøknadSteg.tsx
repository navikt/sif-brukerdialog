import Page from '@navikt/sif-common-core-ds/lib/components/page/Page';
import React from 'react';
import SøknadFooter from './SøknadFooter';
import { SøknadStegID } from './søknadStepsConfig';

interface Props {
    stegID: SøknadStegID;
    children: React.ReactNode;
}

const SøknadSteg: React.FunctionComponent<Props> = ({ stegID, children }) => (
    <Page title={stegID}>
        {children}
        <SøknadFooter />
    </Page>
);

export default SøknadSteg;
