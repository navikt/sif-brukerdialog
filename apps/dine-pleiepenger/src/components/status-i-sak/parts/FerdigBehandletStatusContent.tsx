import React from 'react';
import { VStack } from '@navikt/ds-react';
import { formatSøknadshendelseTidspunkt } from '../../../utils/sakUtils';
import DokumentarkivLenke from '../../lenker/DokumentarkivLenke';

interface Props {
    avsluttetDato: Date;
}

const FerdigBehandletStatusContent: React.FunctionComponent<Props> = ({ avsluttetDato }) => {
    return (
        <VStack gap="2">
            <p>{formatSøknadshendelseTidspunkt(avsluttetDato)}</p>
            <DokumentarkivLenke tekst="Se vedtak i dokumentarkivet" />
        </VStack>
    );
};

export default FerdigBehandletStatusContent;
