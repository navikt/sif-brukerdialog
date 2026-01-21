import { ReadMore, VStack } from '@navikt/ds-react';

import { useAppIntl } from '../../../i18n';
import { Dokument } from '../../../types';
import Dokumenter from './Dokumenter';

interface Props {
    dokumenter: Dokument[];
}

const EttersendelseStatusContent = ({ dokumenter }: Props) => {
    const { text } = useAppIntl();
    return (
        <ReadMore header={text('statusISak.søknadStatusContent.ettersendelse.readMoreHeader')}>
            <VStack gap="space-8" className="pt-2">
                <Dokumenter dokumenter={dokumenter} />
            </VStack>
        </ReadMore>
    );
};

export default EttersendelseStatusContent;
