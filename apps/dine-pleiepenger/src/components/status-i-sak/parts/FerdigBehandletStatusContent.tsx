import React from 'react';
import { VStack } from '@navikt/ds-react';
import DokumentarkivLenke from '../../lenker/DokumentarkivLenke';

interface Props {
    avsluttetDato: Date;
}

const FerdigBehandletStatusContent: React.FunctionComponent<Props> = ({ avsluttetDato }) => {
    return (
        <VStack gap="2">
            <DokumentarkivLenke tekst="Se vedtak i dokumentarkivet" />
        </VStack>
    );
};

export default FerdigBehandletStatusContent;
