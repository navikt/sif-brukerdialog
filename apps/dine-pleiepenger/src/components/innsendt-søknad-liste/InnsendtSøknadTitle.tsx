import { BodyShort, HStack } from '@navikt/ds-react';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Task } from '@navikt/ds-icons';
import { InnsendtSøknad } from '../../types/Søknad';
import { formatSøknadOpprettetDato } from '../../utils/søknadUtils';

interface Props {
    søknad: InnsendtSøknad;
}

const InnsendtSøknadTitle: React.FunctionComponent<Props> = ({ søknad }) => {
    return (
        <div>
            <HStack gap="2" align={'start'} wrap={false}>
                <Task role="presentation" aria-hidden={true} width="1.25rem" height="1.25rem" />
                <div>
                    <BodyShort as="div" size="large" className="font-bold mb-2">
                        <FormattedMessage id={`sakstype.${søknad.søknadstype}`} />
                    </BodyShort>
                </div>
            </HStack>
            {søknad.opprettet ? (
                <BodyShort size="small" className="text-grayalpha-700">
                    Mottatt {formatSøknadOpprettetDato(søknad.opprettet)}
                </BodyShort>
            ) : null}
        </div>
    );
};

export default InnsendtSøknadTitle;
