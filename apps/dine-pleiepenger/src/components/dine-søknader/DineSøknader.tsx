import { Alert, Box, Heading } from '@navikt/ds-react';
import useSWR from 'swr';

import SøknadListe, { SøknadListeSkeleton } from '../søknad-liste/SøknadListe';
import ComponentLoader from '../component-loader/ComponentLoader';
import { søknaderFetcher } from '../../pages/api/soknader.api';

const DineSøknader = () => {
    const { data, error, isLoading } = useSWR('/dine-pleiepenger/api/soknader', søknaderFetcher, {
        errorRetryCount: 0,
    });

    if (error) {
        return <Alert variant="error">Henting av data feilet</Alert>;
    }

    return (
        <Box>
            <Heading level="2" size="medium" className="text-deepblue-800" spacing={true}>
                Dine søknader
            </Heading>

            {isLoading ? (
                <ComponentLoader
                    title="Vent litt mens vi finner dine søknader ..."
                    fallback={<SøknadListeSkeleton rows={3} />}
                />
            ) : (
                <SøknadListe søknader={(Array.isArray(data) ? data : []).slice(0, 5)} />
            )}
        </Box>
    );
};

export default DineSøknader;
