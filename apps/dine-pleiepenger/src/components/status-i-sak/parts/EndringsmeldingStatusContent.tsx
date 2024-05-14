import { PleiepengerEndringsmelding } from '../../../server/api-models/InnsendelseSchema';
import { VStack } from '@navikt/ds-react';
import Dokumenter from './Dokumenter';

interface Props {
    søknad: PleiepengerEndringsmelding;
}

const EndringsmeldingStatusContent = ({ søknad }: Props) => {
    return (
        <VStack gap="2">
            <Dokumenter dokumenter={søknad.dokumenter} />
        </VStack>
    );
};

export default EndringsmeldingStatusContent;
