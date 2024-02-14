import React from 'react';
import { Søknad } from '../../../server/api-models/SøknadSchema';
import { VStack } from '@navikt/ds-react';
import DokumenterISøknad from './DokumenterISøknad';
import { formatSøknadshendelseTidspunkt } from '../../../utils/sakUtils';

interface Props {
    søknad: Søknad;
}

const SøknadStatusContent: React.FunctionComponent<Props> = ({ søknad }) => {
    return (
        <VStack gap="4">
            <p>{formatSøknadshendelseTidspunkt(søknad.k9FormatSøknad.mottattDato)}</p>
            <DokumenterISøknad søknad={søknad} />
        </VStack>
    );
};

export default SøknadStatusContent;
