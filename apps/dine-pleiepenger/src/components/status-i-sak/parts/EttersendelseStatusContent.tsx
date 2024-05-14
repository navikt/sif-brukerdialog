import { ReadMore, VStack } from '@navikt/ds-react';
import { useMessages } from '../../../i18n';
import { PleiepengerEttersendelse } from '../../../server/api-models/InnsendelseSchema';
import Dokumenter from './Dokumenter';

interface Props {
    ettersendelse: PleiepengerEttersendelse;
}

const EttersendelseStatusContent = ({ ettersendelse }: Props) => {
    const { text } = useMessages();
    return (
        <ReadMore header={text('statusISak.søknadStatusContent.ettersendelse.readMoreHeader')}>
            <VStack gap="2" className="pt-2">
                <Dokumenter dokumenter={ettersendelse.dokumenter} />
            </VStack>
        </ReadMore>
    );
};

export default EttersendelseStatusContent;
