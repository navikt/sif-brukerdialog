import { ReadMore, VStack } from '@navikt/ds-react';
import React from 'react';
import { useMessages } from '../../../i18n';
import { PleiepengerEttersendelse } from '../../../server/api-models/InnsendelseSchema';
import DokumenterISøknad from './DokumenterISøknad';

interface Props {
    ettersendelse: PleiepengerEttersendelse;
}

const EttersendelseStatusContent: React.FunctionComponent<Props> = ({ ettersendelse }) => {
    const { text } = useMessages();
    return (
        <ReadMore header={text('statusISak.søknadStatusContent.ettersendelse.readMoreHeader')}>
            <VStack gap="2" className="pt-2">
                <DokumenterISøknad innsendelse={ettersendelse} />
            </VStack>
        </ReadMore>
    );
};

export default EttersendelseStatusContent;
