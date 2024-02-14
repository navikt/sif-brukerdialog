import React from 'react';
import { PleiepengerEndringsmelding } from '../../../server/api-models/SøknadSchema';
import { VStack } from '@navikt/ds-react';
import DokumenterISøknad from './DokumenterISøknad';
import { formatSøknadshendelseTidspunkt } from '../../../utils/sakUtils';

interface Props {
    søknad: PleiepengerEndringsmelding;
}

const EndringsmeldingStatusContent: React.FunctionComponent<Props> = ({ søknad }) => {
    return (
        <VStack gap="4">
            <p>{formatSøknadshendelseTidspunkt(søknad.k9FormatSøknad.mottattDato)}</p>
            <DokumenterISøknad søknad={søknad} />
        </VStack>
    );
};

export default EndringsmeldingStatusContent;
