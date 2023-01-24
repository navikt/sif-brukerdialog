import { Button } from '@navikt/ds-react';
import Page from '@navikt/sif-common-core-ds/lib/components/page/Page';
import React from 'react';

const DevPage = () => {
    return (
        <Page title="Teknisk">
            <Button
                type="button"
                onClick={() => {
                    localStorage.clear();
                }}>
                Tøm mellomlagring
            </Button>
        </Page>
    );
};

export default DevPage;
