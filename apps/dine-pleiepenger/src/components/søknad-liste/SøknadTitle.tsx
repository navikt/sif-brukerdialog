import { BodyShort, HStack } from '@navikt/ds-react';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Task } from '@navikt/ds-icons';
import { Søknad } from '../../types/Søknad';

interface Props {
    søknad: Søknad;
}

const SøknadTitle: React.FunctionComponent<Props> = ({ søknad }) => {
    return (
        <BodyShort as="div" size="large" className="font-bold mb-2">
            <HStack gap="2" align={'center'}>
                <Task role="presentation" aria-hidden={true} width="1.25rem" height="1.25rem" />
                <FormattedMessage id={`sakstype.${søknad.søknadstype}`} />
            </HStack>
        </BodyShort>
    );
};

export default SøknadTitle;
