import React from 'react';
import { Pleiepengesøknad } from '../../../server/api-models/SøknadSchema';
import { ReadMore, VStack } from '@navikt/ds-react';
import DokumenterISøknad from './DokumenterISøknad';
import ArbeidsgivereISøknad from './ArbeidsgivereISøknad';
import { useMessages } from '../../../i18n';

interface Props {
    søknad: Pleiepengesøknad;
}

const SøknadStatusContent: React.FunctionComponent<Props> = ({ søknad }) => {
    const { text } = useMessages();
    return (
        <ReadMore header={text('statusISak.søknadStatusContent.readMoreHeader')}>
            <VStack gap="2" className="pt-2">
                <DokumenterISøknad søknad={søknad} tittel={text('statusISak.søknadStatusContent.dokumenterISøknad')} />
                <ArbeidsgivereISøknad søknad={søknad} />
            </VStack>
        </ReadMore>
    );
};

export default SøknadStatusContent;
