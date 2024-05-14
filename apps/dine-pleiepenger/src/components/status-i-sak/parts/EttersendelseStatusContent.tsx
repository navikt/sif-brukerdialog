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
                {/* as any fordi typesjekk feiler i build på github */}
                <Dokumenter dokumenter={ettersendelse.dokumenter as any} />
            </VStack>
        </ReadMore>
    );
};

export default EttersendelseStatusContent;
