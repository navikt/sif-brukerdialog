import { PleiepengerEndringsmelding } from '../../../server/api-models/InnsendelseSchema';
import { VStack } from '@navikt/ds-react';
import Dokumenter from './Dokumenter';

interface Props {
    endringsmelding: PleiepengerEndringsmelding;
}

const EndringsmeldingStatusContent = ({ endringsmelding }: Props) => {
    return (
        <VStack gap="2">
            {/* as any fordi typesjekk feiler i build på github */}
            <Dokumenter dokumenter={endringsmelding.dokumenter as any} />
        </VStack>
    );
};

export default EndringsmeldingStatusContent;
