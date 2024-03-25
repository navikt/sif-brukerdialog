import React from 'react';
import { PleiepengerEndringsmelding } from '../../../server/api-models/SøknadSchema';
import { VStack } from '@navikt/ds-react';
import DokumenterISøknad from './DokumenterISøknad';

interface Props {
    søknad: PleiepengerEndringsmelding;
}

const EndringsmeldingStatusContent: React.FunctionComponent<Props> = ({ søknad }) => {
    return (
        <VStack gap="2">
            <DokumenterISøknad søknad={søknad} />
        </VStack>
    );
};

export default EndringsmeldingStatusContent;
