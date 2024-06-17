import { PleiepengerEndringsmelding } from '../../../server/api-models/InnsendelseSchema';
import { VStack } from '@navikt/ds-react';
import Dokumenter from './Dokumenter';

interface Props {
    endringsmelding: PleiepengerEndringsmelding;
}

const EndringsmeldingStatusContent = ({ endringsmelding }: Props) => {
    return (
        <VStack gap="2">
            <Dokumenter dokumenter={endringsmelding.dokumenter} />
        </VStack>
    );
};

export default EndringsmeldingStatusContent;
