import { BodyShort, HStack } from '@navikt/ds-react';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Task } from '@navikt/ds-icons';
import { Søknad, Søknadstype } from '../../types/Søknad';
import PrettyDate from '../pretty-date/PrettyDate';
import { getSøknadMottattDato } from '../../utils/søknadUtils';

interface Props {
    søknad: Søknad;
    utvidetInfo?: boolean;
}

const SøknadTitle: React.FunctionComponent<Props> = ({ søknad, utvidetInfo }) => {
    return (
        <>
            <BodyShort as="div" size="large" className="font-bold mb-2">
                <HStack gap="2">
                    <Task role="presentation" aria-hidden={true} />
                    <FormattedMessage id={`sakstype.${søknad.søknadstype}`} />
                </HStack>
            </BodyShort>
            <BodyShort as="div" size="small">
                Mottatt{' '}
                <PrettyDate date={getSøknadMottattDato(søknad)} format="dayDateAndTime" useNorwegianTime={true} />
                {utvidetInfo && (
                    <>
                        {søknad.søknadstype === Søknadstype.PP_SYKT_BARN && (
                            <div>
                                Gjelder perioden <PrettyDate date={søknad.søknad.fraOgMed} /> til{' '}
                                <PrettyDate date={søknad.søknad.tilOgMed} />
                            </div>
                        )}
                        {søknad.søknadstype === Søknadstype.PP_ETTERSENDING && (
                            <div>
                                Ettersending gjelder: <q>{søknad.søknad.beskrivelse}</q> ...
                            </div>
                        )}
                    </>
                )}
            </BodyShort>
        </>
    );
};

export default SøknadTitle;
