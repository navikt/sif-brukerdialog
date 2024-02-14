import { VStack } from '@navikt/ds-react';
import React from 'react';
import DokumentarkivLenke from '../../lenker/DokumentarkivLenke';

const FerdigBehandletStatusContent: React.FunctionComponent = () => {
    return (
        <VStack gap="2">
            <DokumentarkivLenke tekst="Se vedtak i dokumentarkivet" />
        </VStack>
    );
};

export default FerdigBehandletStatusContent;
