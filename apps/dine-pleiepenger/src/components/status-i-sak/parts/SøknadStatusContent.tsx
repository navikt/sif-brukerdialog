import React from 'react';
import { Pleiepengesøknad } from '../../../server/api-models/SøknadSchema';
import { VStack } from '@navikt/ds-react';
import DokumenterISøknad from './DokumenterISøknad';
import { formatSøknadshendelseTidspunkt } from '../../../utils/sakUtils';
import ArbeidsgivereISøknad from './ArbeidsgivereISøknad';

interface Props {
    søknad: Pleiepengesøknad;
}

const SøknadStatusContent: React.FunctionComponent<Props> = ({ søknad }) => {
    return (
        <VStack gap="2">
            <p>{formatSøknadshendelseTidspunkt(søknad.k9FormatSøknad.mottattDato)}</p>
            <DokumenterISøknad søknad={søknad} tittel="Søknad og eventuelle vedlegg i søknad" />
            <ArbeidsgivereISøknad søknad={søknad} />
        </VStack>
    );
};

export default SøknadStatusContent;
