import { VStack } from '@navikt/ds-react';

import { Dokument } from '../../../types';
import Dokumenter from './Dokumenter';

interface Props {
    dokumenter: Dokument[];
}

const EndringsmeldingStatusContent = ({ dokumenter }: Props) => {
    return (
        <VStack gap="space-8">
            <Dokumenter dokumenter={dokumenter} />
        </VStack>
    );
};

export default EndringsmeldingStatusContent;
