import React from 'react';
import { PleiepengerEndringsmelding } from '../../../server/api-models/InnsendelseSchema';
import { VStack } from '@navikt/ds-react';
import DokumenterISøknad from './DokumenterISøknad';

interface Props {
    søknad: PleiepengerEndringsmelding;
}

const EndringsmeldingStatusContent: React.FunctionComponent<Props> = ({ søknad }) => {
    return (
        <VStack gap="2">
            <DokumenterISøknad innsendelse={søknad} />
        </VStack>
    );
};

export default EndringsmeldingStatusContent;
